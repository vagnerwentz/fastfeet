import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';
import PropTypes from 'prop-types';

import { InputGroup } from '../Input/styles';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputGroup>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactInputMask
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </InputGroup>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
