import React from 'react';
import { Switch } from 'react-router-dom';

// Config private routes
import Route from './Route';

// Pages
import SignIn from '~/pages/SignIn';
import OrderList from '~/pages/OrderList';
import ManageOrder from '~/pages/OrderList/ManageOrder';
import Deliverymans from '~/pages/Deliverymans';
import ManageDeliveryman from '~/pages/Deliverymans/ManageDeliveryman';
import Recipients from '~/pages/Recipients';
import ManageRecipient from '~/pages/Recipients/ManageRecipient';
import OrderIssues from '~/pages/OrderIssues';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      {/* Orders */}
      <Route path="/orderlist" exact component={OrderList} isPrivate />
      <Route path="/orders/create" exact component={ManageOrder} isPrivate />
      <Route path="/orders/edit/:id" exact component={ManageOrder} isPrivate />
      <Route path="/orderlist" exact component={OrderList} isPrivate />

      {/* Deliveryman */}
      <Route path="/deliveryman" exact component={Deliverymans} isPrivate />
      <Route
        path="/deliveryman/create"
        exact
        component={ManageDeliveryman}
        isPrivate
      />
      <Route
        path="/deliveryman/edit/:id"
        exact
        component={ManageDeliveryman}
        isPrivate
      />

      {/* Recipient */}
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route
        path="/recipients/create"
        exact
        component={ManageRecipient}
        isPrivate
      />
      <Route
        path="/recipients/edit/:id"
        exact
        component={ManageRecipient}
        isPrivate
      />

      {/* Order issues */}
      <Route path="/problems" exact component={OrderIssues} isPrivate />
    </Switch>
  );
}
