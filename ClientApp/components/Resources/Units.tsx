import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class UnitsofIssue extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    public render() {
        return <div>
            <div className='row col-md-12'>
                <h2>Units of issue</h2>
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
)(UnitsofIssue as any) as typeof UnitsofIssue;