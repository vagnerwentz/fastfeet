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
  elevation: 1;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
`;

export const Input = styled.TextInput`
  color: #999;
  font-size: 16px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ButtonSend = styled.TouchableOpacity`
  background: #7d40e7;
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
