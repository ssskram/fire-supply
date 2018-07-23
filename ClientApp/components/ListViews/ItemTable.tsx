import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class ItemTable extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        return <div>
            Table
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(ItemTable as any) as typeof ItemTable;