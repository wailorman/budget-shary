global.indexedDB = require('fake-indexeddb');

var Budget = require('../../../../src/core/models/budget');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');

describe('Budget model unit', function () {

    var exampleBudget = {name: 'Christmas'};
    
    it('should construct object with specified values', function () {

        //noinspection JSClosureCompilerSyntax
        var newBudget = new Budget({name: 'Party'});

        expect(newBudget.get('name')).to.eql('Party');

    });

    it('should construct with default values', function () {

        //noinspection JSClosureCompilerSyntax
        var newBudget = new Budget();

        expect(newBudget.get('name')).to.eql('');

    });

    describe('.save()', function () {

        it('should upload new model to DB and update model', function (done) {

            var newBudget = new Budget(exampleBudget);

            expect(newBudget.get('id')).to.not.exist;

            newBudget.save()
                .then(function (resp) {

                    expect(resp.get('id')).to.exist;

                    expect(newBudget.get('id')).to.exist;
                    expect(newBudget.get('name')).to.eql(exampleBudget.name);

                    done();

                }).catch(done);

        });

    });

    describe('.fetch()', function () {

        var budgetsTable = DB.budgets;
        var exampleBudgetId;

        // create budget for testing
        before(function (done) {

            budgetsTable.clear().then(function () {
                budgetsTable.add(exampleBudget)
                    .then(function (id) {
                        exampleBudgetId = id;

                        done();

                    }).catch(done);
            });

        });

        it('should fetch model and update model', function (done) {

            var newBudget = new Budget({id: exampleBudgetId});

            newBudget.fetch()
                .then(function (resp) {

                    expect(resp.get('id')).to.exist;

                    expect(newBudget.get('id')).to.eql(exampleBudgetId);
                    expect(newBudget.get('name')).to.eql(exampleBudget.name);

                    done();

                }).catch(done);

        });

    });

    describe('.destroy()', function () {

        var budgetsTable = DB.budgets;
        var exampleBudgetId;

        // create budget for testing
        before(function (done) {

            budgetsTable.clear().then(function () {
                budgetsTable.add(exampleBudget)
                    .then(function (id) {
                        exampleBudgetId = id;
                        done();
                    }).catch(done);
            });

        });

        it('should remove object from db', function (done) {

            var newBudget = new Budget({id: exampleBudgetId});

            newBudget.fetch().then(function (budget) {
                return budget.destroy();
            }).then(function () {
                done();
            }).catch(done);

        });

    });

});