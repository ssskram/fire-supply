import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as items from '../../store/items'
import * as userProfile from '../../store/userProfile'
import filterItemsByDept from './functions/filterItemsByDept'
import collectItemTypes from './functions/collectItemTypes'
import Header from './markup/header'

type props = {
    items: types.items,
    userProfile: types.userProfile
}

type state = {
    items: Array<types.items> | undefined
    itemTypes: Array<string> | undefined
}

export class Items extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            items: undefined,
            itemTypes: undefined
        }
    }

    async componentWillReceiveProps(nextProps) {
        // get relevant items & item types by dept
        const items = await filterItemsByDept(nextProps.items, nextProps.userProfile)
        const types = await collectItemTypes(items)
        if (items.length > 0 && types.length > 0) {
            this.setState({
                items: items,
                itemTypes: types
            }, function (this) { console.log(this.state) })
        }
    }

    render() {
        return (
            <div>
                <Header department={this.props.userProfile.department} />
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