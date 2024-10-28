import * as S2 from "./lib/S2";
import * as localforage from "localforage";

interface CacheEntry {
    id: string;
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

    async getCellsValues(cells: S2.Cell[]): Promise<(number | undefined)[]> {

        // eslint-disable-next-line unicorn/no-new-array
        const result: (number | undefined)[] = new Array(cells.length);

        let cached: CacheEntry | undefined;
        let lastID = "";

        for (const [i, cell] of cells.entries()) {
            console.assert(cell.level === this.cacheLevel, "only 'cache Level' is supported (RN)");
            const baseID = cell.toString(this.cacheLevel);
            const index = cell.toArrayIndex(this.cacheLevel);

            if (lastID !== baseID) {
                cached = this.cache.find(c => c.id === baseID);
                if (!cached) {

                    const mus = await this.store.getItem<number[]>(baseID);
                    if (mus) {
                        cached = {
                            id: baseID,
                            changed: false,
                            mu: mus
                        }

                        this.cache.push(cached);
                    }
                }
                lastID = baseID;
            }

            if (cached) {
                result[i] = cached.mu[index];
            }
        }

        return result;
    }



    async setCellsValues(cells: S2.Cell[], values: number[]): Promise<void> {

        let cached: CacheEntry | undefined;
        let lastID = "";

        for (const [i, cell] of cells.entries()) {
            console.assert(cell.level === this.cacheLevel, "only 'cache Level' is supported (RN)");
            const baseID = cell.toString(this.cacheLevel);
            const index = cell.toArrayIndex(this.cacheLevel);

            if (lastID !== baseID) {
                cached = this.cache.find(c => c.id === baseID);
                if (!cached) {
                    const mus = await this.store.getItem<number[]>(baseID);
                    if (mus) {
                        cached = {
                            id: baseID,
                            changed: false,
                            mu: mus
                        }

                        this.cache.push(cached);
                    }
                }
                lastID = baseID;
            }

            if (cached && cached.mu[index] !== values[i]) {
                cached.mu[index] = values[i];
                cached.changed = true;
            }
        }
    }

    flush() {
        this.cache
            .filter(c => c.changed)
            .forEach(async c => {
                await this.store.setItem(c.id, c.mu);
                c.changed = false;
            })
    }

}