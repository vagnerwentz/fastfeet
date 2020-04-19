import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

export function* addDeliveryman({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, '/deliveryman', data);

    toast.success('Entregador cadastrado com sucesso');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export function* updateDeliveryman({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `deliveryman/${id}`, data);

    toast.success('Entregador atualizado com sucesso');
    history.push('/deliveryman');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@deliveryman/ADD_REQUEST', addDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
]);
