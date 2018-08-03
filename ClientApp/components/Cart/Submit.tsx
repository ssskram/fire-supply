import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as MessagesStore from '../../store/messages'
import TextArea from '../FormElements/textarea'
import Select from '../FormElements/select'
import * as Cart from '../../store/cart'
import * as Houses from '../../store/houses'


const emergencies = [
    { value: 'Yes', label: 'Yes', name: 'emergency' },
    { value: 'No', label: 'No', name: 'emergency' },
]

const narcans = [
    { value: 'Yes', label: 'Yes', name: 'narcanCases' },
    { value: 'No', label: 'No', name: 'narcanCases' },
]

const btnStyle = {
    width: '250px'
}

const greenFont = {
    color: '#5cb85c'
}

const red = {
    color: '#BF1E2E',
    paddingLeft: '15px',
    marginBottom: '-15px',
    marginTop: '15px'
}

export class Submit extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            houseOptions: [{ "value": '...loading...', "label": '...loading...' }],
            id: this.props.cartID,
            house: '',
            comments: '',
            emergency: '',
            emergencyJusticiation: '',
            narcanCases: '',
            narcanExplanation: '',
        }
    }

    componentDidMount() {
        // load engine houses
        this.props.loadHouses()
    }

    componentWillReceiveProps(nextProps) {
        let self = this
        // add options to select
        var futureOptions: any[] = [];
        nextProps.houses.forEach(function (element) {
            var json = { "value": element.name, "label": element.name, "name": 'house' };
            futureOptions.push(json)
        })
        self.setState({
            houseOptions: futureOptions
        })
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
        this.props.GoHome()
        this.props.submitCart(this.state)
    }

    public render() {
        const {
            houseOptions,
            house,
            comments,
            emergency,
            emergencyJusticiation,
            narcanCases,
            narcanExplanation
        } = this.state

        const isEnabled =
            house != ''

        const narcan = this.props.cart.filter(item => item.obj == 'Narcan')

        return <div>
            <div className='text-center' >
                <h2 style={greenFont}>Submit your order</h2>
            </div>
            <div className="form-group">
                <Select
                    value={house}
                    name="house"
                    header='Select your house'
                    placeholder='Select...'
                    onChange={this.handleChildSelect.bind(this)}
                    multi={false}
                    options={houseOptions}
                />

                <TextArea
                    value={comments}
                    name="comments"
                    header="Comments"
                    placeholder="Additional comments"
                    callback={this.handleChildChange.bind(this)}
                />

                <div>
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
                            placeholder="Explain the emergency"
                            callback={this.handleChildChange.bind(this)}
                        />
                    }
                </div>

                {narcan.length > 0 &&
                    <div>
                        <h3 style={red}>Narcan</h3>
                        <hr/>
                        <Select
                            value={narcanCases}
                            name="narcanCases"
                            header='Do you have the cases?'
                            placeholder='Select...'
                            onChange={this.handleChildSelect.bind(this)}
                            multi={false}
                            options={narcans}
                        />
                        <TextArea
                            value={narcanExplanation}
                            name="narcanExplanation"
                            header="If amount administered is unknown, please explain why"
                            placeholder="Explanation..."
                            callback={this.handleChildChange.bind(this)}
                        />
                    </div>
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
        ...state.cart,
        ...state.houses
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Cart.actionCreators,
        ...Houses.actionCreators
    })
)(Submit as any) as typeof Submit;