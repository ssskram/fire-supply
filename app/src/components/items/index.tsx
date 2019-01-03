import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as items from '../../store/items'
import * as userProfile from '../../store/userProfile'
import Header from './header'

type props = {
    items: types.items,
    userProfile: types.userProfile
}

export class Items extends React.Component<props, any> {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        return (
            <div>
                <Header department={this.props.userProfile.department}/>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.items
    }),
    ({
        ...userProfile.actionCreators,
        ...items.actionCreators
    })
)(Items as any)