import * as React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as MessagesStore from '../../store/messages'
import TextArea from './../FormElements/textarea'
import Select from './../FormElements/select'

const houses = [
    { value: '', label: 'All', name: 'house' },
    { value: '1', label: '1', name: 'house' },
    { value: '2', label: '2', name: 'house' }
]

const emergencies = [
    { value: 'Yes', label: 'Yes', name: 'emergency' },
    { value: 'No', label: 'No', name: 'emergency' },
]

const btnStyle = {
    width: '250px'
}

const greenFont = {
    color: '#5cb85c'
}


export class Submit extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            house: '',
            comments: '',
            emergency: '',
            emergencyJusticiation: '',
            redirect: false

        }
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    post(event) {
        event.preventDefault()
        this.props.success()
        this.setState({ redirect: true })
    }

    public render() {
        const {
            house,
            comments,
            emergency,
            emergencyJusticiation,
            redirect
        } = this.state

        const isEnabled =
            house != ''

        if (redirect) {
            return <Redirect to='/' />;
        }
        
        return <div>
            <div className='text-center' >
                <h2 style={greenFont}>Submit your order</h2>
            </div>
            <div className="form-group">
                <Select
                    value={house}
                    name="house"
                    header='Select your engine house'
                    placeholder='Select...'
                    onChange={this.handleChildSelect.bind(this)}
                    multi={false}
                    options={houses}
                />

                <TextArea
                    value={comments}
                    name="comments"
                    header="Comments"
                    placeholder="Additional comments"
                    callback={this.handleChildChange.bind(this)}
                />

                <Select
                    value={emergency}
                    name="emergency"
                    header='Is this an emergency?'
                    placeholder='Select...'
                    onChange={this.handleChildSelect.bind(this)}
                    multi={false}
                    options={emergencies}
                />

                {emergency == 'Yes' &&
                    <TextArea
                        value={emergencyJusticiation}
                        name="emergencyJusticiation"
                        header="Justicication"
                        placeholder="Explain the circumstances"
                        callback={this.handleChildChange.bind(this)}
                    />
                }
                <div className='text-center'>
                    <button disabled={!isEnabled} style={btnStyle} onClick={this.post.bind(this)} className='btn btn-success'>Submit</button>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
    }),
    ({
        ...MessagesStore.actionCreators,
    })
)(Submit as any) as typeof Submit;