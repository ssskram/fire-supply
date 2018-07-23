import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class MiniCart extends React.Component<any, any> {
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
)(MiniCart as any) as typeof MiniCart;