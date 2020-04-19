import { all } from 'redux-saga/effects';

// Sagas
import auth from './auth/sagas';
import orders from './orders/sagas';
import recipients from './recipients/sagas';
import deliverymans from './deliverymans/sagas';

export default function* rootSaga() {
  return yield all([auth, orders, recipients, deliverymans]);
}
