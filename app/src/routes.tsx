import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import AllOrders from './components/orders/allOrders'
import MyOrders from './components/orders/myOrders'
import Cart from './components/cart'
import Admin from './components/admin'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/AllOrders' component={AllOrders} />
    <Route exact path='/MyOrders' component={MyOrders} />
    <Route exact path='/Cart' component={Cart} />
    <Route exact path='/Admin' component={Admin} />
  </Layout>
)