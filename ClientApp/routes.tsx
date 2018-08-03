import * as React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Survey from './components/Survey'
import Cart from './components/Cart/FullCart'
import Home from './components/Home'
import Units from './components/Resources/Units'
import EmergencyOrder from './components/Resources/EmergencyOrders'
import Submit from './components/Submit/Main'
import { Login } from './components/Account/Login'

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/Items' component={ Submit } />
    <Route path='/Cart' component={ Cart } />
    <Route path='/UnitsOfIssue' component={ Units } />
    <Route path='/WhatsAnEmergency' component={ EmergencyOrder } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
