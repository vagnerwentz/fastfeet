import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px 20px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const Welcome = styled.View`
  margin-right: auto;
  margin-left: 10px;
`;

export const WelcomeText = styled.Text`
  color: #666;
`;

export const Name = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PageTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: #999;
  font-weight: bold;
`;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 70 },
})`
  margin-top: 10px;
`;

export const Card = styled.View`
  background: #fff;
  elevation: 2;
  margin-bottom: 20px;
  border-radius: 4px;
  border-color: #ddd;
  margin-left: 1px;
  margin-right: 1px;
  margin-top: 1px;
`;

export const CardTop = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const CardBottom = styled.View`
  background: #f8f9fd;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
`;

export const DeliveryInfo = styled.View``;

export const Label = styled.Text`
  font-size: 8px;
  color: #999;
  font-weight: bold;
`;

export const Value = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const DetailsButtonText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
`;
