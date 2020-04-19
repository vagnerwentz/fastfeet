import React, { useState } from 'react';
import { StatusBar, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';

import api from '~services/api';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  Input,
  ButtonSend,
  ButtonSendText,
} from './styles';

export default function RegisterProblem({ navigation, route }) {
  const { id } = route.params;
  const [description, setDescription] = useState('');

  async function handleRegisterProblem() {
    const { status } = await api.post(`delivery/${id}/problems`, {
      description,
    });

    if (status === 201) {
      ToastAndroid.show('Problema cadastrado', ToastAndroid.LONG);
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Não foi possível cadastrar o problema',
        ToastAndroid.LONG
      );
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented />
        <Content>
          <ContentOverlap>
            <Card>
              <Input
                placeholder="Inclua aqui o problema que ocorreu na entrega."
                numberOfLines={15}
                multiline
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </Card>
            <ButtonSend onPress={handleRegisterProblem}>
              <ButtonSendText>Enviar</ButtonSendText>
            </ButtonSend>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

RegisterProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
};
