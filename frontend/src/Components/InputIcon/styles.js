import styled from 'styled-components';

export const InputGroup = styled.div`
  position: relative;
  @media only screen and (max-width: 600px) {
    width: 100%;
    input {
      width: 100%;
    }
  }
  input {
    height: 36px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 10px 0 27px;
    color: #999;
    transition: all 0.5s;
    &:focus {
      border-color: #7d40e7;
      color: #222;
    }
  }
  svg {
    position: absolute;
    bottom: 10px;
    left: 9px;
  }
`;
