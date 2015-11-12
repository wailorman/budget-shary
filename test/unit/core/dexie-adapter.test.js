var BackboneSyncDexieAdapter = require('../../../src/core/dexie-adapter');
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('underscore');
require('sinon-as-promised');

describe('BackboneSyncDexieAdapter', function () {

    ///// mocks for table stubs /////

    var exampleModelAttributes = {
        name: 'Milk',
        price: 100
    };
    var exampleModel = {
        attributes: exampleModelAttributes,
        set: function (attrs) {
            exampleModel.attributes = attrs;
        }
    };

    var exampleModelAttributesWithId = {
        id: 1,
        name: 'Milk',
        price: 100
    };
    var exampleModelWithId = {
        attributes: exampleModelAttributesWithId,
        set: function (attrs) {
            exampleModelWithId.attributes = attrs;
            return exampleModelWithId;
        },
        get: function (prop) {
            // its temporary!
            return 1;
        }
    };

    var updatedExample = _.clone(exampleModelAttributesWithId);
    updatedExample.id = 2;
    updatedExample.name = "Juice";


    function generateExampleModel (specifiedModelAttributes) {

        var _model = {
            attributes: specifiedModelAttributes || exampleModelAttributes,
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

    ////// stubs //////

    var tableStub = {};

    tableStub.add = sinon.stub();
    tableStub.add.withArgs(exampleModelAttributes).resolves(1);
    tableStub.add.withArgs(undefined).rejects(new Error('Missing args for add!'));
    tableStub.add.withArgs({tick: 'tack'}).rejects(new Error('Toe!'));

    tableStub.toArray = sinon.stub();
    tableStub.toArray.resolves([
        exampleModelAttributesWithId,
        exampleModelAttributesWithId,
        exampleModelAttributesWithId
    ]);

    tableStub.get = sinon.stub();
    tableStub.get.withArgs(1).resolves(exampleModelAttributesWithId);
    tableStub.get.withArgs(2).resolves(updatedExample);
    tableStub.get.withArgs(123).rejects(new Error('404!'));
    tableStub.get.withArgs(undefined).rejects(new Error('Missing args for get!'));

    tableStub.put = sinon.stub();
    tableStub.put.withArgs(exampleModelAttributesWithId, 1).resolves(1);
    tableStub.put.withArgs(exampleModelAttributes, 1).resolves(1);
    tableStub.put.withArgs(updatedExample, 2).resolves(2);
    tableStub.put.withArgs(undefined).rejects(new Error('Missing args for put!'));

    tableStub.delete = sinon.stub();
    tableStub.delete.withArgs(1).resolves(undefined);
    tableStub.delete.withArgs(123).rejects(new Error('404!'));
    tableStub.delete.withArgs(undefined).rejects(new Error('Missing args for delete!'));

    describe('interface', function () {

        var fireSync = BackboneSyncDexieAdapter(tableStub);

        describe('create', function () {

            it('should create a new object and resolve fresh model', function (done) {

                fireSync("create", generateExampleModel())
                    .then(function (resultModel) {

                        expect(resultModel.get('name')).to.eql(exampleModelAttributes.name);
                        expect(resultModel.get('price')).to.eql(exampleModelAttributes.price);
                        done();

                    }).catch(done);

            });

            it('should resolve error if object creating goes wrong', function (done) {

                fireSync("create", {attributes: {tick: 'tack'}}) // this is a dirty model
                    .then(function () {
                        done("Reject wasn't called. Resolve was called instead");
                    })
                    .catch(function (err) {
                        expect(err.message).to.eql('Toe!');
                        done();
                    });

            });

        });

        describe('read', function () {

            it('should fetch object from server', function (done) {

                fireSync("read", generateExampleModel({id: 1}))
                    .then(function (result) {

                        expect(result.get('name')).to.eql('Milk');
                        done();

                    }).catch(done);

            });

        });

        describe('update', function () {

            it('should update object on the server', function (done) {

                var __model = generateExampleModel(exampleModelAttributesWithId);

                __model.attributes.name = 'Potato';

                fireSync("update", __model)
                    .then(function (result) {

                        expect(result.get('name')).to.eql('Potato');
                        done();

                    }).catch(done);

            });

        });

        describe('destroy', function () {

           it('should successfully remove object from server', function (done) {

               fireSync("read", generateExampleModel(exampleModelAttributesWithId))
                   .then(function (result) {

                       done();

                   }).catch(done);

           });

        });

    });

    describe('static private methods', function () {

        var _create = BackboneSyncDexieAdapter._create;
        var _find = BackboneSyncDexieAdapter._find;
        var _findOne = BackboneSyncDexieAdapter._findOne;
        var _update = BackboneSyncDexieAdapter._update;
        var _delete = BackboneSyncDexieAdapter._delete;
        var _tableWrapper = BackboneSyncDexieAdapter._tableWrapper;

        describe('create', function () {

            it('should create object and resolve created object with id', function (done) {

                _create(tableStub, exampleModelAttributes).then(function (result) {

                    expect(result).to.eql(exampleModelAttributesWithId);
                    done();

                }).catch(done);

            });

        });

        describe('find', function () {

            it('should get all objects from table', function(done) {

                _find(tableStub).then(function (results) {

                    expect(results).to.be.an('array');
                    expect(results).to.have.length(3);
                    expect(results[0]).to.eql(exampleModelAttributesWithId);

                    done();

                }).catch(done);

            });

        });

        describe('findOne', function () {

            it('should find one object and resolve object with id', function (done) {

                _findOne(tableStub, {id: 1}).then(function (result) {

                    expect(result).to.eql(exampleModelAttributesWithId);
                    done();

                }).catch(done);

            });

            it('should reject error if object does not exists', function (done) {

                _findOne(tableStub, {id: 123})
                    .then(function () {
                        done('Has not rejected!');
                    })
                    .catch(function (err) {
                        expect(err).to.exist;
                        done();
                    });

            });

        });

        describe('update', function () {

            it('should update object and resolve modified object with id', function (done) {

                _update(tableStub, updatedExample).then(function (result) {

                    expect(result).to.not.eql(exampleModelAttributesWithId);
                    expect(result).to.eql(updatedExample);
                    done();

                }).catch(done);

            });

        });

        describe('delete', function () {

            it('should delete object', function (done) {

                _delete(tableStub, exampleModelAttributesWithId)
                    .then(function () {

                        done();

                    }).catch(done);

            });

            it('should reject error if object to delete does not exists', function (done) {

                _delete(tableStub, {id: 123})
                    .then(function (res) {
                        done('Has not rejected!')
                    })
                    .catch(function (err) {
                        expect(err).to.exist;
                        done();
                    });

            });

        });

        describe('tableWrapper', function () {

            it('should create instance of model', function (done) {

                _tableWrapper(tableStub).create(exampleModelAttributes)
                    .then(function (result) {

                        expect(result).to.eql(exampleModelAttributesWithId);
                        done();

                    }).catch(done);

            });

            it('should find one', function (done) {

                _tableWrapper(tableStub).findOne({id: exampleModelAttributesWithId.id})
                    .then(function (result) {

                        expect(result).to.eql(exampleModelAttributesWithId);
                        done();

                    }).catch(done);

            });

            it('should find several', function (done) {

                _tableWrapper(tableStub).find()
                    .then(function (results) {

                        expect(results).to.be.an('array');
                        expect(results[0]).to.eql(exampleModelAttributesWithId);

                        done();

                    }).catch(done);

            });

            it('should update', function (done) {

                _tableWrapper(tableStub).update(updatedExample)
                    .then(function (result) {

                        expect(result).to.eql(updatedExample);
                        done();

                    }).catch(done);

            });

            it('should delete', function (done) {

                _tableWrapper(tableStub).delete(exampleModelAttributesWithId)
                    .then(function (result) {

                        expect(result).to.be.undefined;
                        done();

                    }).catch(done);

            });

            it('should throw error if method is invalid', function () {

                expect(function () {
                    _tableWrapper(tableStub).test(exampleModelAttributesWithId);
                }).to.throw();

                expect(function () {
                    _tableWrapper(tableStub).hey(exampleModelAttributesWithId);
                }).to.throw();


            });

        });

    });

});