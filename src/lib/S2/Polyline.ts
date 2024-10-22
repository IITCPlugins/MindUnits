import { XYZ } from ".";
import { simple_crossing } from "./Math";
import { Region } from "./Region";
import { Cell } from "./Cell";


export class Polyline implements Region {
    points: XYZ[];

    constructor(points?: XYZ[]) {
        this.points = points ?? [];
    }

    empty(): boolean {
        return this.points.length === 0;
    }

    contains(_s: Cell): boolean {
        return false;
    }

    mayIntersect(s: Cell): boolean {
        if (this.empty()) return false;

        // atleast point is inside the cell
        if (this.points.some(point => s.contains(point))) return true;

        // or one line is crossing the cell border
        const corners = s.getCornerXYZ();
        for (let i = this.points.length - 1; i > 0; i--) {
            if (corners.some((p, j) => simple_crossing(
                this.points[i],
                this.points[i - 1],
                p,
                corners[(j + 1) % 4]
            )
            )) { return true; }
        }

        return false;
    }
}
