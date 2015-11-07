import React from 'react'

export default class ProductItem extends React.Component {

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

}