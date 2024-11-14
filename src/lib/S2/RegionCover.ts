import { XYZ, Level, XYZToFaceUV, UVToST, STToIJ, Face } from ".";
import { Cell } from "./Cell";
import { Region } from "./Region";


export class RegionCover {
    region: Region;

    getCoveringPoint(point: XYZ, level: Level) {
        const [face, uv] = XYZToFaceUV(point);
        const st = UVToST(uv);
        const ij = STToIJ(st, level);
        return Cell.FromFaceIJ(face, ij, level);
    }

    getCovering(region: Region, level_min: Level, level_max: Level): Cell[] {
        if (level_min > level_max) {
            throw new Error("s2.getCovering: level-min > level-max");
        }

        this.region = region;
        if (this.region.empty()) return [];

        let currentCells = this.getCoveringFaces();
        let level = 0;

        let final: Cell[] = [];
        while (level < level_max && currentCells.length > 0) {
            const newCells: Cell[] = [];
            currentCells.forEach(cell => {

                if (region.contains(cell)) {
                    this.addCellsRecursive(cell, final, level_min);
                } else {
                    const inside = cell.getChildren().filter(c => this.region.mayIntersect(c));
                    newCells.push(...inside);
                }
            });

            level++;
            currentCells = newCells;
        }

        // eslint-disable-next-line unicorn/prefer-spread -- spread operator can crash here ("too much fct args")
        final = final.concat(currentCells);

        return final;
    }


    private getCoveringFaces(): Cell[] {
        const cells: Cell[] = [];
        for (let face = 0; face < 6; face++) {
            const cell = Cell.FromFace(face as Face);
            if (this.region.mayIntersect(cell))
                cells.push(cell);
        }

        return cells;
    }

    private addCellsRecursive(base: Cell, result: Cell[], level: number) {
        if (base.level === level) {
            result.push(base);
        } else {
            base.getChildren().forEach(c => this.addCellsRecursive(c, result, level));
        }
    }

    howManyIntersect(region: Region, cell: Cell, level: Level): number {
        let total = 0;

        if (level <= cell.level) return 1;

        if (region.contains(cell)) {
            return Math.pow(4, level - cell.level);
        }

        cell.getChildren()
            .filter(c => this.region.mayIntersect(c))
            .forEach(c => total += this.howManyIntersect(region, c, level));

        return total;
    }
}
