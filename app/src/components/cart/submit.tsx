import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as messages from '../../store/messages'

export class Submit extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    async submitIt() {
        const success = await this.props.submitIt()
        if (success == true) {
            this.props.successMessage()
            this.setState({ redirect: true })
        } else {
            this.props.errorMessage()
            this.props.closeForm()
        }

    }

    render() {
        return (
            <div className='text-center'>
                <button onClick={this.submitIt.bind(this)} className='btn btn-success'>Submit</button>
                {this.state.redirect && 
                    <Redirect push to={'MyOrders'} />
                }
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
)(Submit)