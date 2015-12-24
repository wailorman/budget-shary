"use strict";

const React = require('react');

require('./AddProductItem.less');

let AddProductItem = module.exports = React.createClass({

    render() {
        return (
            <div className="AddProductItem">
                <button>+ New product</button>
            </div>
        );
    }

});