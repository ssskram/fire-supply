import * as React from 'react';
import Table from "react-table"
import Moment from 'react-moment'

export default class FullOrder extends React.Component<any, any> {
    constructor() {
        super();
    }

    public render() {

        return <div>
        <h1>{this.props.order.house}</h1>
        </div>;
    }
}