global.indexedDB = require('fake-indexeddb');
var Dexie = require('dexie');

var db = new Dexie('mockDB');
var fixtures = require('./fixtures');

var Backbone = require('backbone');

var BackboneSyncDexieAdapter = require('../../../../src/lib/backbone-dexie-adapter/backbone-dexie-adapter');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var sinon = require('sinon');

var _ = require('underscore');
var Q = require('q');
var async = require('async');

require('sinon-as-promised');


describe('BackboneSyncDexieAdapter', function () {

    var exampleAttributes = {
        name: 'Milk',
        price: 100
    };

    ////////////////////  builders  ////////////////////

    var testingTable;

    var rebuildDbMocks = function (done) {

        dropDb()
            .then(initializeDbAndTable)
            .then(loadFixtures)
            .then(function () {
                done();
            })
            .catch(done);


        //////////////////////////////////////
        function dropDb() {
            return db.delete();
        }

        function initializeDbAndTable() {

            db.version(1).stores({
                products: "++id,name,price"
            });

            db.open();

            testingTable = db.products;

            return db.products;

        }

        function loadFixtures(testingTable) {
            var deferred = Q.defer();


            async.each(
                fixtures,
                function (fixture, callback) {

                    testingTable.add(fixture)
                        .then(function (result) {
                            callback();
                        })
                        .catch(function (err) {
                            callback(err);
                        });

                },
                function (err) {
                    if (err) deferred.reject(err);
                    else deferred.resolve(null);
                }
            );


            return deferred.promise;
        }

    };

    ////////////////////   generators   ////////////////////

    function generateAttributes() {
        return {
            name: 'Milk',
            price: 100
        };
    }

    function generateFakeModel(specifiedModelAttributes) {

        var _model = {
            attributes: specifiedModelAttributes || generateAttributes(),
            set: function (newAttributes) {
                _model.attributes = newAttributes;
                return _model;
            },
            get: function (attr) {
                return _model.attributes[attr];
            }
        };

        return _model;

    }

    ////////////////////////////////////////////////////////////

    beforeEach(rebuildDbMocks);

    it("check rebuilding db mocks", function (done) {

        testingTable.get(1)
            .then(function (obj) {

                expect(obj).to.eql(fixtures[0]);
                done();

            })
            .catch(done);

    });

    describe('.forModel', function () {

        var testingModel;

        // before: create example backbone(real!) model
        before(function () {

            testingModel = Backbone.Model.extend({

                defaults: {
                    name: '',
                    price: 0
                },

                sync: BackboneSyncDexieAdapter.forModel(testingTable)

            });

        });

        it("should `create` model", function (done) {

            var testObjectAttributes = generateAttributes();

            var testModelInstance = new testingModel(testObjectAttributes);

            testModelInstance.save().then(function (resp) {

                assert(resp === testModelInstance && resp instanceof Backbone.Model,
                    'Resolved object and model is not the same objects');

                var expectedNewId = _.last(fixtures).id + 1;

                expect(testModelInstance.id).to.eql(expectedNewId);
                expect(testModelInstance.get('id')).to.eql(expectedNewId);
                expect(testModelInstance.get('name')).to.eql(testObjectAttributes.name);
                expect(testModelInstance.get('price')).to.eql(testObjectAttributes.price);

                done();

            }).catch(done);

        });

        it("should `read` model", function (done) {

            var testModelInstance = new testingModel({id: 1});

            testModelInstance.fetch().then(function (resp) {

                assert(resp === testModelInstance && resp instanceof Backbone.Model,
                    'Resolved object and model is not the same objects');

                assert.equal(testModelInstance.id, 1, 'Fetched id is incorrect');
                assert.equal(testModelInstance.get('id'), 1, '.id attr is incorrect');
                assert.equal(testModelInstance.get('name'), fixtures[0].name, 'Fetched data is not correct');

                done();

            }).catch(done);

        });

        it("should reject if model doesn't exist on DB", function (done) {

            var testModelInstance = new testingModel({id: 100});

            testModelInstance.fetch()
                .then(function () {

                    done("Request wasn't rejected");

                })
                .catch(function () {

                    done();

                });

        });

        it("should `update` model", function (done) {

            var testModelInstance = new testingModel({id: 1});


            // make sure that in DB we have old name

            testingTable.get(1)
                .then(function (initialData) {
                    assert.equal(initialData.name, fixtures[0].name,
                        'Initial data in DB is incorrect');

                    return testModelInstance.fetch();
                })
                .then(function () {

                    testModelInstance.set({name: 'newName'});

                    return testModelInstance.save();

                }).then(function () {

                    testingTable.get(1).then(function (dexieResponse) {

                        assert.equal(dexieResponse.name, 'newName', "Data in DB wasn't modified");
                        done();

                    });

                }).catch(done);

        });

        it("should `delete` model", function (done) {

            var testModelInstance = new testingModel({id: 1});

            testingTable.get(1)
                .then(function (initialData) {
                    assert.equal(initialData.name, fixtures[0].name,
                        'Initial data in DB is incorrect');

                    return testModelInstance.fetch();
                })
                .then(function (fetchedModel) {

                    return fetchedModel.destroy();

                })
                .then(function (destroyingResult) {

                    testingTable.get(1).then(function (verifyDestroyingResponse) {

                        assert.isUndefined(verifyDestroyingResponse,
                            "Object wasn't deleted from DB");

                        done();

                    });

                }).catch(done);

        });

        it("should create object with specified id", function (done) {

            var attributesWithNonBusyId = _.extend(generateAttributes(), {id: 100});
            var testModelInstance = new testingModel(attributesWithNonBusyId);

            testModelInstance.save()
                .then(function () {

                    return testingTable.get(100);

                })
                .then(function (creatingResult) {

                    assert.deepEqual(creatingResult, attributesWithNonBusyId,
                        "Wrong object has created");

                    done();

                })
                .catch(done);

        });

    });

    describe('.forCollection', function () {

        var TestingCollection;

        before(function () {

            TestingCollection = Backbone.Collection.extend({

                sync: BackboneSyncDexieAdapter.forCollection(testingTable)

            });

        });

        it("should fetch all objects from table", function (done) {

            var testingCollectionInstance = new TestingCollection();

            testingCollectionInstance.fetch().then(function (fetchedCollection) {

                expect(fetchedCollection.get(1).get('id')).to.eql(1);

                expect(fetchedCollection.get(1).attributes).to.deep.eql(fixtures[0]);
                expect(fetchedCollection.get(2).attributes).to.deep.eql(fixtures[1]);
                expect(fetchedCollection.get(3).attributes).to.deep.eql(fixtures[2]);

                done();

            }).catch(done);

        });

    });

    describe('private', function () {

        var _create, _find, _findOne, _update, _delete, _notFoundWrapper;

        before(function () {

            _create = BackboneSyncDexieAdapter._create.bind(this, testingTable);
            _find = BackboneSyncDexieAdapter._find.bind(this, testingTable);
            _findOne = BackboneSyncDexieAdapter._findOne.bind(this, testingTable);
            _update = BackboneSyncDexieAdapter._update.bind(this, testingTable);
            _delete = BackboneSyncDexieAdapter._delete.bind(this, testingTable);
            _notFoundWrapper = BackboneSyncDexieAdapter._notFoundWrapper;

        });

        describe('notFoundWrapper', function () {

            it("should pass rejection", function (done) {

                var mockedPromise = sinon.stub().rejects(new Error('1234'));

                _notFoundWrapper(mockedPromise())
                    .then(function () {
                        done("Rejection hasn't passed");
                    })
                    .catch(function (err) {

                        assert.equal(err.message, '1234');

                        done();

                    });

            });

            it("should pass success resolve", function (done) {

                var mockedPromise = sinon.stub().resolves({a: 123});

                _notFoundWrapper(mockedPromise())
                    .then(function (result) {

                        assert.equal(result.a, 123, "Resolved result is incorrect");
                        done();

                    })
                    .catch(done);

            });

            it("should reject `undefined` contain resolve", function (done) {

                var mockedPromise = sinon.stub().resolves(undefined);

                var filter = {id: 100};

                _notFoundWrapper(mockedPromise(), {id: 100})
                    .then(function () {
                        done("Promise has _resolved_");
                    })
                    .catch(function (err) {

                        assert.equal(err.message,
                            "Can't found object with {\"id\":100} filter",
                            "Passed rejection is not correct");

                        done();

                    })
                    .catch(done);

            });

        });

        describe('create', function () {

            it('should create and resolve created obj', function (done) {

                _create(generateAttributes()).then(function (result) {

                    var futureNewId = _.last(fixtures).id + 1;

                    expect(result.id).to.eql(futureNewId);

                    done();

                }).catch(done);

            });

            it("should not apply obj with existing id property", function (done) {

                var attributesWithId = _.extend(generateAttributes(), {id: 1});

                _create(attributesWithId).then(function () {

                    done("Table has applied an existing id!")

                }).catch(function (err) {

                    done();

                });

            });

            it("should add .id prop to model attributes object", function (done) {

                var generatedAttributes = generateAttributes();

                assert.isUndefined(generateAttributes.id,
                    'Generated attributes have .id before _create call');

                _create(generatedAttributes).then(function () {

                    var futureNewId = _.last(fixtures).id + 1;

                    assert.equal(generatedAttributes.id, futureNewId,
                        '.id is incorrect');

                    done();

                }).catch(done);

            });

        });

        describe('find', function () {

            it('should fetch all objects from table', function (done) {

                _find().then(function (results) {

                    expect(results).to.be.an('array');
                    expect(results).to.have.length(3);
                    expect(results).to.eql(fixtures);

                    done();

                }).catch(done);

            });

            it("should resolve empty array if table is empty", function (done) {

                testingTable.clear();

                _find().then(function (results) {

                    expect(results).to.eql([]);

                    done();

                }).catch(done);

            });

        });

        describe('findOne', function () {

            it('should find and resolve one object', function (done) {

                _findOne({id: 1}).then(function (result) {

                    expect(result).to.eql(fixtures[0]);
                    done();

                }).catch(done);

            });

            it("should reject if object doesn't exist", function (done) {

                _findOne({id: 123})
                    .then(function () {
                        done("Request has resolved!")
                    })
                    .catch(function (err) {

                        assert.match(err.message, /can't found object/i,
                            "Error message is incorrect");

                        done();
                    })
                    .catch(done);

            });

        });

        describe('update', function () {

            var updateMock = _.clone(fixtures[0]);

            it('should update object and resolve modified object with id', function (done) {

                updateMock.name = 'Snake';

                _update(updateMock).then(function (result) {

                    expect(result).to.not.eql(fixtures[0]);
                    expect(result).to.eql(updateMock);
                    done();

                }).catch(done);

            });

        });

        describe('delete', function () {

            it("should delete object and doesn't find it", function (done) {

                _delete({id: 1})
                    .then(function () {
                        done();
                    }).catch(function () {

                        _findOne({id: 1})
                            .then(function () {
                                done("Object wasn't delete! I've found it!");
                            })
                            .catch(function () {
                                done();
                            });

                    }).catch(done);

            });

            it("should resolve undefined if object doesn't exist", function (done) {

                _delete({id: 1})
                    .then(function () {
                        return _delete({id: 1});
                    })
                    .then(function (res) {
                        if (res !== undefined)
                            done('Function resolved with ' + typeof res);
                        else
                            done(); // res === undefined
                    })
                    .catch(function (err) {
                        done("Function has rejected");
                    })
                    .catch(done);

            });

        });

    });

});