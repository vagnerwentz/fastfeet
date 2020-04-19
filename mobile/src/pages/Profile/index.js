import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';

import { formatDate } from '../../util/formatDate';

import { signOut } from '../../store/modules/auth/actions';

import {
  Container,
  Avatar,
  UserInfo,
  Label,
  Value,
  ButtonLogout,
  ButtonLogoutText,
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.deliveryman);

  async function handleLogout() {
    dispatch(signOut());
    navigation.navigate('Login');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <>
          <Avatar
            source={{
              uri: profile
                ? profile.avatar
                : 'http://api.adorable.io/avatar/45/Vagner.png',
            }}
          />
          <UserInfo>
            <Label>Nome completo</Label>
            <Value>{profile.name}</Value>
            <Label>E-mail</Label>
            <Value>{profile.email}</Value>
            <Label>Data de cadastro</Label>
            <Value>{formatDate(profile.createdAt, 'dd/MM/yyyy')}</Value>
          </UserInfo>
          <ButtonLogout onPress={handleLogout}>
            <ButtonLogoutText>Logout</ButtonLogoutText>
          </ButtonLogout>
        </>
      </Container>
    </>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
