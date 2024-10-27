/* eslint-disable unicorn/filename-case */
import { FieldLogger } from "./FieldLogger";
import * as S2 from "./lib/S2";

const MAX_TRAIN_FACTOR = 0.9; // max influence a new field have on the S2 Value

export interface Result {
    mindunits: number;
    cells: number;
    missing: number;
    approx: number;
}

export class MindunitsDB {

    public muDB: Map<string, number>; // FIXME: public for debug
    private muDBParents: Map<string, number>;

    // options
    private S2MULevel: number;
    private S2MUDetailLevel: number;
    private S2MUDetailFactor: number;

    constructor(cell_level: number = 11, detail_level: number = 17) {
        this.muDB = new Map();
        this.muDBParents = new Map();

        this.S2MULevel = cell_level;
        this.S2MUDetailLevel = detail_level;
        this.S2MUDetailFactor = Math.pow(4, this.S2MUDetailLevel - this.S2MULevel);

    }


    /**
     * train fields from Logger
     */
    async train(fieldLog: FieldLogger): Promise<void> {
        console.time("logfield_train");
        let count = 0;
        let skip = 0;
        // DEBUG-START
        // we train only every second field to get a better "error" value
        skip = 1;
        // DEBUG-END
        await fieldLog.forEach((latlngs, mindunits) => { if ((count++ % skip) === 0) this.trainField2(latlngs, mindunits) });
        console.timeEnd("logfield_train");

        console.time("logfield_train_approx");
        this.calculateTopFields();
        console.timeEnd("logfield_train_approx");
    }


    /**
     * train one field
     */
    trainField(ll: L.LatLng[], mindunits: number): void {
        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, this.S2MULevel, this.S2MULevel);
        const detailCells = cells.map(cell => cover.howManyIntersect(region, cell, this.S2MUDetailLevel));
        const total = detailCells.reduce((sum, x) => sum + x, 0);

        const mu_per_detail = mindunits / total;
        const mu_per_cell = mu_per_detail * this.S2MUDetailFactor;

        cells.forEach((cell, i) => {
            const id = cell.toString();

            if (this.muDB.has(id)) {
                const current = this.muDB.get(id)!;
                if (current !== mu_per_cell) {

                    let w = detailCells[i] / total;
                    console.assert(w > 0 && w <= 1, "illegal percent value")

                    w = Math.min(w, MAX_TRAIN_FACTOR);
                    this.muDB.set(id, (1 - w) * current + w * mu_per_cell);
                }
            } else {
                this.muDB.set(id, mu_per_cell);
            }
        })
    }


    /**
     * train one field
     */
    trainField2(ll: L.LatLng[], mindunits: number): void {
        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, this.S2MULevel, this.S2MULevel);
        const detailCells = cells.map(cell => cover.howManyIntersect(region, cell, this.S2MUDetailLevel));
        const cellsIDs = cells.map(id => id.toString());
        const total = detailCells.reduce((sum, x) => sum + x, 0);

        const mu_per_detail = mindunits / total;
        const mu_per_cell = mu_per_detail * this.S2MUDetailFactor;
        const isAnyMissing = cellsIDs.some(id => !this.muDB.has(id));

        if (isAnyMissing) {
            cellsIDs.forEach(id => {
                if (this.muDB.has(id)) {
                    const current = (this.muDB.get(id)! + mu_per_cell) / 2;
                    this.muDB.set(id, current);
                } else {
                    this.muDB.set(id, mu_per_cell);
                }
            })
        } else {
            const current_mu = cellsIDs.reduce((mu, id, i) => mu + this.muDB.get(id)! * detailCells[i] / this.S2MUDetailFactor, 0);
            const mu_diff_per_detail = (mindunits - current_mu) / total;
            cellsIDs.forEach((id, i) => {
                console.assert(this.muDB.has(id));

                const delta = mu_diff_per_detail * detailCells[i] / total
                const current = this.muDB.get(id)! + delta;
                this.muDB.set(id, current);
            })
        }

        //  - - - 
        //  1. 1000Mu Left        -> 500 500 -     
        //  1. 500Mu Right        -> 500 375 250
        //  2. 1000Mu Left +125   -> 562 437 250    
        //  2. 500Mu Right -187   -> 562 344 157
        //  3. 1000Mu Left +94    -> 609 435 157
        //  3. 500Mu Right -92    -> 609 389 203
    }

    /**
     * train one field
     */
    calculateTopFields() {
        this.calculateParents(this.muDB);
    }

    private calculateParents(fields: Map<string, number>): void {
        // lets build approximate values for missing cell
        if (fields.size === 0) {
            console.error("no parent fields?");
            return;
        }

        const first = fields.keys().next();
        const firstCellID = first.value as string;
        const cell = S2.Cell.fromString(firstCellID);

        if (cell.level === 1) return;


        const parents = new Map<string, number[]>();
        fields.forEach((mindunits, id) => {
            const cell = S2.Cell.fromString(id);
            const parent = cell.getParent();
            const parent_id = parent!.toString();

            const inParents = parents.get(parent_id);
            if (inParents) {
                inParents.push(mindunits)
            } else {
                parents.set(parent_id, [mindunits]);
            }
        })


        const parentValues = new Map<string, number>();
        parents.forEach((munits, id) => {
            const approx = munits.reduce((s, x) => s + x, 0) / munits.length * 4;
            parentValues.set(id, approx);

            if (cell.level !== this.S2MULevel - 1 || munits.length !== 4) {
                this.muDBParents.set(id, approx);

                if (cell.level === 1) {
                    console.log("Cell", id, approx);
                }
            }
        });

        this.calculateParents(parentValues);
    }



    calcMU(ll: L.LatLng[]): Result {
        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, this.S2MULevel, this.S2MULevel);

        const result = <Result>{
            mindunits: 0,
            cells: 0,
            missing: 0,
            approx: 0,
        };

        cells.forEach(cell => {
            const id = cell.toString();
            const details = cover.howManyIntersect(region, cell, this.S2MUDetailLevel);
            result.cells += details;

            const cellMU = this.muDB.get(id);
            if (cellMU) {
                result.mindunits += cellMU * details / this.S2MUDetailFactor;
            } else {
                const parentUnits = this.findParentUnits(cell);
                if (parentUnits) {
                    result.mindunits += parentUnits * details / this.S2MUDetailFactor;
                    result.approx += details;
                } else {
                    result.missing += details;
                }
            }
        });

        result.mindunits = Math.ceil(result.mindunits);
        return result;
    }

    private findParentUnits(cell: S2.Cell): number | undefined {
        const parent = cell.getParent();
        if (!parent) return undefined;
        let parentUnits = this.muDBParents.get(parent.toString());

        if (!parentUnits) parentUnits = this.findParentUnits(parent);

        return parentUnits && (parentUnits / 4);
    }


    forEach(callback: (cell: S2.Cell, mindunits: number) => void): void {
        this.muDB.forEach((mindunits, guid) => {
            const cell = S2.Cell.fromString(guid);
            callback(cell, mindunits);
        })
    }


    getNumberOfCells(): number {
        return this.muDB.size;
    }
}    
