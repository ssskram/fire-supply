import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Card from './Lists/ItemCard'
import Table from './Lists/ItemTable'

export class Item extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        const {
            items,
            viewFormat
        } = this.props

        return <div>
            {viewFormat == 'cards' &&
                <Card items={items}/>
            }
            {viewFormat == 'table' &&
                <Table items={items}/>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(Item as any) as typeof Item;