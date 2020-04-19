import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  color: #444;
  margin-bottom: 40px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  button {
    display: flex;
    align-items: center;
    background: #7d40e7;
    border-radius: 4px;
    height: 36px;
    color: #fff;
    border: none;
    font-weight: bold;
    transition: background 0.2s;
    padding: 5px 15px;
    text-transform: uppercase;
    svg {
      margin-right: 5px;
    }
    &:hover {
      background: ${darken(0.08, '#7d40e7')};
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
      justify-content: center;
      margin-top: 10px;
    }
  }
`;
