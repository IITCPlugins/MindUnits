import { XYZ, Level, XYZToFaceUV, UVToST, STToIJ } from ".";
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

    getCoveringFromCell(start: Cell): Cell[] {
        const cells: Cell[] = [];
        const processed = new Set<string>();
        const stack = [start];
        processed.add(start.toString());

        while (stack.length > 0) {
            const s = stack.pop()!;
            if (!this.region.mayIntersect(s)) continue;

            cells.push(s);
            for (const ns of s.getNeighbors()) {
                if (!processed.has(ns.toString())) {
                    processed.add(ns.toString());
                    stack.push(ns);
                }
            }
        }
        return cells;
    }

    getCovering(region: Region, level_min: Level, level_max: Level): Cell[] {
        if (level_min > level_max) {
            [level_min, level_max] = [level_max, level_min];
            console.warn("s2.getCovering: level-min > level-max");
        }
        this.region = region;
        if (this.region.empty()) return [];

        let currentCells = this.getCoveringFromCell(this.getCoveringPoint(this.region.points[0], level_min));

        let final: Cell[] = [];
        while (level_min < level_max && currentCells.length > 0) {
            const newCells: Cell[] = [];
            currentCells.forEach(cell => {

                if (region.contains(cell)) {
                    final.push(cell);
                } else {
                    const inside = cell.getChildren().filter(c => this.region.mayIntersect(c));
                    newCells.push(...inside);
                }

            });

            level_min++;
            currentCells = newCells;
        }

        // eslint-disable-next-line unicorn/prefer-spread -- spread operator can crash here ("too much fct args")
        final = final.concat(currentCells);

        return final;
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
