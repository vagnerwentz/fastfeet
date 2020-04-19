import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

export function* addRecipient({ payload }) {
  try {
    const { data } = payload;

    console.tron.log(data);

    yield call(api.post, 'recipients', {
      ...data,
    });

    toast.success('Destinatário inserido com sucesso');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export function* updateRecipient({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `recipients/${id}`, {
      ...data,
    });

    toast.success('Destinatário atualizado com sucesso');

    history.push('/recipients');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@recipient/ADD_REQUEST', addRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipient),
]);
