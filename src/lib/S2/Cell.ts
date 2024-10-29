/* eslint-disable unicorn/prefer-code-point */
import { Face, IJ, Level, UV, LatLng, XYZ } from ".";
import { LatLngToXYZ, XYZToFaceUV, UVToST, STToIJ, STToUV, IJToST, hilbertQuadListToPoint, FaceUVToXYZ, XYZToLatLng, pointToHilbertQuadList } from "./Math";


export class Cell {
    face: Face;
    ij: IJ;
    level: Level;

    private uvBound: [UV, UV];

    // static method to construct cell
    static FromLatLng(latLng: LatLng, level: Level): Cell {
        const xyz = LatLngToXYZ(latLng);

        const faceuv = XYZToFaceUV(xyz);
        const st = UVToST(faceuv[1]);

        const ij = STToIJ(st, level);

        return Cell.FromFaceIJ(faceuv[0], ij, level);
    }

    static FromFaceIJ(face: Face, ij: IJ, level: Level): Cell {
        const cell = new Cell();
        cell.face = face;
        cell.ij = ij;
        cell.level = level;

        const uv0 = STToUV(IJToST(cell.ij, cell.level, [0, 0]));
        const uv1 = STToUV(IJToST(cell.ij, cell.level, [1, 1]));
        cell.uvBound = [uv0, uv1];

        return cell;
    }

    /**
     * Create cell by face and hilbertcurve position
     * (this is like the original CellID construction)
     */
    static FromFacePosition(face: Face, position: number[]): Cell {
        const ij = hilbertQuadListToPoint(face, position);
        return Cell.FromFaceIJ(face, ij, position.length);
    }

    static fromString(code: string): Cell {
        if (!code) {
            throw new Error(`Invalid cell code: ${code}`);
        }

        const nullchar = "0".charCodeAt(0);
        const numbers: number[] = [...code].map(i => i.charCodeAt(0) - nullchar);
        const face = numbers.shift() as Face;
        const level = numbers.length;
        let i = 0;
        let j = 0;
        numbers.forEach(v => {
            i = (i << 1) + (v & 1);
            j = (j << 1) + (v >> 1);
        });

        return Cell.FromFaceIJ(face, [i, j], level);
    }

    /**
     * @return Cell-ID as string
     * Note: this is not related to Google-S2-CellID
     * we skip most 64bit arithmetic and skip the hilbertcurve 
     * @param level force level 
     */
    toString(level?: number): string {
        const numbers: number[] = [this.face];

        level ??= this.level;
        let bit = 1 << (this.level - 1);
        for (; level > 0; level--) {
            numbers.push(((this.ij[0] & bit) ? 1 : 0) + ((this.ij[1] & bit) ? 2 : 0));
            bit >>= 1;
        }
        return numbers.join("");
    }


    toArrayIndex(baseLevel: number): number {
        let index = 0;
        const level = this.level - baseLevel;
        console.assert(level > 0, "baseLevel must be lower than current level", this.level, baseLevel);
        if (level <= 0) {
            // DEBUG-START
            throw new Error("baseLevel must be lower than current level");
            // DEBUG-END
            return 0;
        }
        let bit = 1 << (level - 1);
        while (bit) {
            index = (index << 2) + ((this.ij[0] & bit) ? 1 : 0) + ((this.ij[1] & bit) ? 2 : 0);
            bit >>= 1;
        }
        return index;
    }

    addArrayIndex(index: number, level: number) {
        const extraLevel = level - this.level;
        console.assert(extraLevel > 0, "index_Level must be higger than current level", this.level, level);
        if (extraLevel <= 0) {
            // DEBUG-START
            throw new Error("index_Level must be higger than current level");
            // DEBUG-END
            return;
        }

        let bit = 2 << (2 * (extraLevel - 1));
        while (bit) {
            this.ij[1] = (this.ij[1] << 1) + ((index & bit) ? 1 : 0);
            bit >>= 1;
            this.ij[0] = (this.ij[0] << 1) + ((index & bit) ? 1 : 0);
            bit >>= 1;
        }
        this.level = level;

        const uv0 = STToUV(IJToST(this.ij, this.level, [0, 0]));
        const uv1 = STToUV(IJToST(this.ij, this.level, [1, 1]));
        this.uvBound = [uv0, uv1];
    }

