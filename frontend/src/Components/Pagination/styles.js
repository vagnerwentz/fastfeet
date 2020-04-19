import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 600px) {
    justify-content: space-between;
    button {
      width: 100%;
    }
  }
  button {
    border: 1px solid #7d40e7;
    background: transparent;
    height: 36px;
    color: #7d40e7;
    font-weight: bold;
    border-radius: 4px;
    padding: 0 15px;
    transition: all 0.2s;
    &:first-of-type {
      margin-right: 10px;
    }
    &[disabled] {
      border: 1px solid #bbb;
      color: #bbb;
      cursor: not-allowed;
    }
    &:hover:not([disabled]) {
      background: #7d40e7;
      color: #fff;
    }
  }
`;
