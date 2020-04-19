import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import { Container, CardBox, Logo } from './styles';

// Actions
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password, isAdmin }) {
    dispatch(signInRequest(email, password, isAdmin));
  }

  return (
    <>
      <Container>
        <CardBox>
          <Logo>
            <img src={logo} width={250} alt="Fastfeet" />
          </Logo>

          <Form schema={schema} onSubmit={handleSubmit}>
            <label>SEU E-MAIL</label>
            <Input
              name="email"
              type="email"
              placeholder="exemplo@fastfeet.com"
            />
            <label>SUA SENHA</label>
            <Input name="password" type="password" placeholder="*********" />

            <button type="submit">Entrar no sistema</button>
          </Form>
        </CardBox>
      </Container>
    </>
  );
}
