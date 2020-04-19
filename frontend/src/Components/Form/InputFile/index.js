import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { MdImage } from 'react-icons/md';

import api from '~/services/api';

import { LabelContainer } from './styles';

export default function InputFile({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const [avatarId, setAvatarId] = useState(defaultValue);

  const handlePreview = useCallback(async (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      setPreview(null);
    }

    const previewURL = URL.createObjectURL(file);

    const data = new FormData();
    data.append('file', file);
    const response = await api.post('files', data);
    const { id } = response.data;

    setAvatarId(id);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      getValue(ref, value) {
        return value || ref.getAttribute('data-id');
      },
      clearValue(ref) {
        ref.value = '';
        setAvatarId(null);
        setPreview(null);
      },
      setValue(_, value) {
        setAvatarId(value.id);
        setPreview(value.url);
      },
    });
  }, [fieldName, registerField]);

  return (
    <LabelContainer htmlFor={fieldName}>
      {preview ? (
        <div className="image-placeholder">
          <img src={preview} alt="Preview" />
        </div>
      ) : (
          <div
            className={error ? 'image-placeholder error' : 'image-placeholder'}
            title="Clique para selecionar uma imagem"
          >
            <MdImage color="#ddd" size={36} />
            <span>Adicionar foto</span>
          </div>
        )}
      <input
        id={fieldName}
        data-id={avatarId}
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
      />
    </LabelContainer>
  );
}

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
};
