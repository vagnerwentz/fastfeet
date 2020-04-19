import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import PageHeaderList from '~/Components/PageHeaderList';
import DropdownMenu from '~/Components/Dropdown';
import { EmptyContent } from '~/Components/styles/Table';
import Modal from '~/Components/Modal';
import { ConfirmContent } from '~/Components/Modal/styles';
import { Table } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState('');

  const modalRef = useRef(null);
  const confirmModalRef = useRef(null);

  const loadProblems = useCallback(async () => {
    const response = await api.get('deliveries/problems', {
      params: {
        q: query,
      },
    });
    setProblems(response.data.rows);
  }, [query]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  function handleSearch(text) {
    setQuery(text);
  }

  async function handleCancelDelivery(problem) {
    try {
      await api.put(`problem/${problem.id}/cancel-delivery`);
      setProblems(
        problems.filter((p) => p.delivery.id !== problem.delivery.id)
      );

      toast.success('Encomenda cancelada com sucesso');

      confirmModalRef.current.hide();
    } catch (err) {
      toast.error('Não foi possível cancelar a encomenda. Tente mais tarde.');
    }
  }

  const content = (data) => {
    return <div>{data}</div>;
  };

  const confirmContent = (problem) => {
    return (
      <ConfirmContent>
        <p className="question">
          Deseja cancelar a encomenda <strong>#{problem.delivery.id}</strong>?
        </p>
        <div className="actions">
          <button type="button" onClick={() => confirmModalRef.current.hide()}>
            Fechar
          </button>
          <button type="button" onClick={() => handleCancelDelivery(problem)}>
            Cancelar encomenda
          </button>
        </div>
      </ConfirmContent>
    );
  };

  function handleViewProblem(problem) {
    modalRef.current.setModalContent(content(problem.description));
    modalRef.current.show();
  }

  function handleConfirmCancel(problem) {
    confirmModalRef.current.setModalContent(confirmContent(problem));
    confirmModalRef.current.show();
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Problemas na entrega"
        inputPlaceholder="Buscar por encomendas"
        handleSearch={handleSearch}
        disabledInput={problems.length === 0 && query.length === 0}
      />
      {problems.length ? (
        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>{`#${problem.delivery.id}`}</td>
                <td>{problem.description}</td>
                <td>
                  <DropdownMenu
                    onView={() => handleViewProblem(problem)}
                    onDelete={() => handleConfirmCancel(problem)}
                    deleteLabel="Cancelar encomenda"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
          <EmptyContent>Nenhuma encomenda com problemas</EmptyContent>
        )}
      <Modal ref={modalRef} modalTitle="Visualizar problema" />
      <Modal ref={confirmModalRef} modalTitle="Remover registro" atTop />
    </>
  );
}
