type Face = number;
type LatLng = { lat: number; lng: number };
type XYZ = [number, number, number];
type UV = [number, number];
type ST = [number, number];
type IJ = [number, number];
type Level = number;

export function LatLngToXYZ(latLng: LatLng): XYZ {
    const d2r = Math.PI / 180.0;

    const phi = latLng.lat * d2r;
    const theta = latLng.lng * d2r;

    const cosphi = Math.cos(phi);

    return [Math.cos(theta) * cosphi, Math.sin(theta) * cosphi, Math.sin(phi)];
}

export function XYZToLatLng(xyz: XYZ): LatLng {
    const r2d = 180.0 / Math.PI;

    const lat = Math.atan2(xyz[2], Math.sqrt(xyz[0] * xyz[0] + xyz[1] * xyz[1]));
    const lng = Math.atan2(xyz[1], xyz[0]);

    return { lat: lat * r2d, lng: lng * r2d };
}

function largestAbsComponent(xyz: XYZ) {
    const temp = [Math.abs(xyz[0]), Math.abs(xyz[1]), Math.abs(xyz[2])];

    if (temp[0] > temp[1]) {
        if (temp[0] > temp[2]) {
            return 0;
        } else {
            return 2;
        }
    } else {
        if (temp[1] > temp[2]) {
            return 1;
        } else {
            return 2;
        }
    }
}

function faceXYZToUV(face: Face, xyz: XYZ): UV {
    let u: number, v: number;

    switch (face) {
        case 0:
            u = xyz[1] / xyz[0];
            v = xyz[2] / xyz[0];
            break;
        case 1:
            u = -xyz[0] / xyz[1];
            v = xyz[2] / xyz[1];
            break;
        case 2:
            u = -xyz[0] / xyz[2];
            v = -xyz[1] / xyz[2];
            break;
        case 3:
            u = xyz[2] / xyz[0];
            v = xyz[1] / xyz[0];
            break;
        case 4:
            u = xyz[2] / xyz[1];
            v = -xyz[0] / xyz[1];
            break;
        case 5:
            u = -xyz[1] / xyz[2];
            v = -xyz[0] / xyz[2];
            break;
        default:
            throw { error: 'Invalid face' };
    }

    return [u, v];
}

function XYZToFaceUV(xyz: XYZ): [Face, UV] {
    let face = largestAbsComponent(xyz);

    if (xyz[face] < 0) {
        face += 3;
    }

    const uv = faceXYZToUV(face, xyz);

    return [face, uv];
}

function FaceUVToXYZ(face: Face, uv: UV): XYZ {
    const u = uv[0];
    const v = uv[1];

    switch (face) {
        case 0:
            return [1, u, v];
        case 1:
            return [-u, 1, v];
        case 2:
            return [-u, -v, 1];
        case 3:
            return [-1, -v, -u];
        case 4:
            return [v, -1, -u];
        case 5:
            return [v, u, -1];
        default:
            throw { error: 'Invalid face' };
    }
}

function STToUV(st: ST): UV {
    function quadSTtoUV(st: number) {
        if (st >= 0.5) {
            return (1 / 3.0) * (4 * st * st - 1);
        } else {
            return (1 / 3.0) * (1 - 4 * (1 - st) * (1 - st));
        }
    }

    return [quadSTtoUV(st[0]), quadSTtoUV(st[1])];
}

function UVToST(uv: UV): ST {
    function quadUVtoST(uv: number) {
        if (uv >= 0) {
            return 0.5 * Math.sqrt(1 + 3 * uv);
        } else {
            return 1 - 0.5 * Math.sqrt(1 - 3 * uv);
        }
    }

    return [quadUVtoST(uv[0]), quadUVtoST(uv[1])];
}

function STToIJ(st: ST, order: Level): IJ {
    const maxSize = 1 << order;

    function singleSTtoIJ(st: number) {
        const ij = Math.floor(st * maxSize);
        return Math.max(0, Math.min(maxSize - 1, ij));
    }

    return [singleSTtoIJ(st[0]), singleSTtoIJ(st[1])];
}

function IJToST(ij: IJ, order: Level, offsets: IJ): ST {
    const maxSize = 1 << order;

    return [(ij[0] + offsets[0]) / maxSize, (ij[1] + offsets[1]) / maxSize];
}

