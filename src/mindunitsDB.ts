import { FieldLogger } from "./fieldLogger";
import * as S2 from "./s2";

export const S2MULevel = 10;
export const S2MUDetailLevel = 17;
const S2MUDetailFactor = Math.pow(4, S2MUDetailLevel - S2MULevel);


export class MindunitsDB {

    private muDB: Map<string, number>;

    constructor() {
        this.muDB = new Map();
    }


    train(fieldLog: FieldLogger): void {
        console.time("logfield_train");
        fieldLog.forEach((latlngs, mindunits) => this.trainField(latlngs, mindunits));
        console.timeEnd("logfield_train");
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
                missing = true;
            }
        });

        mindunits = Math.ceil(mindunits);
        return { mindunits, missing };
    }

}    
