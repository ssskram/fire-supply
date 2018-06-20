import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Survey from './components/Survey';
import MyOrders from './components/Track/MyOrders';
import AllOrders from './components/Track/AllOrders';
import MapContainer from './components/Map/MapContainer';
import Home from './components/Home';
import { Login } from './components/Account/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Map' component={ MapContainer } />
    <Route path='/Survey' component={ Survey } />
    <Route path='/MyOrders' component={ MyOrders } />
    <Route path='/AllOrders' component={ AllOrders } />
    <Route path='/Account/Login' component={ Login } />
</Layout>;
