import { all } from 'redux-saga/effects';

// Sagas
import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
