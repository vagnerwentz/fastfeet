import React, { useState, useRef } from 'react';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, Button, Menu } from './styles';

export default function Dropdown({
  onView,
  onDelete,
  onEdit,
  viewLabel,
  deleteLabel,
  editLabel,
}) {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  function closeMenu() {
    // if (!dropdownRef.current.contains(event.target)) { }

    setVisible(false);

    document.removeEventListener('click', closeMenu);
  }

  function showMenu(e) {
    e.preventDefault();

    if (visible) return;

    setVisible(true);

    document.addEventListener('click', closeMenu);
  }

  return (
    <Container>
      <Button type="button" onClick={showMenu}>
        <MdMoreHoriz color="#c6c6c6" size={16} />
      </Button>

      {visible && (
        <Menu ref={dropdownRef}>
          <span>{}</span>

          <li disabled={onView ? 0 : 1}>
            <button type="button" onClick={onView}>
              <MdVisibility color="#8E5BE8" size={15} />
              <span>{viewLabel}</span>
            </button>
          </li>
          <li disabled={onEdit ? 0 : 1}>
            <button onClick={onEdit} type="button">
              <MdCreate color="#4D85EE" size={15} />
              <span>{editLabel}</span>
            </button>
          </li>
          <li disabled={onDelete ? 0 : 1}>
            <button type="button" onClick={onDelete}>
              <MdDeleteForever color="#DE3B3B" size={15} />
              <span>{deleteLabel}</span>
            </button>
          </li>
        </Menu>
      )}
    </Container>
  );
}

Dropdown.propTypes = {
  onView: PropTypes.func,
  viewLabel: PropTypes.string,
  onEdit: PropTypes.func,
  editLabel: PropTypes.string,
  onDelete: PropTypes.func,
  deleteLabel: PropTypes.string,
};

Dropdown.defaultProps = {
  onView: null,
  viewLabel: 'Visualizar',
  onEdit: null,
  editLabel: 'Editar',
  onDelete: null,
  deleteLabel: 'Excluir',
};
