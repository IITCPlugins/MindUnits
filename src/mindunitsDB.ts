import { FieldLogger } from "./fieldLogger";
import * as S2 from "./lib/s2";

export const S2MULevel = 10;
export const S2MUDetailLevel = 17;
const S2MUDetailFactor = Math.pow(4, S2MUDetailLevel - S2MULevel);


export class MindunitsDB {

    private muDB: Map<string, number>;
    private muDBParents: Map<string, number>;

    constructor() {
        this.muDB = new Map();
        this.muDBParents = new Map();
    }


    train(fieldLog: FieldLogger): void {
        console.time("logfield_train");
        fieldLog.forEach((latlngs, mindunits) => this.trainField(latlngs, mindunits));
        console.timeEnd("logfield_train");

        console.time("logfield_train_approx");
        this.calculateParents(this.muDB);
        console.timeEnd("logfield_train_approx");
    }


    trainField(ll: L.LatLng[], mindunits: number): void {
        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, S2MULevel, S2MULevel);
        const detailCells = cells.map(cell => cover.howManyIntersect(region, cell, S2MUDetailLevel));
        const total = detailCells.reduce((sum, x) => sum + x, 0);

        const mu_per_detail = mindunits / total;

        cells.forEach((cell, index) => {
            const id = cell.toString();
            const mu = mu_per_detail * S2MUDetailFactor;

            if (this.muDB.has(id)) {
                const current = this.muDB.get(id)!;
                if (current !== mu) {
                    // console.log("MU diff:", current - mu, `${Math.round((1 - mu / current) * 1000) / 10}% `);
                    this.muDB.set(id, (current + mu) / 2);
                }
            } else {
                this.muDB.set(id, mu);
            }
        })
    }


    private calculateParents(fields: Map<string, number>): void {
        // lets build approximate values for missing cell
        if (fields.size === 0) return;

        const firstCellID = fields.keys().next().value();
        const cell = S2.S2Cell.fromString(firstCellID);
        if (cell.level === 1) return;


        const parents = new Map<string, number[]>();
        fields.forEach((mindunits, id) => {
            const cell = S2.S2Cell.fromString(id);
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

            if (cell.level !== S2MULevel - 1 || munits.length !== 4) {
                this.muDBParents.set(id, approx);
            }
        });

        this.calculateParents(parentValues);
    }



    calcMU(ll: L.LatLng[]): { mindunits: number, missing: boolean } {
        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));

        const cells = cover.getCovering(region, S2MULevel, S2MULevel);

        let mindunits = 0;
        let missing = false;
        cells.forEach(cell => {
            const id = cell.toString();
            const details = cover.howManyIntersect(region, cell, S2MUDetailLevel);

            const cellMU = this.muDB.get(id);
            if (cellMU) {
                mindunits += cellMU * details / S2MUDetailFactor;
            } else {
                const parentUnits = this.findParentUnits(cell);
                mindunits += parentUnits * details / S2MUDetailFactor;
                missing = true;
            }
        });

        mindunits = Math.ceil(mindunits);
        return { mindunits, missing };
    }

    private findParentUnits(cell: S2.S2Cell): number {
        const parent = cell.getParent()!;
        let parentUnits = this.muDBParents.get(parent.toString());

        if (!parentUnits) parentUnits = this.findParentUnits(parent);

        return parentUnits / 4;
    }


    forEach(callback: (cell: S2.S2Cell, mindunits: number) => void): void {
        this.muDB.forEach((mindunits, guid) => {
            const cell = S2.S2Cell.fromString(guid);
            callback(cell, mindunits);
        })
    }
}    
