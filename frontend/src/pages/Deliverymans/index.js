import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import PageHeaderList from '~/Components/PageHeaderList';
import Pagination from '~/Components/Pagination';
import DropdownMenu from '~/Components/Dropdown';
import Modal from '~/Components/Modal';
import { ConfirmContent } from '~/Components/Modal/styles';
import { EmptyContent } from '~/Components/styles/Table';
import { Table } from './styles';

export default function Deliveryman() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [query, setQuery] = useState('');
  const [deliveryman, setDeliveryman] = useState([]);

  const confirmModalRef = useRef(null);

  const loadDeliveryman = useCallback(async () => {
    const response = await api.get('deliveryman', {
      params: {
        ...pagination,
        q: query,
      },
    });
    setDeliveryman(response.data.rows);
  }, [pagination, query]);

  useEffect(() => {
    loadDeliveryman();
  }, [loadDeliveryman]);

  function handleSearch(text) {
    setQuery(text);
  }

  async function handleDeleteDeliveryman(id) {
    try {
      const response = await api.delete(`deliveryman/${id}`);

      if (response.status === 204) {
        toast.success('Entregador removido com sucesso');
        setDeliveryman(deliveryman.filter((man) => man.id !== id));
        confirmModalRef.current.hide();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  const confirmContent = (man) => {
    return (
      <ConfirmContent>
        <p className="question">
          Deseja remover o entregador <strong>{man.name}</strong>?
        </p>
        <div className="actions">
          <button type="button" onClick={() => confirmModalRef.current.hide()}>
            Cancelar
          </button>
          <button type="button" onClick={() => handleDeleteDeliveryman(man.id)}>
            Remover
          </button>
        </div>
      </ConfirmContent>
    );
  };

  function handleNextPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page + 1,
    });
  }

  function handlePreviousPage() {
    const { page } = pagination;
    setPagination({
      ...pagination,
      page: page - 1,
    });
  }

  function handleConfirmDelete(man) {
    confirmModalRef.current.setModalContent(confirmContent(man));
    confirmModalRef.current.show();
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Gerenciando entregadores"
        inputPlaceholder="Buscar por entregadores"
        handleClick={() => history.push('deliveryman/create')}
        handleSearch={handleSearch}
        disabledInput={deliveryman.length === 0 && query.length === 0}
      />
      {deliveryman.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveryman.map((man) => (
              <tr key={man.id}>
                <td>{`#${man.id}`}</td>
                <td className="deliveryman">
                  <img
                    src={
                      man.avatar.url ||
                      `https://ui-avatars.com/api/?size=32&rounded=true&name=${man.name}`
                    }
                    alt="Avatar"
                  />
                </td>
                <td>{man.name}</td>
                <td>{man.email}</td>
                <td>
                  <DropdownMenu
                    onEdit={() => history.push(`deliveryman/edit/${man.id}`)}
                    onDelete={() => handleConfirmDelete(man)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
          <EmptyContent>Nenhum entregador encontrado</EmptyContent>
        )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          deliveryman.length === 0 || deliveryman.length < pagination.limit
        }
      />
      <Modal ref={confirmModalRef} modalTitle="Remover registro" atTop />
    </>
  );
}
