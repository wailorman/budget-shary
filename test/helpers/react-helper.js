"use strict";

//const ReactTestUtils = require('react-addons-test-utils');

module.exports = {

    render(component) {

        let renderResult = ReactTestUtils.renderIntoDocument(component);

        return {

            result: renderResult,

            findOneByTag(tagName) {

                return ReactTestUtils.findRenderedDOMComponentWithTag(renderResult, tagName);

            },

            findOneByClass(className) {

                return ReactTestUtils.findRenderedDOMComponentWithClass(renderResult, className);

            }

        };

    }

};
