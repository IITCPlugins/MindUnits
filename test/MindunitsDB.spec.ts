import { MindunitsDB } from '../src/MindunitsDB';
import * as L from 'leaflet';
import * as S2 from '../src/lib/S2';

import * as fieldData1 from './fixtures/fields_1.json';
import * as fieldData2 from './fixtures/fields_2.json';
type JSONData = { points: S2.LatLng[], mu: number }[];


const enum ResultType { ALL_CELLS = 0, MISSING, APPROX }
interface ErrorResult {
    result: number[];
    count: number[];
};

const calculateError = (db: MindunitsDB, fields: JSONData): ErrorResult => {

    const r: ErrorResult = {
        result: [0, 0, 0],
        count: [0, 0, 0],
    }

    fields.forEach((d, index) => {
        const result = db.calcMU(d.points.map(l => L.latLng(l)));

        const type = result.missing > 0 ? ResultType.MISSING :
            result.approx > 0 ? ResultType.APPROX :
                ResultType.ALL_CELLS

        const error = result.mindunits - d.mu;
        // const error = 1 - (result.mindunits / d.mu);
        r.count[type]++;
        r.result[type] += error * error;
    })

    for (let t = 0; t < 3; t++) {
        const count = Math.max(r.count[t], 2);
        r.result[t] = Math.sqrt(r.result[t] / (count * (count - 1)));
    }

    return r;
}


describe("MindunitsDB", () => {

    it("should init", () => {
        const db = new MindunitsDB()
        expect(db.getNumberOfCells()).toBe(0);
    })


    it("should train", () => {
        const db = new MindunitsDB()

        for (let i = 0; i < 1; i++) {
            fieldData1.forEach(d => {
                db.trainField(d.points.map(l => L.latLng(l)), d.mu);
            })
            // const error = calculateError(db, fieldData2);
            //console.log(`a${i + 1}. Error_All:    ${error.result[ResultType.ALL_CELLS]}  (n=${error.count[ResultType.ALL_CELLS]})`);
        }
        // db.calculateTopFields();

        expect(db.getNumberOfCells()).toBeGreaterThan(0);

        const error = calculateError(db, fieldData2);
        console.log(`Train1 Error_All:    ${error.result[ResultType.ALL_CELLS]}  (n=${error.count[ResultType.ALL_CELLS]})`);
        expect(error.result[ResultType.ALL_CELLS]).toBeGreaterThan(0);
    })


    it("should train2", () => {
        const db = new MindunitsDB()

        for (let i = 0; i < 1; i++) {
            fieldData1.forEach(d => {
                db.trainField2(d.points.map(l => L.latLng(l)), d.mu);
            })
            // const error = calculateError(db, fieldData2);
            // console.log(`b${i + 1}. Error_All:    ${error.result[ResultType.ALL_CELLS]}  (n=${error.count[ResultType.ALL_CELLS]})`);
        }
        // db.calculateTopFields();

        expect(db.getNumberOfCells()).toBeGreaterThan(0);

        const error = calculateError(db, fieldData2);
        console.log(`Train2 Error_All:    ${error.result[ResultType.ALL_CELLS]}  (n=${error.count[ResultType.ALL_CELLS]})`);
        expect(error.result[ResultType.ALL_CELLS]).toBeGreaterThan(0);
    })

    it("should learn a field with train2", () => {
        const db = new MindunitsDB()
        db.trainField2(fieldData1[0].points.map(l => L.latLng(l)), fieldData1[0].mu);
        expect(db.getNumberOfCells()).toBeGreaterThan(0);
    })

    it.skip("should train highlevel", () => {
        const db = new MindunitsDB(14, 17);


        for (let i = 0; i < 10; i++) {

            fieldData1.forEach(d => {
                db.trainField(d.points.map(l => L.latLng(l)), d.mu);
            })
            db.calculateTopFields();


            expect(db.getNumberOfCells()).toBeGreaterThan(0);

            const error = calculateError(db, fieldData2);
            if (i == 9)
                console.log(`${i + 1}. Error_All:    ${error.result[ResultType.ALL_CELLS]}  (n=${error.count[ResultType.ALL_CELLS]})`);
            // console.error(`Error_Approx: ${error.result[ResultType.APPROX]}  (n=${error.count[ResultType.APPROX]})`);
            // console.error(`Error_Miss:   ${error.result[ResultType.MISSING]}  (n=${error.count[ResultType.MISSING]})`);
        }
    })
});