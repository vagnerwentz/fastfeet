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

export const ProductName = styled.Text`
  align-self: center;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 70 },
})`
  margin-top: 10px;
`;

export const ProblemItem = styled.View`
  flex-direction: row;
  background: #fff;
  elevation: 1;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 20px;
`;

export const ProblemDescription = styled.Text`
  color: #999;
  font-size: 16px;
  flex-shrink: 1;
`;

export const ProblemDate = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;
