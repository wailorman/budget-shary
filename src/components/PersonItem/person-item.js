import React from 'react'
import ProductItem from '../ProductItem/product-item.js'
import AddProductItem from '../AddProductItem/add-product-item.js'

import './person-item.less'

export default class PersonItem extends React.Component {

    render() {
        return (
            <div className="PersonItem">

                <div className="PersonItem__person-props">
                    <div className="PersonItem__person-props_name">
                        <input type="text" placeholder="Person"/>
                    </div>

                    <div className="PersonItem__person-props_share">
                        <input type="text" placeholder="Share"/>
                    </div>

                    <div className="PersonItem__person-props_remove-person">
                        <button></button>
                    </div>
                </div>

                <div className="PersonItem__products">

                    Purchased products:
                    <ProductItem />
                    <AddProductItem />

                </div>

            </div>
        );
    }

}