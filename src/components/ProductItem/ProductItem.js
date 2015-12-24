"use strict";

const React = require('react');

require('./ProductItem.less');

let ProductItem = module.exports = React.createClass({

    render() {

        return (
            <div className="ProductItem">
                <div className="ProductItem__name">
                    <input type="text"
                           placeholder="Product name"/>
                </div>

                <div className="ProductItem__price">
                    <input type="text"
                           placeholder="Price"/>
                </div>

                <div className="ProductItem__remove-product">
                    <button></button>
                </div>
            </div>
        );

    }

});