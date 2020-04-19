import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #7d40e7;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Input = styled.TextInput`
  height: 45px;
  background: #fff;
  align-self: stretch;
  border: 1px solid #999;
  border-radius: 4px;
  margin-top: 50px;
  padding: 0 15px;
`;

export const Button = styled.TouchableOpacity`
  height: 45px;
  background: ${(props) => (props.disabled ? '#cecece' : '#82bf18')};
  align-self: stretch;
  border-radius: 4px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
