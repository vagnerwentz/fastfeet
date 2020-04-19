import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Select = styled(AsyncSelect)`
  width: 100%;
  .react-select__control,
  .react-select__value-container {
    height: 45px;
    font-size: 14px;
  }
  .react-select__control.react-select__control--is-focused {
    border-color: #7d40e7 !important;
    box-shadow: unset;
    .react-select__placeholder {
      position: unset;
    }
  }
  .react-select__value-container.react-select__value-container--has-value {
    .react-select__single-value {
      transform: none !important;
    }
    .css-b8ldur-Input {
      margin: 0;
      padding: 0;
    }
  }
  .react-select__single-value {
    position: unset !important;
    font-size: 14px;
  }
  .react-select__placeholder {
    font-size: 14px;
    transform: none !important;
    top: unset !important;
  }
`;
