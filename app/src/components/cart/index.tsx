import * as React from 'react'
import * as Style from './style'
const fullCart = require('../../images/fullCart.png')

export default class Cart extends React.Component<any, any> {

    render() {
        return (
            <div>
                <button className='btn btn-success nav-button'>
                    <div style={Style.orderFont}>
                        <img src={fullCart as string} className='img-responsive center-block' />
                        <div>Shopping cart</div>
                    </div>
                </button>
            </div>
        )
    }
}