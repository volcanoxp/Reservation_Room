const app = require('../../src/app');
const request = require('supertest');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Room routes', () => {
    describe('POST /room', () => {
       
        test('should return 201 and succesfully create new rooms if data is ok', async () => { 
            const data = {
                floor: 1,
                quantity: 5
            }
            const res = await request(app)
                .post('/room')
                .send(data)
                .expect(httpStatus.CREATED);

            expect(res.body.length).toEqual(data.quantity);
        });

        test('should return 400 if send negative and 0 values', async () => {
            const fields = [
                {floor: 0, quantity: 5},
                {floor: 1, quantity: -5},
                {floor: -11, quantity: -5},
                {floor: 0, quantity: 0},
            ]

            for (const data of fields) {
                await request(app)
                    .post('/room')
                    .send(data)
                    .expect(httpStatus.BAD_REQUEST);
            }
        })

        test('should return 400 if send invalid parameters', async () => {
            const fields = [
                {floor: 1},
                {quantity: 5},
                {floor: "1", quantity: 5},
                {floor: 1, quantity: "abc"}
            ]

            for (const data of fields) {
                await request(app)
                    .post('/room')
                    .send(data)
                    .expect(httpStatus.BAD_REQUEST);
            }
        })
    });
});
