import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as items from '../../store/items'
import * as userProfile from '../../store/userProfile'
import filterItemsByDept from './functions/filterItemsByDept'
import collectItemTypes from './functions/collectItemTypes'
import Header from './markup/header'
import Types from './markup/types'
import Search from './markup/search'
import NoItems from './markup/noItems'
import ItemCards from './markup/items'

type props = {
    items: types.items,
    userProfile: types.userProfile
}

type state = {
    items: Array<types.item>
    itemTypes: Array<string>
    selectedTypes: Array<string>
    searchTerm: string
}

export class Items extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            itemTypes: [],
            selectedTypes: [],
            searchTerm: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // get relevant items & item types by dept
        const items = filterItemsByDept(nextProps.items, nextProps.userProfile)
        const types = collectItemTypes(items)
        this.setState({
            items: items,
            itemTypes: types
        })
    }

    render() {
        const {
            items,
            itemTypes
        } = this.state

        const {
            userProfile,
        } = this.props

        return (
            <div>
                <Header department={userProfile.department} />
                {items.length > 0 &&
                    <div>
                        <div className='row'>
                            <Types itemTypes={itemTypes} />
                            <Search />
                        </div>
                        <div className='row'>
                            <ItemCards items={items} />
                        </div>
                    </div>
                }
                {items.length == 0  && userProfile.department != "...loading" &&
                    <NoItems userProfile={userProfile} />
                }
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