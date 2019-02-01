
// provides a tour of the site

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as User from '../../store/user'
import * as userProfile from '../../store/userProfile'
import Joyride from 'react-joyride'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Textarea from '../formElements/textarea'
import MainApp from './contents/mainApp'
import AllOrders from './contents/allOrders'
import MyOrders from './contents/myOrders'
import TpDashboard from './contents/tpDashboard'
import Cart from './contents/cart'
import UserAccount from './contents/userAccount'
import PostFeedback from './postFeedback'
import SubmitFeedback from './contents/submitFeedback'

const btnStyle = {
    fontSize: '16px',
    letterSpacing: '2px'
}

const styleLarge = {
    position: 'absolute' as any,
    top: '0px',
    right: '0px',
    padding: '0px 15px 0px 45px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4)',
    width: '100%',
    textAlign: 'right' as any
}

export class SiteTour extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            buttonHover: false,
            feedback: '',
            runTour: false,
            showForm: false
        }
    }

    callback = (data) => {
        if (data.action == 'close' || data.status == 'finished') {
            this.setState({
                runTour: false,
                index: 0
            })
        } else if (data.action == 'next' && data.lifecycle == 'complete') {
            this.setState({
                index: data.index + 1
            })
        } else if (data.action == 'prev' && data.lifecycle == 'complete') {
            this.setState({
                index: data.index - 1
            })
        }
    }

    postFeedback() {
        const load = { body: this.state.feedback }
        PostFeedback(load, this.props.user)
        this.setState({
            feedback: '',
            showForm: false
        })
    }

    public render() {
        const {
            runTour,
            showForm,
            feedback,
            index
        } = this.state

        const isEnabled = feedback != ''

        const header =
            <div>
                <div className='btn' style={btnStyle} onClick={() => this.setState({ runTour: !runTour })}>
                    {runTour ? "End tour" : "Take a tour"}
                </div>
                or
                <div className='btn submitFeedback' style={btnStyle} onClick={() => this.setState({ showForm: !showForm })}>
                    {showForm ? "Close feedback" : "Submit feedback"}
                </div>
            </div>

        const form =
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <h3 style={{ color: '#fff', marginLeft: '35px' }}>Issue? Request? Musing? We want it all!</h3>
                <div className='text-center'>
                    <Textarea
                        value={feedback}
                        placeholder="Enter feedback here"
                        callback={e => this.setState({ feedback: e.target.value })}
                    />
                    <button disabled={!isEnabled} onClick={this.postFeedback.bind(this)} style={{ borderColor: '#fff' }} className='btn btn-secondary'>Submit</button>
                </div>
            </ReactCSSTransitionGroup>

        const steps = [
                {
                    target: '.mainApp',
                    content: <MainApp />,
                    placement: 'center' as any,
                    disableBeacon: true
                },
                {
                    target: '.myOrders',
                    content: <MyOrders />,
                    placement: 'right',
                    disableBeacon: true
                },
                {
                    target: '.allOrders',
                    content: <AllOrders department={this.props.userProfile.department}/>,
                    placement: 'right',
                    disableBeacon: true
                },
                {
                    target: '.tpDashboard',
                    content: <TpDashboard />,
                    placement: 'right',
                    disableBeacon: true
                },
                {
                    target: '.cart',
                    content: <Cart />,
                    placement: 'right',
                    disableBeacon: true
                },
                {
                    target: '.userAccount',
                    content: <UserAccount />,
                    placement: 'right',
                    disableBeacon: true
                },
                {
                    target: '.submitFeedback',
                    content: <SubmitFeedback />,
                    placement: 'right',
                    disableBeacon: true
                }
            ]

        return <div>
            <div className='hidden-xs' style={styleLarge}>
                <div>{header}</div>
                <div style={{ width: '75%' }} className='pull-right'>
                    <div style={{ textAlign: 'left' }}>
                        {this.state.showForm == true &&
                            form
                        }
                    </div>
                </div>
            </div>
            <Joyride
                steps={steps}
                stepIndex={index}
                run={runTour}
                continuous={true}
                showProgress={true}
                callback={this.callback.bind(this)}
                styles={{
                    options: {
                        backgroundColor: '#FAF7F2',
                        primaryColor: '#337ab7',
                        width: '450px'
                    }
                }}
            />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.userProfile
    }),
    ({
        ...User.actionCreators,
        ...userProfile.actionCreators
    })
)(SiteTour)