"use strict";

const Backbone = require('backbone');
const improvedBackboneToJSON = require('../../../src/lib/improved-backbone-to-json');
const _ = require('lodash');

describe("unit/lib/improved backbone toJSON", ()=> {

    let model;

    beforeEach(()=> {

        model = new Backbone.Model({name: 'Mike', age: 30});

    });

    it(`should clone standart toJSON() behaviour`, () => {

        let attributes = model.attributes;
        let toJsonResult = model.toJSON();

        expect(toJsonResult).to.eql(attributes);

    });

    it(`should include cid in result via options`, () => {


        let attributesWithCid = {};
        _.merge(
            attributesWithCid,
            model.attributes,
            {cid: model.cid}
        );

        let toJsonResult = model.toJSON({includeCid: true});

        expect(toJsonResult).to.eql(attributesWithCid)

    });

    it(`should throw error if model doesn't have cid`, () => {

        let attributesWithCid = {};
        _.merge(
            attributesWithCid,
            model.attributes,
            {cid: model.cid}
        );

        delete model.cid;

        expect(()=> {
            model.toJSON({includeCid: true});
        }).to.throw(/doesn't have \.cid property/);

    });

});