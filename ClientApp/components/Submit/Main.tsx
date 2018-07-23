import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Ping from '../../store/ping';
import * as ItemsStore from '../../store/items';
import ItemFilters from './Filter';

export class ItemSelection extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    public render() {
        return <div>
            <div className='row col-md-12'>
                <h2>Select an item, choose a quantity, and add it to your cart</h2>
                <hr />
            </div>
            <div className='row col-md-12'>
                <ItemFilters />
                <h1>Return all items</h1>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping,
        ...state.items
    }),
    ({
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators
    })
)(ItemSelection as any) as typeof ItemSelection;