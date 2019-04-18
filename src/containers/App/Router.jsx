import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

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

class WrappedRoutes extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <Layout />
        <div className="container__wrap">
          <PrivateRoute path="/dashboard" component={StoreDashboard} isLoggedIn={isLoggedIn} />
          <PrivateRoute path="/account" component={Account} isLoggedIn={isLoggedIn} />
          <PrivateRoute path="/store" component={Store} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    );
  }
}

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/404" component={NotFound404} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/" component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
