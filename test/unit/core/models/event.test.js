global.indexedDB = require('fake-indexeddb');

var Event = require('../../../../src/core/models/event');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');

describe('Event model unit', function () {

    var exampleEvent = {name: 'Christmas'};
    
    it('should construct object with specified values', function () {

        //noinspection JSClosureCompilerSyntax
        var newEvent = new Event({name: 'Party'});

        expect(newEvent.get('name')).to.eql('Party');

    });

    it('should construct with default values', function () {

        //noinspection JSClosureCompilerSyntax
        var newEvent = new Event();

        expect(newEvent.get('name')).to.eql('');

    });

    describe('.save()', function () {

        it('should upload new model to DB and update model', function (done) {

            var newEvent = new Event(exampleEvent);

            expect(newEvent.get('id')).to.not.exist;

            newEvent.save()
                .then(function () {

                    expect(newEvent.get('id')).to.exist;
                    expect(newEvent.get('name')).to.eql(exampleEvent.name);

                    done();

                }).catch(done);

        });

    });

    describe('.fetch()', function () {

        var eventsTable = DB.events;
        var exampleEventId;

        // create event for testing
        before(function (done) {

            eventsTable.clear().then(function () {
                eventsTable.add(exampleEvent)
                    .then(function (id) {
                        exampleEventId = id;

                        done();

                    }).catch(done);
            });

        });

        it('should fetch model and update model', function (done) {

            var newEvent = new Event({id: exampleEventId});

            newEvent.fetch()
                .then(function () {

                    expect(newEvent.get('id')).to.eql(exampleEventId);
                    expect(newEvent.get('name')).to.eql(exampleEvent.name);

                    done();

                }).catch(done);

        });

    });

    describe('.destroy()', function () {

        var eventsTable = DB.events;
        var exampleEventId;

        // create event for testing
        before(function (done) {

            eventsTable.clear().then(function () {
                eventsTable.add(exampleEvent)
                    .then(function (id) {
                        exampleEventId = id;
                        done();
                    }).catch(done);
            });

        });

        it('should remove object from db', function (done) {

            var newEvent = new Event({id: exampleEventId});

            newEvent.fetch().then(function (event) {
                return event.destroy();
            }).then(function () {
                done();
            }).catch(done);

        });

    });

});