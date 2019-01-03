import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as items from '../../store/items'
import * as userProfile from '../../store/userProfile'
import filterItemsByDept from './functions/filterItemsByDept'
import collectItemTypes from './functions/collectItemTypes'
import filterItems from './functions/filterItems'
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
        if (this.props != nextProps) {
            // get relevant items & item types by dept
            const items = filterItemsByDept(nextProps.items, nextProps.userProfile)
            const types = collectItemTypes(items)
            this.setState({
                items: items,
                itemTypes: types
            })
        }
    }

    receiveFilter(filterType, filterLoad) {
        if (filterType == 'selectedTypes') {
            this.setState({ selectedTypes: filterLoad }, () => this.executefilter())
        } else {
            this.setState({ searchTerm: filterLoad }, () => this.executefilter()) 
        }
    }

    executefilter() {
        const filteredItems = filterItems(this.state)
        this.setState({
            items: filteredItems
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
                            <Search />
                            <Types itemTypes={itemTypes} />
                        </div>
                        <div className='row'>
                            <ItemCards items={items} />
                        </div>
                    </div>
                }
                {items.length == 0 && userProfile.department != "...loading" &&
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