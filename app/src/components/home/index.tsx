import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import Items from '../items'

export default class Home extends React.Component<any, any> {

    render() {
        return (
            <div>
                <HydrateStore />
                <Items />
            </div>
        )
    }
}