import React from 'react'

import './AddProductItem.less'

export default class AddProductItem extends React.Component {

    render() {

        return (
            <div className="AddProductItem">
                <button>+ New product</button>
            </div>
        );
    }

}