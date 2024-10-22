import { XYZ } from ".";
import { Cell } from "./Cell";


export interface Region {
    mayIntersect(s: Cell): boolean;
    contains(s: Cell): boolean;
    empty(): boolean;
    points: XYZ[];
}
