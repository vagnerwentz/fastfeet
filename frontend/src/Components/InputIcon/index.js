import React from 'react';
import PropTypes from 'prop-types';

import { InputGroup } from './styles';

export default function InputIcon({ icon: Icon, ...props }) {
  return (
    <InputGroup>
      <Icon size={16} color="#999" />
      <input {...props} />
    </InputGroup>
  );
}

InputIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
