import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { Container, Title, Actions } from './styles';

export default function PageHeaderManage({
  pageTitle,
  handleSave,
  handleBack,
}) {
  return (
    <Container>
      <Title>{pageTitle}</Title>
      <Actions>
        {handleBack && (
          <button className="back" type="button" onClick={handleBack}>
            <MdChevronLeft size={18} color="#fff" />
            Voltar
          </button>
        )}
        {handleSave && (
          <button type="button" onClick={handleSave}>
            <MdCheck size={18} color="#fff" />
            Salvar
          </button>
        )}
      </Actions>
    </Container>
  );
}

PageHeaderManage.propTypes = {
  pageTitle: PropTypes.string,
  handleSave: PropTypes.func,
  handleBack: PropTypes.func,
};
