import React, { useState } from 'react';
import { StatusBar, View, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDate } from '../../util/formatDate';

import api from '../../services/api';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  CardTop,
  CardTitle,
  Label,
  Value,
  DeliveryDate,
  Actions,
  Action,
  ActionText,
} from './styles';

export default function DeliveryDetails({ navigation, route }) {
  const [delivery, setDelivery] = useState(route.params.delivery);
  const { recipient, deliveryman_id } = delivery;

  function getStatus() {
    if (delivery.end_date) return 'Entregue';
    if (delivery.start_date) return 'Aguardando Recebimento';
    return 'Pendente';
  }

  async function handleConfirm() {
    if (delivery.start_date) {
      navigation.navigate('ConfirmDelivery', { id: delivery.id });
    } else {
      try {
        const response = await api.put(`deliveries/${delivery.id}/start`, {
          deliveryman_id,
        });
        setDelivery(response.data);
      } catch (error) {
        ToastAndroid.show(error.response.data.error, ToastAndroid.LONG);
      }
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
              <CardTop>
                <Icon name="local-shipping" size={24} color="#7D40E7" />
                <CardTitle>Informações da Entrega</CardTitle>
              </CardTop>
              <Label>Destinatário</Label>
              <Value>{recipient.name}</Value>
              <Label>Endereço de entrega</Label>
              <Value>
                Rua {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}, {recipient.zip_code}
              </Value>
              <Label>Produto</Label>
              <Value style={{ marginBottom: 0 }}>{delivery.product}</Value>
            </Card>
            <Card>
              <CardTop>
                <Icon name="event" size={24} color="#7D40E7" />
                <CardTitle>Situação da Entrega</CardTitle>
              </CardTop>
              <Label>Status</Label>
              <Value>{getStatus()}</Value>
              <DeliveryDate>
                <View>
                  <Label>Data de Retirada</Label>
                  <Value style={{ marginBottom: 0 }}>
                    {formatDate(delivery.start_date, 'dd/MM/yyyy')}
                  </Value>
                </View>
                <View>
                  <Label>Data de Entrega</Label>
                  <Value style={{ marginBottom: 0 }}>
                    {formatDate(delivery.end_date, 'dd/MM/yyyy')}
                  </Value>
                </View>
              </DeliveryDate>
            </Card>
            <Actions>
              <Action
                style={{ borderRightColor: '#e5e5e5', borderRightWidth: 1 }}
                onPress={() =>
                  navigation.navigate('RegisterProblem', { id: delivery.id })
                }
              >
                <Icon name="highlight-off" size={22} color="#E74040" />
                <ActionText>Informar Problema</ActionText>
              </Action>
              <Action
                style={{ borderRightColor: '#e5e5e5', borderRightWidth: 1 }}
                onPress={() => navigation.navigate('Problems', { delivery })}
              >
                <Icon name="info-outline" size={22} color="#E7BA40" />
                <ActionText>Visualizar Problemas</ActionText>
              </Action>
              <Action
                disabled={delivery.end_date && 1}
                onPress={() => handleConfirm()}
              >
                <MCIcon
                  name="check-circle-outline"
                  size={22}
                  color={delivery.end_date ? '#cecece' : '#7D40E7'}
                />
                <ActionText style={delivery.end_date && { color: '#cecece' }}>
                  {delivery.start_date
                    ? 'Confirmar Entrega'
                    : 'Confirmar Retirada'}
                </ActionText>
              </Action>
            </Actions>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
        deliveryman_id: PropTypes.number,
        product: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        deliveryman: PropTypes.shape({
          id: PropTypes.number,
        }),
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          number: PropTypes.number,
          city: PropTypes.string,
          state: PropTypes.string,
          zip_code: PropTypes.string,
        }),
      }),
    }),
  }),
};