// hilbert space-filling curve
// based on http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves
// note: rather then calculating the final integer hilbert position, we just return the list of quads
// this ensures no precision issues whth large orders (S3 cell IDs use up to 30), and is more
// convenient for pulling out the individual bits as needed later
function pointToHilbertQuadList(x: number, y: number, order: Level) {
    const hilbertMap: { [i: string]: [number, string][] } = {
        a: [
            [0, 'd'],
            [1, 'a'],
            [3, 'b'],
            [2, 'a'],
        ],
        b: [
            [2, 'b'],
            [1, 'b'],
            [3, 'a'],
            [0, 'c'],
        ],
        c: [
            [2, 'c'],
            [3, 'd'],
            [1, 'c'],
            [0, 'b'],
        ],
        d: [
            [0, 'a'],
            [3, 'c'],
            [1, 'd'],
            [2, 'd'],
        ],
    };

    let currentSquare = 'a';
    const positions = [];

    for (let i = order - 1; i >= 0; i--) {
        const mask = 1 << i;

        const quad_x = x & mask ? 1 : 0;
        const quad_y = y & mask ? 1 : 0;

        const t = hilbertMap[currentSquare][quad_x * 2 + quad_y];

        positions.push(t[0]);

        currentSquare = t[1];
    }

    return positions;
}

function cross(a: XYZ, b: XYZ): XYZ {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}

function dot(a: XYZ, b: XYZ) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function det(a: XYZ, b: XYZ, c: XYZ) {
    return dot(cross(a, b), c);
}

function simple_crossing(a: XYZ, b: XYZ, c: XYZ, d: XYZ) {
    const ab = cross(a, b);
    const acb = -dot(ab, c);
    const bda = dot(ab, d);
    if (acb * bda <= 0) return false;

    const cd = cross(c, d);
    const cbd = -dot(cd, b);
    const dac = dot(cd, a);
    return acb * cbd > 0 && acb * dac > 0;
}

interface S2Region {
    mayIntersect(s: S2Cell): boolean;
    contains(s: S2Cell): boolean;
    empty(): boolean;
    points: XYZ[];
}

export class S2Polyline implements S2Region {
    points: XYZ[];

    constructor(points?: XYZ[]) {
        this.points = points || [];
    }

    empty() {
        return this.points.length == 0;
    }

    contains(s: S2Cell) {
        return false;
    }

    mayIntersect(s: S2Cell) {
        if (this.empty()) return false;

        for (const point of this.points) if (s.contains(point)) return true;

        const corners = s.getCornerXYZ();
        for (let i = this.points.length - 1; i > 0; i--)
            if (
                corners.some((p, j) =>
                    simple_crossing(
                        this.points[i],
                        this.points[i - 1],
                        p,
                        corners[(j + 1) % 4]
                    )
                )
            )
                return true;

        return false;
    }
}

// Triangle in a single semisphere
export class S2Triangle extends S2Polyline {
    center: XYZ;
    centerSides: [number, number, number];

    constructor(a: XYZ, b: XYZ, c: XYZ) {
        super([a, b, c, a]);
        this.center = [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
        this.centerSides = [
            det(this.center, a, b),
            det(this.center, b, c),
            det(this.center, c, a),
        ];
    }

    empty() {
        return false;
    }

    contains(s: S2Cell) {
        const corners = s.getCornerXYZ();
        return corners.every(p => this.containsPoint(p));
    }


    containsPoint(xyz: XYZ) {
        if (det(xyz, this.points[0], this.points[1]) * this.centerSides[0] < 0)
            return false;
        if (det(xyz, this.points[1], this.points[2]) * this.centerSides[1] < 0)
            return false;
        if (det(xyz, this.points[2], this.points[0]) * this.centerSides[2] < 0)
            return false;
        return true;
    }

    mayIntersect(s: S2Cell) {
        if (super.mayIntersect(s)) return true;

        const corners = s.getCornerXYZ();
        for (const p of corners) if (this.containsPoint(p)) return true;

        return false;
    }
}

export class S2RegionCover {
    region: S2Region;

    getCoveringPoint(point: XYZ, level: Level) {
        const [face, uv] = XYZToFaceUV(point);
        const st = UVToST(uv);
        const ij = STToIJ(st, level);
        return S2Cell.FromFaceIJ(face, ij, level);
    }

    getCoveringFromCell(start: S2Cell): S2Cell[] {
        const ret: S2Cell[] = [];
        const frontier = new Set<string>();
        const stack = [start];
        frontier.add(start.toString());
        while (stack.length) {
            const s = stack.pop()!;
            if (!this.region.mayIntersect(s)) continue;

            ret.push(s);
            for (const ns of s.getNeighbors()) {
                if (!frontier.has(ns.toString())) {
                    frontier.add(ns.toString());
                    stack.push(ns);
                }
            }
        }
        return ret;
    }

