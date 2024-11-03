import { DensityMap } from "./DensityMap";
import { FieldLogger } from "./FieldLogger";
import * as S2 from "./lib/S2";

const MIN_MU_PER_CELL = 1; // to prevent negaitv Mindunits

export interface Result {
    mindunits: number;
    cells: number;
    missing: number;
    approx: number;
}

export class Mindunits {

    private densityMap: DensityMap;

    // options
    private S2MULevel: number;
    private S2MUDetailLevel: number;
    private S2MUDetailFactor: number;

    constructor(cell_level: number = 11, detail_level: number = 17) {
        this.densityMap = new DensityMap(cell_level - 5, cell_level);

        this.S2MULevel = cell_level;
        this.S2MUDetailLevel = detail_level;
        this.S2MUDetailFactor = Math.pow(4, this.S2MUDetailLevel - this.S2MULevel);

    }

    // for debug/info
    getDensityMap(): DensityMap {
        return this.densityMap;
    }


    /**
     * train fields from Logger
     */
    async train(fieldLog: FieldLogger): Promise<void> {
        console.time("logfield_train");
        await fieldLog.forEach(async (latlngs, mindunits) => await this.trainField(latlngs, mindunits));
        console.timeEnd("logfield_train");

        this.densityMap.save();
        this.densityMap.updateCache();
    }



    /**
     * train one field
     */
    async trainField(ll: L.LatLng[], mindunits: number): Promise<void> {
        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, this.S2MULevel, this.S2MULevel);
        const cellValues = await this.densityMap.getCellsValues(cells, false);

        const detailCells = cells.map(cell => cover.howManyIntersect(region, cell, this.S2MUDetailLevel));
        const detail_cell_count = detailCells.reduce((sum, x) => sum + x, 0);

        const mu_per_detail = mindunits / detail_cell_count;
        const mu_per_cell = mu_per_detail * this.S2MUDetailFactor;
        const isAnyMissing = cellValues.includes(undefined);

        if (isAnyMissing) {

            const newValues = cellValues.map(v => v ? (v + mu_per_cell) / 2 : mu_per_cell);
            await this.densityMap.setCellsValues(cells, newValues);

        } else {
            const current_mu = cellValues.reduce<number>((sum, cell_value, i) => sum + cell_value! * detailCells[i] / this.S2MUDetailFactor, 0);
            const mu_diff_per_detail = (mindunits - current_mu) / detail_cell_count;

            const newValues = cellValues.map((v, i) => {
                const delta = mu_diff_per_detail * detailCells[i] / detail_cell_count
                return Math.max(v! + delta, MIN_MU_PER_CELL);
            });
            await this.densityMap.setCellsValues(cells, newValues);
        }

        //  Example:
        // (Iteration. Field -> cells)
        //  1. 1000Mu Left        -> 500 500 -     
        //  1. 500Mu Right        -> 500 375 250
        //  2. 1000Mu Left +125   -> 562 437 250    
        //  2. 500Mu Right -187   -> 562 344 157
        //  3. 1000Mu Left +94    -> 609 435 157
        //  3. 500Mu Right -92    -> 609 389 203
    }



    async calcMU(ll: L.LatLng[]): Promise<Result> {
        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, this.S2MULevel, this.S2MULevel);
        const cellValues = await this.densityMap.getCellsValues(cells);

        const result = <Result>{
            mindunits: 0,
            cells: 0,
            missing: 0,
            approx: 0,
        };

        for (const [index, cell] of cells.entries()) {
            const details = cover.howManyIntersect(region, cell, this.S2MUDetailLevel);
            result.cells += details;

            const cellMU = cellValues[index];
            if (cellMU) {
                result.mindunits += cellMU * details / this.S2MUDetailFactor;
            } else {
                const parentUnits = await this.densityMap.getCellValuebyNeighbors(cell);
                if (parentUnits) {
                    result.mindunits += parentUnits * details / this.S2MUDetailFactor;
                    result.approx += details;
                } else {
                    result.missing += details;
                }
            }
        };

        result.mindunits = Math.ceil(result.mindunits);
        return result;
    }
}    
