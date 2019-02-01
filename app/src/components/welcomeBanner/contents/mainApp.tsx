import * as React from 'react'

const order = require('../../../images/order.png')
const track = require('../../../images/track.png')
const compare = require('../../../images/compare.png')
const unpack = require('../../../images/unpack.png')

const imgSize = {
    height: '50px',
    margin: '10px 150px 10px 25px !important'
}

export default class MainApp extends React.Component<any, any> {

    public render() {
        return <div>
            <h3>Welcome to PGH Supply</h3>
            <br />
            <div style={{ textAlign: 'left' }}>
                <div style={{ padding: '10px' }} className='row text-center'>
                    <div className='col-md-12'>
                        <img style={imgSize} src={order as string} />
                    </div>
                    <div className='col-md-12'>
                        <h4><b>Place your orders</b></h4>
                        <h5>What do you need?  Just add it to your cart and click submit.</h5>
                    </div>
                </div>
                <div style={{ padding: '10px' }} className='row text-center'>
                    <div className='col-md-12'>
                        <img style={imgSize} src={track as string} />
                    </div>
                    <div className='col-md-12'>
                        <h4><b>Track your orders</b></h4>
                        <h5>Real time updates on the status of your order.</h5>
                    </div>
                </div>
                <div style={{ padding: '10px' }} className='row text-center'>
                    <div className='col-md-12'>
                        <img style={imgSize} src={unpack as string} />
                    </div>
                    <div className='col-md-12'>
                        <h4><b>Unpack your things</b></h4>
                        <h5>Enjoy all your sweet new stuff.</h5>
                    </div>
                </div>
                <div style={{ padding: '10px' }} className='row text-center'>
                    <div className='col-md-12'>
                        <img style={imgSize} src={compare as string} />
                    </div>
                    <div className='col-md-12'>
                        <h4><b>Compare orders</b></h4>
                        <h5>Analyze inventory consumption accross time.</h5>
                    </div>
                </div>
            </div>
        </div>
    }
}