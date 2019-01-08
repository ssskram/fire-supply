import * as React from 'react'
import { Link } from 'react-router-dom'
import * as Style from './style'
const fullCart = require('../../images/fullCart.png')

export default class CartButton extends React.Component<any, any> {

    render() {
        return (
            <div>
                <Link to={'/Cart'}>
                    <button className='btn btn-success nav-button'>
                        <div style={Style.orderFont}>
                            <img src={fullCart as string} className='img-responsive center-block' />
                            <div>Shopping cart</div>
                        </div>
                    </button>
                </Link>
            </div>
        )
    }
}