import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Card from './Lists/OrderCard'
import Table from './Lists/OrderTable'

export class Orders extends React.Component<any, any> {
    constructor() {
        super();
    }

    public render() {
        const {
            orders,
            viewFormat,
            clearFilters
        } = this.props

        return <div>
            {viewFormat == 'cards' &&
                <Card orders={orders} clearFilters={clearFilters}/>
            }
            {viewFormat == 'table' &&
                <Table orders={orders} clearFilters={clearFilters}/>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(Orders as any) as typeof Orders;