const { assert } = require('chai');
const mongoose = require('mongoose').connection;
const request = require('./request');

describe('Ship CRUD', () => {
    let shipData = null;

    beforeEach(() => {
        mongoose.dropDatabase();

        shipData = [
            {
                name: 'Moya',
                hp: 1500,
                dmg: 50,
                description: 'A living sentient bio-mechanical space ship.',
                class: 'Leviathan'
            },
            {
                name: 'Raza',
                hp: 900,
                dmg: 200,
                description: 'The Raza is a faster-than-light armed space transport equipped with various countermeasures such as vector thrust capable nacelles. The interiors feature a spacious bridge, a small mess hall, and private crew quarters for at least six crew members. Gravity aboard the Raza is artificially generated.',
                class: 'StarShip'
            }
        ];
    });

    describe('POST ship', () => {
        it('returns a ship with a new id', () => {
            return request.post('/api/ships')
                .send(shipData[0])
                .then(res => assert.ok(res.body._id));
        });
    });

    describe('GET Ship', () => {
        it('returns all when no id given', () => {
            const savedShips = [
                request.post('/api/ships')
                    .send(shipData[0]),
                request.post('/api/ships')
                    .send(shipData[1])
            ];

            return Promise.all(savedShips)
                .then(resArray => {
                    resArray = resArray.map(res => {
                        return {
                            name: res.body.name,
                            _id: res.body._id
                        };
                    });
                    return request.get('/api/ships')
                        .then(received => {
                            assert.deepInclude(received.body, resArray[0]);
                            assert.deepInclude(received.body, resArray[1]);
                        });
                });
        });

        it('get a ship by id', () => {
            let razaShip = null;
            return request.post('/api/ships')
                .send(shipData[1])
                .then(res => {
                    razaShip = res.body;
                    return request.get(`/api/ships/${razaShip._id}`);
                })
                .then(res => assert.deepEqual(res.body, razaShip));
        });
    });
});

