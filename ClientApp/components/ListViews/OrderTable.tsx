import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class OrderTable extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        return <div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(OrderTable as any) as typeof OrderTable;