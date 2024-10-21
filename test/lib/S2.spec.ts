import * as S2 from "../../src/lib/S2";


describe("S2", () => {

    const fields: S2.LatLng[][] = [
        [{ lat: 51.110770, lng: 7.204330 }, { lat: 50.945868, lng: 7.090983 }, { lat: 50.745500, lng: 7.501098 }], // 86732 Mus
        [{ lat: 51.208804, lng: 7.194191 }, { lat: 51.204192, lng: 7.110999 }, { lat: 51.202797, lng: 7.166289 }],//  1642 mus
        [{ lat: 59.537733, lng: -1.603716 }, { lat: 52.436023, lng: 7.069284 }, { lat: 52.408397, lng: 5.731935 }], // bug
    ];

    it("should find covering cell", () => {

        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(
            S2.LatLngToXYZ(fields[1][0]),
            S2.LatLngToXYZ(fields[1][1]),
            S2.LatLngToXYZ(fields[1][2]));


        const cells = cover.getCovering(region, 11, 11);

        const ids = cells.map(c => c.toString()).join(";");
        expect(ids).toBe('2[161,879]11;2[161,880]11;2[161,881]11');
    });


    it("should find covering cell starting higher", () => {
        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(
            S2.LatLngToXYZ(fields[1][0]),
            S2.LatLngToXYZ(fields[1][1]),
            S2.LatLngToXYZ(fields[1][2]));


        const cells = cover.getCovering(region, 10, 11);

        const ids = cells.map(c => c.toString()).join(";");
        expect(ids).toBe('2[161,879]11;2[161,880]11;2[161,881]11');
    });


    it("should accept empty fields", () => {

        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(
            S2.LatLngToXYZ(fields[1][0]),
            S2.LatLngToXYZ(fields[1][0]),
            S2.LatLngToXYZ(fields[1][0]));


        const cells = cover.getCovering(region, 11, 11);
        expect(cells.length).toBe(0);
    });


    it("should not fail to find covering (multiple faces?)", () => {
        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(
            S2.LatLngToXYZ(fields[2][0]),
            S2.LatLngToXYZ(fields[2][1]),
            S2.LatLngToXYZ(fields[2][2]));
        cover.region = region;

        let cells = cover.getCoveringFromCell(cover.getCoveringPoint(S2.LatLngToXYZ(fields[2][0]), 14));

        // const ids = cells.map(c => c.toString()).join(";");
        // expect(ids).toBe('2[161,879]11;2[161,880]11;2[161,881]11');
        expect(cells.length).toBeGreaterThan(0);
    });


    it("should not fail to find covering (multiple faces?)", () => {
        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(
            S2.LatLngToXYZ(fields[2][0]),
            S2.LatLngToXYZ(fields[2][1]),
            S2.LatLngToXYZ(fields[2][2]));


        const cells = cover.getCovering(region, 14, 14);
        // const ids = cells.map(c => c.toString()).join(";");
        // expect(ids).toBe('2[161,879]11;2[161,880]11;2[161,881]11');
        expect(cells.length).toBeGreaterThan(0);
    });

})
