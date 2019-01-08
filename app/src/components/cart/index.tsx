import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'

type props = {
    userProfile: types.userProfile
}

export class Cart extends React.Component<props, {}> {
    render() {
        return (
            <div className='col-md-12'>
                <div>Shopping cart</div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile
    }),
    ({
        ...userProfile.actionCreators
    })
)(Cart as any)