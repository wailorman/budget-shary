import React from 'react'

import './add-product-item.less'

export default class AddProductItem extends React.Component {

    render() {

        return (
            <div className="AddProductItem">
                <button>+ New product</button>
            </div>
        );
    }

}