    maxArrayIndex(baseLevel: number, maxLevel: number): number {
        return Math.pow(4, maxLevel - baseLevel);
    }


    equal(b: Cell): boolean {
        return this.face === b.face && this.ij[0] === b.ij[0] && this.ij[1] === b.ij[1] && this.level === b.level;
    }

    contains(xyz: XYZ) {
        const [face, uv] = XYZToFaceUV(xyz);
        if (face !== this.face) return false;

        const [uv0, uv1] = this.uvBound;
        return (
            uv0[0] <= uv[0] && uv[0] <= uv1[0] && uv0[1] <= uv[1] && uv[1] <= uv1[1]
        );
    }

    getLatLng() {
        const st = IJToST(this.ij, this.level, [0.5, 0.5]);
        const uv = STToUV(st);
        const xyz = FaceUVToXYZ(this.face, uv);

        return XYZToLatLng(xyz);
    }

    getCornerXYZ(): XYZ[] {
        const result: XYZ[] = [];
        const offsets: IJ[] = [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0]
        ];

        for (let i = 0; i < 4; i++) {
            const st = IJToST(this.ij, this.level, offsets[i]);
            const uv = STToUV(st);
            result.push(FaceUVToXYZ(this.face, uv));
        }
        return result;
    }

    getCornerLatLngs() {
        return this.getCornerXYZ().map(XYZToLatLng);
    }

    getFaceAndQuads() {
        const quads = pointToHilbertQuadList(this.face, this.ij[0], this.ij[1], this.level);

        return [this.face, quads];
    }

    getNeighbors() {
        const face = this.face;
        const i = this.ij[0];
        const j = this.ij[1];
        const level = this.level;

        return [
            this.fromFaceIJWrap(face, [i - 1, j], level),
            this.fromFaceIJWrap(face, [i, j - 1], level),
            this.fromFaceIJWrap(face, [i + 1, j], level),
            this.fromFaceIJWrap(face, [i, j + 1], level)
        ];
    }

    private fromFaceIJWrap(face: Face, ij: IJ, level: Level): Cell {
        const maxSize = 1 << level;
        if (ij[0] >= 0 && ij[1] >= 0 && ij[0] < maxSize && ij[1] < maxSize) {
            // no wrapping out of bounds
            return Cell.FromFaceIJ(face, ij, level);
        } else {
            // the new i,j are out of range.
            // with the assumption that they're only a little past the borders we can just take the points as
            // just beyond the cube face, project to XYZ, then re-create FaceUV from the XYZ vector
            let st = IJToST(ij, level, [0.5, 0.5]);
            let uv = STToUV(st);
            const xyz = FaceUVToXYZ(face, uv);
            const faceuv = XYZToFaceUV(xyz);
            face = faceuv[0];
            uv = faceuv[1];
            st = UVToST(uv);
            ij = STToIJ(st, level);
            return Cell.FromFaceIJ(face, ij, level);
        }
    }

    getChildren() {
        const face = this.face;
        const i = this.ij[0] * 2;
        const j = this.ij[1] * 2;
        const level = this.level + 1;
        return [
            Cell.FromFaceIJ(face, [i, j], level),
            Cell.FromFaceIJ(face, [i, j + 1], level),
            Cell.FromFaceIJ(face, [i + 1, j], level),
            Cell.FromFaceIJ(face, [i + 1, j + 1], level)
        ];
    }

    getParent(): Cell | undefined {
        if (this.level <= 1) return;
        const face = this.face;
        const i = this.ij[0] >> 1;
        const j = this.ij[1] >> 1;
        const level = this.level - 1;
        return Cell.FromFaceIJ(face, [i, j], level);
    }
}
