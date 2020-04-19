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
        content: 'Nome';
        font-weight: bold;
      }
      &:nth-of-type(3):before {
        content: 'Endereço';
        font-weight: bold;
      }
      &:nth-of-type(4):before {
        content: 'Ações';
        font-weight: bold;
      }
    }
  }
`;
