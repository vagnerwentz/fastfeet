import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  label {
    font-weight: bold;
    color: #444;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 10px;
    color: #999;
    transition: border 0.5s;
    &:focus {
      border-color: #7d40e7;
    }
  }
  span {
    color: #f94d6a;
    align-self: flex-start;
    margin: 8px 0 0;
    font-weight: bold;
  }
`;
