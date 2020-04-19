import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import {
  addOrderRequest,
  updateOrderRequest,
} from '~/store/modules/orders/actions';

import PageHeaderManage from '~/Components/PageHeaderManage';
import Input from '~/Components/Form/Input';
import InputAsyncSelect from '~/Components/Form/InputAsyncSelect';

import { Card, InputGroup } from './styles';

export default function ManageOrder() {
  const formRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  async function handleSubmitForm() {
    if (id) {
      dispatch(updateOrderRequest(formRef.current.getData(), id));
    } else {
      try {
        const schema = Yup.object().shape({
          recipient_id: Yup.number().required('Selecione um destinatário'),
          deliveryman_id: Yup.number().required('Selecione um entregador'),
          product: Yup.string().required('Informe o produto'),
        });
        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });

        dispatch(addOrderRequest(formRef.current.getData()));

        formRef.current.setErrors({});
        formRef.current.reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errorMessages = {};

          error.inner.forEach((err) => {
            errorMessages[err.path] = err.message;
          });

          formRef.current.setErrors(errorMessages);
        }
      }
    }
  }

  const loadRecipients = async (value) => {
    let options = [];

    if (value !== '') {
      const response = await api.get('recipients', {
        params: {
          q: value,
        },
      });

      options = response.data.rows.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));

      return options;
    }

    return [];
  };

  const loadDeliveryman = async (value) => {
    let options = [];
    if (value !== '') {
      const response = await api.get('deliveryman', {
        params: {
          q: value,
        },
      });

      options = response.data.rows.map((deliveryman) => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      return options;
    }

    return [];
  };

  useEffect(() => {
    async function loadRecipient() {
      if (!id) return;
      console.tron.log(id);
      const { data } = await api.get(`orders/${id}`);
      const { recipient, deliveryman } = data;
      formRef.current.setData(data);
      formRef.current.setFieldValue('recipient_id', {
        value: recipient.id,
        label: recipient.name,
      });
      formRef.current.setFieldValue('deliveryman_id', {
        value: deliveryman.id,
        label: deliveryman.name,
      });
    }

    loadRecipient();
  }, [id]);

  return (
    <>
      <PageHeaderManage
        handleBack={() => history.push('/orderlist')}
        handleSave={handleSubmitForm}
        pageTitle="Cadastro de encomendas"
      />
      <Card>
        <Form ref={formRef}>
          <InputGroup>
            <InputAsyncSelect
              name="recipient_id"
              label="Destinatário:"
              loadOptions={loadRecipients}
              placeholder="Selecione um destinatário..."
            />
            <InputAsyncSelect
              name="deliveryman_id"
              label="Entregador:"
              loadOptions={loadDeliveryman}
              placeholder="Selecione um entregador..."
            />
          </InputGroup>
          <Input
            name="product"
            label="Nome do produto:"
            placeholder="Descrição do produto..."
          />
        </Form>
      </Card>
    </>
  );
}
