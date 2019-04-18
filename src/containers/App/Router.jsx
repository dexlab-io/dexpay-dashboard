import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import Layout from '../Layout/index';

import NotFound404 from '../DefaultPage/404/index';

import Profile from '../Account/Profile/index';
import LogIn from '../Account/LogIn/index';
import Register from '../Account/Register/index';

import StoreDashboard from '../Dashboards/Store/index';
import OrdersList from '../ECommerce/OrdersList/index';
import OrderCreate from '../ECommerce/OrderCreate/index'
import OrderEdit from '../ECommerce/OrderEdit/index'
import ProductsList from '../ECommerce/ProductsList/index';
import ProductEdit from '../ECommerce/ProductEdit/index';

const Account = () => (
  <Switch>
    <Route path="/account/profile" component={Profile} />
  </Switch>
);

const Store = () => (
  <Switch>
    <Route path="/store/orders" component={OrdersList} />
    <Route path="/store/order/create" component={OrderCreate} />
    <Route path="/store/order/:id" component={OrderEdit} />
    <Route path="/store/product/:id" component={ProductEdit} />
    <Route path="/store/products" component={ProductsList} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/dashboard" component={StoreDashboard} />
      <Route path="/account" component={Account} />
      <Route path="/store" component={Store} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/404" component={NotFound404} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
