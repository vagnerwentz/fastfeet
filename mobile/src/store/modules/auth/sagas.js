import { Alert } from 'react-native';
import { all, put, call, takeLatest } from 'redux-saga/effects';

// Services
import api from '~/services/api';

// Actions
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliveryman/${id}/sessions`);

    const deliveryman = response.data;

    yield put(signInSuccess(deliveryman));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Cheque seus dados.');
    yield put(signFailure());
  }
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