    getCovering(region: S2Region, level_min: Level, level_max: Level): S2Cell[] {
        if (level_min > level_max) {
            [level_min, level_max] = [level_min, level_max];
            console.warn("s2.getCovering: level-min > level-max");
        }
        this.region = region;
        if (this.region.empty()) return [];

        let currentCells = this.getCoveringFromCell(this.getCoveringPoint(this.region.points[0], level_min));

        const final: S2Cell[] = [];
        while (level_min < level_max && currentCells.length > 0) {
            const newCells: S2Cell[] = [];
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
        final.push(...currentCells);

        return final;
    }


    howManyIntersect(region: S2Region, cell: S2Cell, level: Level): number {
        let total = 0;

        if (level <= cell.level) return 1;

        if (region.contains(cell)) {
            return Math.pow(4, level - cell.level);
        }

        cell.getChildren()
            .filter(c => this.region.mayIntersect(c))
            .forEach(c => total += this.howManyIntersect(region, c, level))

        return total;
    }
}


// S2Cell class
export class S2Cell {
    face: Face;
    ij: IJ;
    level: Level;

    private uvBound: [UV, UV];

    //static method to construct
    static FromLatLng(latLng: LatLng, level: Level): S2Cell {
        const xyz = LatLngToXYZ(latLng);

        const faceuv = XYZToFaceUV(xyz);
        const st = UVToST(faceuv[1]);

        const ij = STToIJ(st, level);

        return S2Cell.FromFaceIJ(faceuv[0], ij, level);
    }

    static FromFaceIJ(face: Face, ij: IJ, level: Level): S2Cell {
        const cell = new S2Cell();
        cell.face = face;
        cell.ij = ij;
        cell.level = level;

        const uv0 = STToUV(IJToST(cell.ij, cell.level, [0, 0]));
        const uv1 = STToUV(IJToST(cell.ij, cell.level, [1, 1]));
        cell.uvBound = [uv0, uv1];

        return cell;
    }

    static fromString(code: string): S2Cell {
        const m = code.match(/(?<face>\d+)\[(?<i>\d+),(?<j>\d+)\](?<level>\d+)/);
        if (!m || !m.groups) {
            throw new Error(`Invalid cell code: ${code}`);
        }

        const g = m.groups;
        return S2Cell.FromFaceIJ(Number(g.face), [Number(g.i), Number(g.j)], Number(g.level));
    }

    toString() {
        return `${this.face}[${this.ij[0]},${this.ij[1]}]${this.level}`;
    }


    contains(xyz: XYZ) {
        const [face, uv] = XYZToFaceUV(xyz);
        if (face != this.face) return false;

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
            [0.0, 0.0],
            [0.0, 1.0],
            [1.0, 1.0],
            [1.0, 0.0],
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
        const quads = pointToHilbertQuadList(this.ij[0], this.ij[1], this.level);

        return [this.face, quads];
    }

    getNeighbors() {
        function fromFaceIJWrap(face: Face, ij: IJ, level: Level) {
            const maxSize = 1 << level;
            if (ij[0] >= 0 && ij[1] >= 0 && ij[0] < maxSize && ij[1] < maxSize) {
                // no wrapping out of bounds
                return S2Cell.FromFaceIJ(face, ij, level);
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
                return S2Cell.FromFaceIJ(face, ij, level);
            }
        }

        const face = this.face;
        const i = this.ij[0];
        const j = this.ij[1];
        const level = this.level;

        return [
            fromFaceIJWrap(face, [i - 1, j], level),
            fromFaceIJWrap(face, [i, j - 1], level),
            fromFaceIJWrap(face, [i + 1, j], level),
            fromFaceIJWrap(face, [i, j + 1], level),
        ];
    }

    getChildren() {
        const face = this.face;
        const i = this.ij[0] * 2;
        const j = this.ij[1] * 2;
        const level = this.level + 1;
        return [
            S2Cell.FromFaceIJ(face, [i, j], level),
            S2Cell.FromFaceIJ(face, [i, j + 1], level),
            S2Cell.FromFaceIJ(face, [i + 1, j], level),
            S2Cell.FromFaceIJ(face, [i + 1, j + 1], level),
        ];
    }

    getParent() {
        if (this.level <= 1) return null;
        const face = this.face;
        const i = this.ij[0] >> 1;
        const j = this.ij[1] >> 1;
        const level = this.level - 1;
        return S2Cell.FromFaceIJ(face, [i, j], level);
    }
}