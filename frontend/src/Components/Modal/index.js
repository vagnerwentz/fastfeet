import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Background, Box } from './styles';

const Modal = forwardRef(({ modalTitle, atTop }, ref) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  useImperativeHandle(ref, () => ({
    setModalContent(component) {
      setContent(component);
    },
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
  }));

  return (
    <Background style={{ display: !visible && 'none' }} atTop={atTop}>
      <Box>
        <header>
          {modalTitle}
          <button type="button" onClick={() => setVisible(false)}>
            <MdClose size={22} color="#bbb" />
          </button>
        </header>
        {content}
      </Box>
    </Background>
  );
});

Modal.propTypes = {
  modalTitle: PropTypes.string,
  atTop: PropTypes.bool,
};

Modal.defaultProps = {
  atTop: false,
};

export default Modal;
