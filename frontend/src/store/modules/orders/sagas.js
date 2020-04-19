import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

export function* addOrder({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'orders', data);

    toast.success('Encomenda cadastrada com sucesso');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export function* updateOrder({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `orders/${id}`, data);

    toast.success('Encomenda atualizada com sucesso');
    history.push('/orderlist');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@order/ADD_REQUEST', addOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
