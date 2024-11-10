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
    private maxCacheEntries: number;
    private cache: CacheEntry[];
    private store: LocalForage;

    /**
     * 
     * @param cacheLevel grouped by this cell level ()
     * @param cellLevel cell level to be requestes
     * @param maxCacheEntries max number of groups keepd in memory
     * Each group can take a max ofre Math.pow(4,cellLevel-cacheLevel) * sizeof(number) memory
     */
    constructor(cacheLevel: number, cellLevel: number, maxCacheEntries: number = 10) {
        console.assert(cacheLevel < cellLevel, "cacheLevel must be greater than cellLevel")

        this.cache = [];
        this.cacheLevel = cacheLevel;
        this.cellLevel = cellLevel;
        this.maxCacheEntries = maxCacheEntries;

        console.assert(Math.pow(4, this.cellLevel - this.cacheLevel) < 100000, "this wont work, too much entries, level difference to high");

        this.store = localforage.createInstance({
            name: "CellDB",
            driver: [localforage.WEBSQL, localforage.INDEXEDDB],
        });
    }


    /**
     * for debug / statistic / test
     */
    getCachedCells(): number {
        const sum = this.cache.reduce((sum, ar) => sum + ar.mu.filter(v => v !== undefined).length, 0)
        return sum;
    }

    /**
     * Get cell values of all given cells
     * @param cacheCleanup set to false for large operations and when memory is not an issue
     */
    async getCellsValues(cells: S2.Cell[], cacheCleanup: boolean = true): Promise<(number | undefined)[]> {

        // eslint-disable-next-line unicorn/no-new-array
        const result: (number | undefined)[] = new Array(cells.length);

        for (const [i, cell] of cells.entries()) {
            console.assert(cell.level === this.cellLevel, "only 'cell Level' is supported (RN)", cell.level, this.cellLevel);

            const cached = await this.getEntry(cell);

            const index = cell.toArrayIndex(this.cacheLevel);
            result[i] = cached?.mu[index];
        }

        if (cacheCleanup) this.updateCache();

        return result;
    }

    /**
     * Set cell values of all given cells
     * NOTE: make sure to trigger 'save' or 'cacheClear' to store new values
     */
    async setCellsValues(cells: S2.Cell[], values: number[]): Promise<void> {

        for (const [i, cell] of cells.entries()) {
            console.assert(cell.level === this.cellLevel, "only 'cell Level' is supported (RN)", cell.level, this.cellLevel);
            console.assert(values[i] !== undefined, "no value[i] given");

            const cached = await this.getEntryOrCreate(cell);
            const index = cell.toArrayIndex(this.cacheLevel);

            if (cached.mu[index] !== values[i]) {
                cached.mu[index] = values[i];
                cached.changed = true;
            }
        }
    }


    private lastCachedID: string;
    private lastCachedEnty: CacheEntry | undefined;
    private async getEntry(cell: S2.Cell): Promise<CacheEntry | undefined> {
        const id = `${cell.toString(this.cacheLevel)}_${this.cellLevel}`;
        if (this.lastCachedID === id) return this.lastCachedEnty!;

        this.lastCachedEnty = this.cache.find(c => c.id === id);
        if (!this.lastCachedEnty) {
            const mus = await this.store.getItem<number[]>(id);
            if (mus) {
                this.lastCachedEnty = {
                    id: id,
                    changed: false,
                    mu: mus
                }
            }
        }

        this.lastCachedID = id;
        return this.lastCachedEnty;
    }


    private async getEntryOrCreate(cell: S2.Cell): Promise<CacheEntry> {
        const id = `${cell.toString(this.cacheLevel)}_${this.cellLevel}`;
        if (this.lastCachedEnty?.id === id) return this.lastCachedEnty;

        this.lastCachedEnty = this.cache.find(c => c.id === id);
        if (!this.lastCachedEnty) {
            const mus = await this.store.getItem<number[]>(id);
            this.lastCachedEnty = {
                id: id,
                changed: false,
                mu: mus ?? []
            }
            this.cache.push(this.lastCachedEnty);
        }

        this.lastCachedID = id;
        return this.lastCachedEnty;
    }


    save() {
        this.cache
            .filter(c => c.changed)
            .forEach(async c => {
                await this.store.setItem(c.id, c.mu);
                c.changed = false;
            })
    }


    updateCache() {
        while (this.cache.length > this.maxCacheEntries) {
            const c = this.cache.shift();
            if (c?.changed) {
                void this.store.setItem(c.id, c.mu);
            }
        }
    }

    clearCache() {
        this.save();
        this.cache.length = 0;
    }


    async forEach(callback: (cell: S2.Cell, mindunits: number) => void) {
        await this.store.iterate((values: number[], idStr: string) => {
            const parts = idStr.split("_");
            console.assert(parts.length === 2, "illegal id str");

            const baseID = parts[0];
            const level = parseInt(parts[1]);
            if (level === this.cellLevel) {
                values.forEach((mu, index) => {
                    if (mu !== undefined) {
                        const cell = S2.Cell.fromString(baseID);
                        cell.addArrayIndex(index, level);
                        callback(cell, mu);
                    }
                })
            }
        })
    }


    protected async getByParent(cell: S2.Cell, levelDif: number = 1): Promise<number | undefined> {
        const mask = (1 << (2 * levelDif)) - 1;
        const index = cell.toArrayIndex(this.cacheLevel) & ~mask;

        const cached = await this.getEntry(cell);
        if (!cached) return;

        const values = cached.mu.slice(index, index + Math.pow(4, levelDif))
            .filter(f => f !== undefined);
        const sum = values.reduce((sum, v) => sum + v, 0);

        if (values.length === 0) return;

        return sum / values.length;
    }


    async getCellValuebyNeighbors(cell: S2.Cell): Promise<number | undefined> {
        let levelDif = 1;
        while (this.cacheLevel <= this.cellLevel - levelDif) {
            const value = await this.getByParent(cell, levelDif);
            if (value) return value;
            levelDif++;
        }

        return undefined;
    }
}