global.indexedDB = require('fake-indexeddb');

var Person = require('../../../../src/core/models/person');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');
var fixtures = require('../fixtures/persons');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var _ = require('underscore');

describe('Person model unit', function () {

    var examplePerson = {name: 'Thomas', share: 0.5};
    var sandboxTable = DB.persons;

    //////////////////////////////////////////////

    beforeEach(function () {
        return fixturesLoader(sandboxTable, fixtures);
    });

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

        it('should upload new model to DB and update model', function () {

            var newPerson = new Person(examplePerson);

            expect(newPerson.get('id')).to.not.exist;
            expect(newPerson.id).to.not.exist;

            return newPerson.save()
                .then(function (resp) {

                    var expectedNewId = _.last(fixtures).id + 1;

                    expect(resp.get('id')).to.eql(expectedNewId);

                    expect(newPerson.get('id')).to.exist;
                    expect(newPerson.get('name')).to.eql(examplePerson.name);
                    expect(newPerson.get('share')).to.eql(examplePerson.share);

                });

        });

    });

    describe('.fetch()', function () {

        var personsTable = DB.persons;
        var examplePersonId = 1;

        it('should fetch model and update model', function () {

            var newPerson = new Person({id: examplePersonId});

            return newPerson.fetch()
                .then(function (resp) {

                    expect(newPerson.get('id')).to.eql(examplePersonId);
                    expect(newPerson.get('name')).to.eql(fixtures[0].name);
                    expect(newPerson.get('share')).to.eql(fixtures[0].share);

                });

        });

    });

    describe('.destroy()', function () {

        var personsTable = DB.persons;
        var examplePersonId = 1;

        it('should remove object from db', function () {

            var newPerson = new Person({id: examplePersonId});

            return newPerson.fetch().then(function (person) {
                return person.destroy();
            }).then(function () {
                personsTable.get(examplePersonId)
            }).then(function (destroyedObjectResponse) {
                expect(destroyedObjectResponse).to.eql(undefined);
            });

        });

    });

});