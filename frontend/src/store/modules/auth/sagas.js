import { all, put, call, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Services
import api from '~/services/api';
import history from '~/services/history';

// Actions
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (!user.is_admin) {
      toast.error('Usuário não é administrador.');
      return;
    }

    yield put(signInSuccess(token, user));
    history.push('/orderlist');
  } catch (err) {
    toast.error('Falha na autenticação.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
