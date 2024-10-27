import { XYZ } from ".";
import { XYZEqual, det } from "./Math";
import { Polyline } from "./Polyline";
import { Cell } from "./Cell";



export class Triangle extends Polyline {
    center: XYZ;
    centerSides: [number, number, number];

    constructor(a: XYZ, b: XYZ, c: XYZ) {
        super([a, b, c, a]);

        if (XYZEqual(this.points[0], this.points[1]) ||
            XYZEqual(this.points[0], this.points[2]) ||
            XYZEqual(this.points[1], this.points[2])) {
            // triangle with equal corners = empty
            this.points.length = 0;
            return;
        }

        this.center = [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
        this.centerSides = [
            det(this.center, a, b),
            det(this.center, b, c),
            det(this.center, c, a)
        ];
    }

    /**
     * is the cell completly inside the regions
     */
    contains(s: Cell) {
        const corners = s.getCornerXYZ();
        return corners.every(p => this.containsPoint(p));
    }


    containsPoint(xyz: XYZ) {
        if (det(xyz, this.points[0], this.points[1]) * this.centerSides[0] < 0) { return false; }
        if (det(xyz, this.points[1], this.points[2]) * this.centerSides[1] < 0) { return false; }
        if (det(xyz, this.points[2], this.points[0]) * this.centerSides[2] < 0) { return false; }
        return true;
    }

    /**
     * true if the cell is touched
     * a) one corner is inside this region
     * b) one of the region point is inside the region
     * c) one of the line crosses the border
     */
    mayIntersect(s: Cell) {
        if (super.mayIntersect(s)) return true;

        const corners = s.getCornerXYZ();
        return corners.some(p => this.containsPoint(p));
    }
}