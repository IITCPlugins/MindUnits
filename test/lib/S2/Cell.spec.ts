import * as S2 from "../../../src/lib/S2";

describe("S2/Cell", () => {

    const portal: S2.LatLng[] = [
        { lat: 51.110770, lng: 7.204330 }, { lat: 50.945868, lng: 7.090983 }, { lat: 50.745500, lng: 7.501098 },
    ];


    it("should convert to string and vice-versa", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);

        const asStr = cell.toString();
        expect(asStr).toBe("202212213331323");
        expect(asStr.length).toBe(14 + 1);

        const cell2 = S2.Cell.fromString(asStr);
        expect(cell2.equal(cell)).toBeTruthy();
    });


    it("should all parents start with the same string_id", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);

        const asStr = cell.toString();

        for (let i = 13; i < 1; i--) {
            const parent = cell.getParent()!;
            expect(parent.toString()).toEqual(asStr.slice(0, i + 1));
        }
    });


    it("should all parents start with the same string_id", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);

        for (let i = 13; i < 1; i--) {
            const parent = cell.getParent();
            expect(parent!.toString()).toEqual(cell.toString(i));
        }
    });


    it("should convert to string with level", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);

        const asStr = cell.toString(10);
        const index = cell.toArrayIndex(10);
        expect(asStr).toBe("20221221333"); // "1323" => 01111011 => 123
        expect(asStr.length).toBe(10 + 1);
        expect(index).toBe(123);

        const cell2 = S2.Cell.fromString(asStr);
        cell2.addArrayIndex(index, 14);
        expect(cell2.toString()).toEqual(cell.toString());
    });


    it("should convert to string and keep lat,lng", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);
        const xyz = S2.LatLngToXYZ(portal[0]);

        expect(cell.contains(xyz)).toBeTruthy();

        const asStr = cell.toString();
        const cell2 = S2.Cell.fromString(asStr);
        expect(cell2.contains(xyz)).toBeTruthy();
    });


    it("should convert to string with level  and keep lat,lng ", () => {
        const cell = S2.Cell.FromLatLng(portal[0], 14);
        const xyz = S2.LatLngToXYZ(portal[0]);

        const asStr = cell.toString(10);
        const index = cell.toArrayIndex(10);

        const cell2 = S2.Cell.fromString(asStr);
        cell2.addArrayIndex(index, 14);
        expect(cell2.contains(xyz)).toBeTruthy();
    });

})
