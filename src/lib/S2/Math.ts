/* eslint-disable no-bitwise */
import { Face, IJ, Level, UV, LatLng, XYZ } from ".";
type ST = [number, number];

export const LatLngToXYZ = (latLng: LatLng): XYZ => {
    const d2r = Math.PI / 180;

    const phi = latLng.lat * d2r;
    const theta = latLng.lng * d2r;

    const cosphi = Math.cos(phi);

    return [Math.cos(theta) * cosphi, Math.sin(theta) * cosphi, Math.sin(phi)];
}

export const XYZToLatLng = (xyz: XYZ): LatLng => {
    const r2d = 180 / Math.PI;

    const lat = Math.atan2(xyz[2], Math.hypot(xyz[0], xyz[1]));
    const lng = Math.atan2(xyz[1], xyz[0]);

    return { lat: lat * r2d, lng: lng * r2d };
}

export const XYZEqual = (a: XYZ, b: XYZ): boolean => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

const largestAbsComponent = (xyz: XYZ): 0 | 1 | 2 => {
    const abs = [Math.abs(xyz[0]), Math.abs(xyz[1]), Math.abs(xyz[2])];

    if (abs[0] > abs[1]) {
        return abs[0] > abs[2] ? 0 : 2;
    } else {
        return abs[1] > abs[2] ? 1 : 2;
    }
}

const faceXYZToUV = (face: Face, xyz: XYZ): UV => {
    let u: number;
    let v: number;

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
            throw new Error("Invalid face");
    }

    return [u, v];
}

export const XYZToFaceUV = (xyz: XYZ): [Face, UV] => {
    let face: Face = largestAbsComponent(xyz);

    if (xyz[face] < 0) {
        face = (face + 3) as Face;
    }

    const uv = faceXYZToUV(face, xyz);

    return [face, uv];
}

export const FaceUVToXYZ = (face: Face, uv: UV): XYZ => {
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
            throw new Error("Invalid face");
    }
}

export const STToUV = (st: ST): UV => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const quadSTtoUV = (stn: number): number => {
        if (stn >= 0.5) {
            return (1 / 3.0) * (4 * stn * stn - 1);
        } else {
            return (1 / 3.0) * (1 - 4 * (1 - stn) * (1 - stn));
        }
    }

    return [quadSTtoUV(st[0]), quadSTtoUV(st[1])];
}


export const UVToST = (uv: UV): ST => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const quadUVtoST = (uvn: number): number => {
        if (uvn >= 0) {
            return 0.5 * Math.sqrt(1 + 3 * uvn);
        } else {
            return 1 - 0.5 * Math.sqrt(1 - 3 * uvn);
        }
    }

    return [quadUVtoST(uv[0]), quadUVtoST(uv[1])];
}

export const STToIJ = (st: ST, order: Level): IJ => {
    const maxSize = 1 << order;

    const singleSTtoIJ = (stn: number): number => {
        const ij = Math.floor(stn * maxSize);
        return Math.max(0, Math.min(maxSize - 1, ij));
    }

    return [singleSTtoIJ(st[0]), singleSTtoIJ(st[1])];
}

export const IJToST = (ij: IJ, order: Level, offsets: IJ): ST => {
    const maxSize = 1 << order;

    return [(ij[0] + offsets[0]) / maxSize, (ij[1] + offsets[1]) / maxSize];
}

// hilbert space-filling curve
// based on http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves
// note: rather then calculating the final integer hilbert position, we just return the list of quads
// this ensures no precision issues whth large orders (S3 cell IDs use up to 30), and is more
// convenient for pulling out the individual bits as needed later
export const pointToHilbertQuadList = (face: Face, x: number, y: number, order: Level): number[] => {
    const hilbertMap: Record<string, [number, string][]> = {
        a: [
            [0, "d"],
            [1, "a"],
            [3, "b"],
            [2, "a"]
        ],
        b: [
            [2, "b"],
            [1, "b"],
            [3, "a"],
            [0, "c"]
        ],
        c: [
            [2, "c"],
            [3, "d"],
            [1, "c"],
            [0, "b"]
        ],
        d: [
            [0, "a"],
            [3, "c"],
            [1, "d"],
            [2, "d"]
        ]
    };

    let currentSquare = face & 1 ? 'd' : 'a';
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

/**
   * reverse of @see pointToHilbertQuadList
   */
export const hilbertQuadListToPoint = (face: Face, positions: number[]): IJ => {
    const hilbertMapReverse: Record<string, [number, string][]> = {
        'a': [[0, 'd'], [1, 'a'], [3, 'a'], [2, 'b']],
        'b': [[3, 'c'], [1, 'b'], [0, 'b'], [2, 'a']],
        'c': [[3, 'b'], [2, 'c'], [0, 'c'], [1, 'd']],
        'd': [[0, 'a'], [2, 'd'], [3, 'd'], [1, 'c']]
    };

    let currentSquare = face & 1 ? 'd' : 'a';
    let i = 0;
    let j = 0;

    positions.forEach(v => {
        const t = hilbertMapReverse[currentSquare][v];
        i <<= 1;
        j <<= 1;
        if (t[0] & 2) i |= 1;
        if (t[0] & 1) j |= 1;
        currentSquare = t[1];
    });

    return [i, j];
};


const cross = (a: XYZ, b: XYZ): XYZ => {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

const dot = (a: XYZ, b: XYZ): number => {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export const det = (a: XYZ, b: XYZ, c: XYZ): number => {
    return dot(cross(a, b), c);
}

export const simple_crossing = (a: XYZ, b: XYZ, c: XYZ, d: XYZ): boolean => {
    const ab = cross(a, b);
    const acb = -dot(ab, c);
    const bda = dot(ab, d);
    if (acb * bda <= 0) return false;

    const cd = cross(c, d);
    const cbd = -dot(cd, b);
    const dac = dot(cd, a);
    return acb * cbd > 0 && acb * dac > 0;
}


