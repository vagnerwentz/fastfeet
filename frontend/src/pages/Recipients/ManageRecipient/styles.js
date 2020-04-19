import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  padding: 25px 25px;
`;

export const Block2 = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Block3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
