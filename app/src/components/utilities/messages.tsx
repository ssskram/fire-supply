import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as messages from '../../store/messages'

export class Messages extends React.Component<any, {}> {

    componentWillReceiveProps(next) {
        console.log(next)
    }

    createMarkup() {
        return { __html: this.props.message };
    }

    public render() {
        return (
            <div className='col-md-12 text-center'>
                {this.props.message ? (
                    <div role="alert" className="alert alert-success">
                        <h4 style={{ paddingTop: '15px' }} dangerouslySetInnerHTML={this.createMarkup()}></h4>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages
    }),
    ({
        ...messages.actionCreators
    })
)(Messages)