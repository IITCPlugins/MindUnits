import * as S2 from "../src/lib/S2";
import { DensityMap } from '../src/DensityMap';


const CellID = "0123123";
const Cell_Level = 11;
const Storage: Record<string, (number | undefined)[]> = {
    [`${CellID}_${Cell_Level}`]: [100, 200, undefined, undefined, 300, 400]
}

jest.mock('localforage', () => ({
    createInstance: jest.fn().mockImplementation(() => ({
        getItem: (id: string) => {
            return Storage[id];
        },
        setItem: () => undefined,
    }))
}));


// to expose functions
class DensityMapTest extends DensityMap {
    async getByParent(cell: S2.Cell, levelDif: number = 1): Promise<number | undefined> {
        return super.getByParent(cell, levelDif);
    }
}


describe("DensityMap", () => {

    it("should use faked storage", async () => {
        const map = new DensityMap(6, 11)
        const cell = S2.Cell.fromString(CellID);
        cell.addArrayIndex(0, Cell_Level);

        const result = await map.getCellsValues([cell]);

        expect(result[0]).toBe(100);
    })


    it("should get value by parent cell", async () => {
        const map = new DensityMapTest(6, 11)
        const cell = S2.Cell.fromString(CellID);
        cell.addArrayIndex(0, Cell_Level);

        const result = await map.getByParent(cell);

        expect(result).toBe((100 + 200) / 2);
    })

    it("should get value by parent cell level 2", async () => {
        const map = new DensityMapTest(6, 11)
        const cell = S2.Cell.fromString(CellID);
        cell.addArrayIndex(0, Cell_Level);

        const result = await map.getByParent(cell, 2);

        expect(result).toBe((100 + 200 + 300 + 400) / 4);
    })


    it("should get aprox value", async () => {
        // this should be equal to the "getByParent" call
        const map = new DensityMap(6, 11)
        const cell = S2.Cell.fromString(CellID);
        cell.addArrayIndex(0, Cell_Level);

        const result = await map.getCellValuebyNeighbors(cell);

        expect(result).toBe((100 + 200) / 2);
    })

    it("should get aprox value by parent", async () => {
        const map = new DensityMap(6, 11)
        const cell = S2.Cell.fromString(CellID);
        cell.addArrayIndex(16, Cell_Level);  // 

        // make sure value doesn't exists
        const directResult = await map.getCellsValues([cell]);
        expect(directResult[0]).toBe(undefined);

        const result = await map.getCellValuebyNeighbors(cell);
        expect(result).toBe((100 + 200 + 300 + 400) / 4);
    })

});