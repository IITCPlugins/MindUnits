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
        const m = /(?<face>\d+)\[(?<i>\d+),(?<j>\d+)\](?<level>\d+)/.exec(code);
        if (!m?.groups) {
            throw new Error(`Invalid cell code: ${code}`);
        }

        const g = m.groups;
        return Cell.FromFaceIJ(Number(g.face) as Face, [Number(g.i), Number(g.j)], Number(g.level));
    }

    toString() {
        return `${this.face}[${this.ij[0]},${this.ij[1]}]${this.level}`;
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
