import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '../../services/api';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  ButtonCapture,
  ButtonSend,
  ButtonSendText,
} from './styles';

export default function ConfirmDelivery({ navigation, route }) {
  const { id } = route.params;
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Aguardando...</Text>
    </View>
  );

  function switchCamera() {
    if (cameraType === RNCamera.Constants.Type.back)
      setCameraType(RNCamera.Constants.Type.front);
    else setCameraType(RNCamera.Constants.Type.back);
  }

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setPhoto({
      uri: data.uri,
      type: 'image/jpeg',
      originalname: `user_signature_delivery_id_${id}.jpg`,
    });
  }

  async function handleSubmitSignature() {
    setLoading(true);

    const data = new FormData(); // eslint-disable-line
    data.append('file', {
      uri: photo.uri,
      type: photo.type,
      name: photo.originalname,
    });

    try {
      const response = await api.post('files', data);

      const { id: signature_id } = response.data;

      if (response.status === 201) {
        const result = await api.put(`deliveries/${id}/end`, { signature_id });

        if (result.status === 200) {
          ToastAndroid.show(
            'Encomenda entregue com sucesso',
            ToastAndroid.LONG
          );
          navigation.navigate('Dashboard');
        }
      } else {
        ToastAndroid.show(
          'Não foi possível confirmar a entrega. Tente novamente.',
          ToastAndroid.LONG
        );
      }
    } catch (error) {
      Alert.alert('Opsss...', 'Não foi possível enviar a imagem.');
    } finally {
      setLoading(false);
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
              {photo.uri ? (
                <View
                  style={{
                    position: 'relative',
                    flex: 1,
                  }}
                >
                  <Image source={{ uri: photo.uri }} style={{ flex: 1 }} />
                  <ButtonCapture
                    onPress={() => setPhoto({})}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      alignSelf: 'center',
                    }}
                  >
                    <Icon name="clear" size={24} color="#fff" />
                  </ButtonCapture>
                </View>
              ) : (
                  <RNCamera
                    style={{
                      flex: 1,
                    }}
                    type={cameraType}
                    androidCameraPermissionOptions={{
                      title: 'Permissão para usar a câmera',
                      message:
                        'Este aplicativo necessita da sua autorização para usar a câmera',
                      buttonPositive: 'OK',
                      buttonNegative: 'Cancelar',
                    }}
                  >
                    {({ camera, status }) => {
                      if (status !== 'READY') return <PendingView />;
                      return (
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginHorizontal: 20,
                          }}
                        >
                          <ButtonCapture
                            onPress={() => switchCamera()}
                            onLongPress={() =>
                              ToastAndroid.show(
                                'Altera entre câmera frontal e traseira',
                                ToastAndroid.LONG
                              )
                            }
                          >
                            <Icon name="switch-camera" size={24} color="#fff" />
                          </ButtonCapture>
                          <ButtonCapture onPress={() => takePicture(camera)}>
                            <Icon name="photo-camera" size={24} color="#fff" />
                          </ButtonCapture>
                        </View>
                      );
                    }}
                  </RNCamera>
                )}
            </Card>
            <ButtonSend
              disabled={(loading || !photo.uri) && 1}
              onPress={handleSubmitSignature}
            >
              {loading ? (
                <ActivityIndicator color="#666" />
              ) : (
                  <ButtonSendText>
                    {photo.uri ? 'Enviar' : 'Capture a foto'}
                  </ButtonSendText>
                )}
            </ButtonSend>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};
