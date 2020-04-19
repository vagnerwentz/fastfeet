import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CardBox = styled.div`
  width: 100%;
  height: 425px;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  padding: 50px 30px;

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }

  form {
    input {
      width: 100%;
      display: block;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      border-color: #dddddd;
      height: 44px;
      padding: 0 15px;
      color: #000;
    }

    span {
      color: #fb6691;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin-top: 20px;
      background: #7d40e7;
      border-radius: 4px;
      width: 300px;
      height: 45px;
      color: #fff;
      border: none;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.02, '#7d40e1')};
      }
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
