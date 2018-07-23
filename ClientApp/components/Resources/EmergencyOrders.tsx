import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class WhatsanEmergency extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        return <div>
            <div className='row col-md-12'>
                <h2>What's an emergency order?</h2>
                <hr />
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(WhatsanEmergency as any) as typeof WhatsanEmergency;