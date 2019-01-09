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
import ItemTable from './markup/items'
import NullSearch from './markup/nullSearch'
import Spinner from '../utilities/spinner'

type props = {
    items: types.items,
    userProfile: types.userProfile
}

type state = {
    items: Array<types.item> | undefined
    itemTypes: Array<string>
    selectedTypes: Array<string>
    searchTerm: string
    nullSearch: boolean
}

export class Items extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            items: undefined,
            itemTypes: [],
            selectedTypes: [],
            searchTerm: '',
            nullSearch: false
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

    setSelectedTypes(filter) {
        let selectedTypes
        if (this.state.selectedTypes.find(item => item == filter)) {
            // if type already exists in array filter, remove it
            selectedTypes = this.state.selectedTypes.filter(item => item != filter)
        } else {
            // otherwise, add it
            selectedTypes = this.state.selectedTypes.concat([filter])
        }
        return selectedTypes
    }

    receiveFilter(filterType, filter) {
        if (filterType == 'selectedTypes') {
            const selectedTypes = this.setSelectedTypes(filter)
            this.setState({
                selectedTypes: selectedTypes,
                items: filterItemsByDept(this.props.items, this.props.userProfile)
            }, () => this.executefilter())
        } else {
            this.setState({
                searchTerm: filter,
                items: filterItemsByDept(this.props.items, this.props.userProfile)
            }, () => this.executefilter())
        }
    }

    executefilter() {
        const filteredItems = filterItems(this.state)
        if (filteredItems.length > 0) {
            this.setState({
                items: filteredItems,
                nullSearch: false
            })
        } else {
            this.setState({
                items: filterItemsByDept(this.props.items, this.props.userProfile),
                nullSearch: true,
                selectedTypes: [],
                searchTerm: ''
            })
        }

    }

    render() {
        const {
            items,
            itemTypes,
            searchTerm,
            selectedTypes,
            nullSearch
        } = this.state

        const {
            userProfile,
        } = this.props
        
        return (
            <div>
                <Header department={userProfile.department} />
                {items == undefined &&
                    <Spinner notice='...loading inventory...' />
                }
                {items && items.length > 0 && 
                    <div>
                        <div className='row'>
                            <Search
                                searchTerm={searchTerm}
                                receiveFilter={this.receiveFilter.bind(this)}
                            />
                            <Types
                                itemTypes={itemTypes}
                                selectedTypes={selectedTypes}
                                receiveFilter={this.receiveFilter.bind(this)}
                            />
                        </div>
                        {nullSearch == true &&
                            <NullSearch />
                        }
                        <div className='row'>
                            <ItemTable items={items} userProfile={userProfile} />
                        </div>
                    </div>
                }
                {items && items.length == 0 && userProfile.department != "...loading" &&
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