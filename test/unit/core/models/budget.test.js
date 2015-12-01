global.indexedDB = require('fake-indexeddb');

var Budget = require('../../../../src/core/models/budget');
var expect = require('chai').expect;
var DB = require('../../../../src/core/local-db');
var fixtures = require('../fixtures/budgets');
var fixturesLoader = require('../../../helpers/fixtures-loader');
var _ = require('underscore');

describe('Budget model unit', function () {

    var exampleBudget = {name: 'Christmas'};
    var sandboxTable = DB.budgets;

    ///////////// generators ///////////////

    beforeEach(function () {
        return fixturesLoader(sandboxTable, fixtures);
    });

    it("should successfully load fixtures", function () {

        return DB.budgets.toArray()
            .then(function (budgetsArray) {

                expect(budgetsArray.length).to.eql(3);

            });

    });

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

        it('should upload new model to DB and update model', function () {

            var newBudget = new Budget(exampleBudget);

            expect(newBudget.get('id')).to.not.exist;
            expect(newBudget.id).to.not.exist;

            return newBudget.save()
                .then(function (resp) {

                    var expectedNewId = _.last(fixtures).id + 1;

                    expect(resp.get('id')).to.eql(expectedNewId);

                    expect(newBudget.get('id')).to.eql(expectedNewId);
                    expect(newBudget.get('name')).to.eql(exampleBudget.name);

                });

        });

    });

    describe('.fetch()', function () {

        var exampleBudgetId = 1;

        it('should fetch object', function () {

            var newBudget = new Budget({id: exampleBudgetId});

            return newBudget.fetch()
                .then(function (resp) {

                    expect(newBudget.get('id')).to.eql(exampleBudgetId);

                    expect(newBudget.get('name')).to.eql(fixtures[0].name);

                });

        });

    });

    describe('.destroy()', function () {

        var budgetsTable = DB.budgets;
        var exampleBudgetId = 1;

        it('should remove object from db', function () {

            var newBudget = new Budget({id: exampleBudgetId});

            return newBudget.fetch().then(function (budget) {
                return budget.destroy();
            }).then(function () {
                budgetsTable.get(exampleBudgetId)
            }).then(function (destroyedObjectResponse) {
                expect(destroyedObjectResponse).to.eql(undefined);
            });

        });

    });

});