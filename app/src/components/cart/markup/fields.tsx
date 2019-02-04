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
import doesOrderContainEquipment from '../functions/doesOrderContainEquipment'

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
            emergencyOrder: undefined,
            emergencyJustification: undefined,
            narcanCases: undefined,
            narcanAdministeredUnknown: undefined,
            equipmentJustification: undefined
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
            narcanCases: this.state.narcanCases ? this.state.narcanCases.value : undefined,
            narcanAdministeredUnknown: this.state.narcanAdministeredUnknown,
            equipmentJustification: this.state.equipmentJustification,
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

    validSubmission(equipment, narcan) {
        let it = 0
        if (equipment.check && !this.state.equipmentJustification) it++
        if (narcan && !this.state.narcanCases) it++
        if (this.state.location == undefined) it++
        if (this.state.emergencyOrder == undefined) it++
        if (this.state.emergencyOrder && this.state.emergencyOrder.value && !this.state.emergencyJustification) it++
        return it == 0
    }

    render() {
        const {
            location,
            miscItems,
            comments,
            emergencyOrder,
            emergencyJustification,
            narcanCases,
            narcanAdministeredUnknown,
            equipmentJustification
        } = this.state

        const containsEquipment = doesOrderContainEquipment(this.props.userProfile.cart)
        const containsNarcan = doesOrderContainNarcan(this.props.userProfile.cart)
        const isEnabled = this.validSubmission(containsEquipment, containsNarcan)

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
                    <Select
                        value={location}
                        header='Select location for delivery'
                        placeholder='Select location'
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
                    <div className='col-md-12' style={emergencyOrder && emergencyOrder.value ? style.emergencyColor : style.emergencyContainer}>
                        <Select
                            value={emergencyOrder}
                            header='Is this an emergency?'
                            placeholder='Yes or no'
                            onChange={emergencyOrder => this.setState({ emergencyOrder })}
                            multi={false}
                            options={selects.YesNo}
                            required
                        />
                        {emergencyOrder && emergencyOrder.value &&
                            <TextArea
                                value={emergencyJustification}
                                header="Emergency Justification"
                                placeholder="Please explain why this is an emergency"
                                callback={e => this.setState({ emergencyJustification: e.target.value })}
                                required
                            />
                        }
                    </div>
                    {containsNarcan &&
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
                    {containsEquipment.check &&
                        <div className='col-md-12' style={style.equipmentContainer}>
                            <h5 className='text-center'><b>JUSTIFY EQUIPMENT</b></h5>
                            <TextArea
                                value={equipmentJustification}
                                header=""
                                placeholder={"Justify " + containsEquipment.items}
                                callback={e => this.setState({ equipmentJustification: e.target.value })}
                            />
                        </div>
                    }
                    <TextArea
                        value={comments}
                        header="Additional comments"
                        placeholder="Anything else we need to know?"
                        callback={e => this.setState({ comments: e.target.value })}
                    />
                    <SubmitIt
                        isEnabled={isEnabled}
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