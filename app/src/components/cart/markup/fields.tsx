import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as userProfile from '../../../store/userProfile'
import * as user from '../../../store/user'
import * as types from '../../../store/types'
import * as orders from '../../../store/orders'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Modal from 'react-responsive-modal'
import * as selects from './selects'
import SubmitIt from './submit'
import * as style from '../style'
import doesOrderContainNarcan from '../functions/doesOrderContainNarcan'

type props = {
    user: types.user
    userProfile: types.userProfile
    updateCart: (newProfile) => void
    closeForm: () => void
    newOrder: (newOrder) => boolean
}

export class FormFields extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            location: undefined,
            miscItems: undefined,
            comments: undefined,
            emergencyOrder: false,
            emergencyJustification: undefined,
            narcanCases: true,
            narcanAdministeredUnknown: undefined
        }
    }

    async placeOrder() {
        let items = [] as any
        this.props.userProfile.cart.forEach(c => {
            const orderItem = {
                item: {
                    cartegraphID: c.item.cartegraphID,
                    itemName: c.item.itemName,
                    itemType: c.item.itemType,
                    itemUnit: c.item.itemUnit
                },
                quantityOrdered: c.quantity,
            }
            items.push(orderItem)
        })
        const newOrder = {
            user: this.props.user.email,
            userName: this.props.user.name,
            department: this.props.userProfile.department,
            location: this.state.location.value,
            comments: this.state.comments,
            emergencyOrder: this.state.emergencyOrder.value,
            emergencyJustification: this.state.emergencyJustification,
            narcanCases: this.state.narcanCases.value,
            narcanAdministeredUnknown: this.state.narcanAdministeredUnknown,
            miscItems: this.state.miscItems,
            status: 'Order Submitted',
            supplies: items
        }
        const success = await this.props.newOrder(newOrder)
        if (success == true) {
            this.props.updateCart({
                user: this.props.user.email,
                cart: []
            })
        }
        return success
    }

    render() {
        const {
            location,
            miscItems,
            comments,
            emergencyOrder,
            emergencyJustification,
            narcanCases,
            narcanAdministeredUnknown
        } = this.state

        return (
            <Modal
                open={true}
                onClose={() => this.props.closeForm()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                <div className='col-md-12'>
                    <h4 className='text-center'><b>COMPLETE ORDER</b></h4>
                    {doesOrderContainNarcan(this.props.userProfile.cart) &&
                        <div className='col-md-12' style={style.narcanContainer}>
                            <h5 className='text-center'><b>NARCAN</b></h5>
                            <Select
                                value={narcanCases}
                                header='Do you have the cases?'
                                placeholder='Yes or no'
                                onChange={narcanCases => this.setState({ narcanCases })}
                                multi={false}
                                options={selects.YesNo}
                                required
                            />
                            <TextArea
                                value={narcanAdministeredUnknown}
                                header="If amount administered is unknown, please explain why"
                                placeholder="Explanation"
                                callback={e => this.setState({ narcanAdministeredUnknown: e.target.value })}
                            />
                        </div>
                    }
                    <Select
                        value={location}
                        header='Select location for delivery'
                        placeholder='Select House'
                        onChange={location => this.setState({ location })}
                        multi={false}
                        options={selects.FireHouses}
                        required
                    />
                    <TextArea
                        value={miscItems}
                        header="Do you need anything else?"
                        placeholder="Couldn't find what you were looking for?"
                        callback={e => this.setState({ miscItems: e.target.value })}
                    />
                    <div className='col-md-12' style={emergencyOrder.value ? style.emergencyColor : style.emergencyContainer}>
                        <Select
                            value={emergencyOrder}
                            header='Is this an emergency?'
                            placeholder='Yes or no'
                            onChange={emergencyOrder => this.setState({ emergencyOrder })}
                            multi={false}
                            options={selects.YesNo}
                            required
                        />
                        {emergencyOrder.value &&
                            <TextArea
                                value={emergencyJustification}
                                header="Emergency Justification"
                                placeholder="Please explain why this is an emergency"
                                callback={e => this.setState({ emergencyJustification: e.target.value })}
                            />
                        }
                    </div>
                    <TextArea
                        value={comments}
                        header="Additional comments"
                        placeholder="Anything else we need to know?"
                        callback={e => this.setState({ comments: e.target.value })}
                    />
                    <SubmitIt
                        submitIt={this.placeOrder.bind(this)}
                        closeForm={() => this.props.closeForm()}
                    />
                </div>
            </Modal>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.user,
        ...state.orders
    }),
    ({
        ...userProfile.actionCreators,
        ...user.actionCreators,
        ...orders.actionCreators
    })
)(FormFields)