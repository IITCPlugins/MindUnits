import { Mindunits } from '../src/Mindunits';
import * as L from 'leaflet';


jest.mock('localforage', () => ({
    createInstance: jest.fn().mockImplementation(() => ({
        getItem: () => undefined,
        setItem: () => undefined,
    }))
}));


describe("Mindunits", () => {

    const Fields = [
        { "points": [{ "lat": 51.615024, "lng": 7.627416 }, { "lat": 51.567695, "lng": 7.521168 }, { "lat": 51.556467, "lng": 7.671699 }], "mu": 25697 }
    ];


    it("should train a field", async () => {
        const db = new Mindunits();
        const coords = Fields[0].points.map(l => L.latLng(l));
        const field_mus = Fields[0].mu;

        await db.trainField(coords, field_mus);
        expect(db.getDensityMap().getCachedCells()).toBeGreaterThan(0);
    })


    it("should return same MU for trained field", async () => {
        const coords = Fields[0].points.map(l => L.latLng(l));
        const field_mus = Fields[0].mu;

        const db = new Mindunits();
        await db.trainField(coords, field_mus);

        const result = await db.calcMU(coords);
        expect(result.mindunits).toBe(field_mus);
    })

});