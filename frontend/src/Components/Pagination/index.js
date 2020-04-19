import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Pagination({
  handlePreviousPage,
  handleNextPage,
  prevDisabled,
  nextDisabled,
}) {
  return (
    <Container>
      <button
        title="Clique para buscar registros anteriores"
        type="button"
        disabled={prevDisabled && 'disabled'}
        onClick={handlePreviousPage}
      >
        Anterior
      </button>
      <button
        title="Clique para buscar mais registros"
        type="button"
        disabled={nextDisabled && 'disabled'}
        onClick={handleNextPage}
      >
        Próximo
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  prevDisabled: PropTypes.bool.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
};
