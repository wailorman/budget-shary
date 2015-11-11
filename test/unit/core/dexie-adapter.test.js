var BackboneSyncDexieAdapter = require('../../../src/core/dexie-adapter');
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require('underscore');
require('sinon-as-promised');

describe('BackboneSyncDexieAdapter', function () {

    ///// mocks for table stubs /////

    var exampleModel = {
        name: 'Milk',
        price: 100
    };

    var exampleModelWithId = {
        id: 1,
        name: 'Milk',
        price: 100
    };

    var updatedExample = _.clone(exampleModelWithId);
    updatedExample.id = 2;
    updatedExample.name = "Juice";


    ////// stubs //////

    var tableStub = {};

    tableStub.add = sinon.stub();
    tableStub.add.withArgs(exampleModel).resolves(1);
    tableStub.add.withArgs().rejects(new Error('Missing args!'));

    tableStub.get = sinon.stub();
    tableStub.get.withArgs(1).resolves(exampleModelWithId);
    tableStub.get.withArgs(2).resolves(updatedExample);
    tableStub.get.withArgs(123).rejects(new Error('404!'));
    tableStub.get.withArgs().rejects(new Error('Missing args!'));

    tableStub.put = sinon.stub();
    tableStub.put.withArgs(exampleModelWithId, 1).resolves(1);
    tableStub.put.withArgs(exampleModel, 1).resolves(1);
    tableStub.put.withArgs(updatedExample, 2).resolves(2);
    tableStub.put.withArgs().rejects(new Error('Missing args!'));

    tableStub.delete = sinon.stub();
    tableStub.delete.withArgs(1).resolves(undefined);
    tableStub.delete.withArgs(123).rejects(new Error('404!'));
    tableStub.delete.withArgs().rejects(new Error('Missing args!'));

    describe('prototype public methods', function () {

        it('should create instance of model', function (done) {

            BackboneSyncDexieAdapter(tableStub).create(exampleModel)
                .then(function (result) {

                    expect(result).to.eql(exampleModelWithId);
                    done();

                }).catch(done);

        });

        it('should read', function (done) {

            BackboneSyncDexieAdapter(tableStub).read({id: exampleModelWithId.id})
                .then(function (result) {

                    expect(result).to.eql(exampleModelWithId);
                    done();

                }).catch(done);

        });

        it('should update', function (done) {

            BackboneSyncDexieAdapter(tableStub).update(updatedExample)
                .then(function (result) {

                    expect(result).to.eql(updatedExample);
                    done();

                }).catch(done);

        });

        it('should delete', function (done) {

            BackboneSyncDexieAdapter(tableStub).delete(exampleModelWithId)
                .then(function (result) {

                    expect(result).to.be.undefined;
                    done();

                }).catch(done);

        });

        it('should throw error if method is invalid', function () {

            expect(function () {
                BackboneSyncDexieAdapter(tableStub).test(exampleModelWithId);
            }).to.throw();

            expect(function () {
                BackboneSyncDexieAdapter(tableStub).hey(exampleModelWithId);
            }).to.throw();


        });

    });

    describe('static private methods', function () {

        var _create = BackboneSyncDexieAdapter._create;
        var _read = BackboneSyncDexieAdapter._read;
        var _update = BackboneSyncDexieAdapter._update;
        var _delete = BackboneSyncDexieAdapter._delete;

        describe('create', function () {

            it('should create object and resolve created object with id', function (done) {

                _create(tableStub, exampleModel).then(function (result) {

                    expect(result).to.eql(exampleModelWithId);
                    done();

                }).catch(done);

            });

        });

        describe('read', function () {

            it('should read object and resolve object with id', function (done) {

                _read(tableStub, {id: 1}).then(function (result) {

                    expect(result).to.eql(exampleModelWithId);
                    done();

                }).catch(done);

            });

            it('should reject error if object does not exists', function (done) {

                _read(tableStub, {id: 123})
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

                    expect(result).to.not.eql(exampleModelWithId);
                    expect(result).to.eql(updatedExample);
                    done();

                }).catch(done);

            });

        });

        describe('delete', function () {

            it('should delete object', function (done) {

                _delete(tableStub, exampleModelWithId)
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

    });

});