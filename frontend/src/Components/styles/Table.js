import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;
  th:not(:last-of-type) {
    padding: 0px 20px;
    text-align: left;
  }
  td {
    padding: 10px 20px;
    text-align: left;
    color: #666666;
    &:not(:last-of-type) {
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
    }
    &.deliveryman {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
        border-radius: 50%;
        width: 32px;
        height: 32px;
      }
    }
    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    span.status {
      display: flex;
      width: fit-content;
      align-items: center;
      background: #dff0df;
      color: #2ca42b;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 12px;
      &:before {
        content: '';
        display: block;
        position: relative;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 5px;
        background: #2ca42b;
      }
      &.withdrawn {
        background: #bad2ff;
        color: #4d85ee;
        &:before {
          background: #4d85ee;
        }
      }
      &.pending {
        background: #f0f0df;
        color: #c1bc35;
        &:before {
          background: #c1bc35;
        }
      }
      &.canceled {
        background: #fab0b0;
        color: #de3b3b;
        &:before {
          background: #de3b3b;
        }
      }
    }
  }
  td {
    background: #fff;
  }
  @media only screen and (max-width: 850px) {
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      border-bottom: 8px solid #f5f5f5;
    }
    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding: 10px 0 10px 50%;
      border-radius: unset !important;
      div {
        align-items: flex-start;
      }
      &:before {
        position: absolute;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
      }
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

export const EmptyContent = styled.div`
  margin: 20px 0;
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
  font-size: 16px;
`;
