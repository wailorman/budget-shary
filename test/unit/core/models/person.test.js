global.indexedDB = require('fake-indexeddb');

var Person = require('../../../../src/core/models/person');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');

describe('Person model unit', function () {

    var examplePerson = {name: 'Thomas', share: 0.5};

    it('should construct object with specified values', function () {

        var newPerson = new Person({name: 'Thomas', share: 0.5});

        expect(newPerson.get('name')).to.equal('Thomas');
        expect(newPerson.get('share')).to.equal(0.5);

    });

    it('should use default values name:"" & share:0', function () {

        var newPerson = new Person();

        expect(newPerson.get('name')).to.equal('');
        expect(newPerson.get('share')).to.equal(0);

    });

    describe('.save()', function () {

        it('should upload new model to DB and update model', function (done) {

            var newPerson = new Person(examplePerson);

            expect(newPerson.get('id')).to.not.exist;

            newPerson.save()
                .then(function () {

                    expect(newPerson.get('id')).to.exist;
                    expect(newPerson.get('name')).to.eql(examplePerson.name);
                    expect(newPerson.get('share')).to.eql(examplePerson.share);

                    done();

                }).catch(done);

        });

    });

    describe('.fetch()', function () {

        var personsTable = DB.persons;
        var examplePersonId;

        // create person for testing
        before(function (done) {

            personsTable.clear().then(function () {
                personsTable.add(examplePerson)
                    .then(function (id) {
                        examplePersonId = id;

                        done();

                    }).catch(done);
            });

        });

        it('should fetch model and update model', function (done) {

            var newPerson = new Person({id: examplePersonId});

            newPerson.fetch()
                .then(function () {

                    expect(newPerson.get('id')).to.eql(examplePersonId);
                    expect(newPerson.get('name')).to.eql(examplePerson.name);
                    expect(newPerson.get('share')).to.eql(examplePerson.share);

                    done();

                }).catch(done);

        });

    });

    describe('.destroy()', function () {

        var personsTable = DB.persons;
        var examplePersonId;

        // create person for testing
        before(function (done) {

            personsTable.clear().then(function () {
                personsTable.add(examplePerson)
                    .then(function (id) {
                        examplePersonId = id;
                        done();
                    }).catch(done);
            });

        });

        it('should remove object from db', function (done) {

            var newPerson = new Person({id: examplePersonId});

            newPerson.fetch().then(function (person) {
                return person.destroy();
            }).then(function () {
                done();
            }).catch(done);

        });

    });

});