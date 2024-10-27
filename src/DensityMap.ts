import * as S2 from "./lib/S2";
import * as localforage from "localforage";

interface CacheEntry {
    cell: S2.Cell;
    changed: boolean;
    mu: number[];
}

export class DensityMap {

    private cacheLevel: number;
    private cellLevel: number;
    private cache: CacheEntry[];
    private store: LocalForage;


    constructor(cacheLevel: number, cellLevel: number) {
        console.assert(cacheLevel < cellLevel, "cacheLevel must be greater than cellLevel")

        this.cacheLevel = cacheLevel;
        this.cellLevel = cellLevel;

        console.assert(Math.pow(4, this.cellLevel - this.cacheLevel) < 100000, "this wont work, too much entries, level difference to high");
    }

    init() {
        this.store = localforage.createInstance({
            name: "CellDB",
            driver: [localforage.WEBSQL, localforage.INDEXEDDB],
        });
    }

    async getCellsValues(cells: S2.Cell[]): Promise<number[]> {

        const resultsIndex: number[] = []

        // sort cells by parent

        // get cache entry

        // add cells

        return [];
    }

    private getCacheEntry(field: IITC.Field): Promise<number | undefined> {
        const old: StoredField | null = await this.store.getItem(myguid);
    }

}