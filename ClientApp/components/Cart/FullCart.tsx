import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class FullCart extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        return <div>
            carrt
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(FullCart as any) as typeof FullCart;