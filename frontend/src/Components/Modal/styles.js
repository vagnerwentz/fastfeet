import styled from 'styled-components';
import { darken } from 'polished';

export const Box = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px #00000033;
  width: 100%;
  max-width: 450px;
  padding: 20px;
  margin: 0 10px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
    button {
      border: 0;
      background: transparent;
      svg {
        transition: fill 0.2s;
      }
      &:hover {
        svg {
          fill: ${darken(0.15, '#bbb')};
        }
      }
    }
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: ${(props) => (props.atTop ? 'flex-start' : 'center')};
  justify-content: center;
  ${Box} {
    margin-top: ${(props) => (props.atTop ? '10px' : 0)};
  }
`;

export const ConfirmContent = styled.div`
  .question {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .actions {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      height: 36px;
      border: 0;
      color: #fff;
      font-weight: bold;
      border-radius: 4px;
      background: #f94d6a;
      padding: 5px 15px;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#f94d6a')};
      }
    }
    button:first-of-type {
      margin-right: 5px;
      background: #ccc;
      &:hover {
        background: ${darken(0.1, '#ccc')};
      }
    }
  }
`;
