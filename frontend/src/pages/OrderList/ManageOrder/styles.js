import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  padding: 25px 25px;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
