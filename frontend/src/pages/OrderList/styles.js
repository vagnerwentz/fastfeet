import styled from 'styled-components';
import { Table as TableStyle } from '~/Components/styles/Table';

export const Table = styled(TableStyle)`
  @media only screen and (max-width: 850px) {
    td {
      &:nth-of-type(1):before {
        content: 'ID';
        font-weight: bold;
      }
      &:nth-of-type(2):before {
        content: 'Destinatário';
        font-weight: bold;
      }
      &:nth-of-type(3):before {
        content: 'Entregador';
        font-weight: bold;
      }
      &:nth-of-type(4):before {
        content: 'Cidade';
        font-weight: bold;
      }
      &:nth-of-type(5):before {
        content: 'Estado';
        font-weight: bold;
      }
      &:nth-of-type(6):before {
        content: 'Status';
        font-weight: bold;
      }
      &:nth-of-type(7):before {
        content: 'Ações';
        font-weight: bold;
      }
    }
  }
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  color: #666;
  > strong {
    color: initial;
  }
  .recipient {
    border-bottom: 1px solid #eee;
    p {
      margin-bottom: 5px;
    }
  }
  > strong {
    margin: 10px 0;
  }
  .data {
    border-bottom: 1px solid #eee;
    div {
      margin-bottom: 5px;
    }
  }
  img {
    margin: 15px 0;
    text-align: center;
    width: 250px;
    align-self: center;
  }
`;
