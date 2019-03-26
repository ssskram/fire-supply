import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import Items from '../items'

export default class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <HydrateStore />
                <Items />
            </div>
        )
    }
}