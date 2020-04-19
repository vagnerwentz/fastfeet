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
  top: -90px;
  left: 20px;
`;

export const Card = styled.View`
  background: #fff;
  elevation: 2;
  border-radius: 4px;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
`;

export const CardTop = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  color: #999;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Value = styled.Text`
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
`;

export const DeliveryDate = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fd;
  elevation: 2;
  border-radius: 4px;
`;

export const Action = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 10px 0;
`;

export const ActionText = styled.Text`
  color: #999;
  font-size: 12px;
  width: 60px;
  text-align: center;
`;
