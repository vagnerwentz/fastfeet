import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const HeaderExtented = styled.View`
  padding: 0 20px;
  background: #7d40e7;
  height: 100px;
  align-self: stretch;
  overflow: visible;
`;

export const Content = styled.View`
  padding: 0 20px;
  background: #fff;
  flex: 1;
`;

export const ContentOverlap = styled.View`
  background: transparent;
  width: 100%;
  position: absolute;
  top: -80px;
  left: 20px;
`;

export const Card = styled.View`
  background: #fff;
  elevation: 2;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
  height: 415px;
  overflow: hidden;
`;

export const ButtonCapture = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ButtonSend = styled.TouchableOpacity`
  background: ${(props) => (props.disabled ? '#cecece' : '#7d40e7')};
  height: 45px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const ButtonSendText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
