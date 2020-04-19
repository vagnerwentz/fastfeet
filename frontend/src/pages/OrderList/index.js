import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

import { formatDate } from '~/util/FormatDate';

// Services
import api from '~/services/api';
import history from '~/services/history';

// Components
import PageHeaderList from '~/Components/PageHeaderList';
import DropdownMenu from '~/Components/Dropdown';
import Pagination from '~/Components/Pagination';
import Modal from '~/Components/Modal';
import { ConfirmContent } from '~/Components/Modal/styles';
import { EmptyContent } from '~/Components/styles/Table';

import { Order, Table } from './styles';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const modalRef = useRef(null);
  const confirmModalRef = useRef(null);

  function getStatus(order) {
    if (order.canceled_at) {
      return {
        class: 'canceled',
        text: 'Cancelada',
      };
    }

    if (order.end_date) {
      return {
        class: 'delivered',
        text: 'Entregue',
      };
    }

    if (order.start_date) {
      return {
        class: 'withdrawn',
        text: 'Retirada',
      };
    }

    return {
      class: 'pending',
      text: 'Pendente',
    };
  }

  // Carregamento das encomendas
  const loadOrders = useCallback(async () => {
    const { limit, page } = pagination;
    const response = await api.get('/orders', {
      params: {
        page,
        limit,
        q: query,
      },
    });

    setOrders(
      response.data.rows.map((ord) => ({
        ...ord,
        status: getStatus(ord),
      }))
    );
  }, [pagination, query]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  function handleSearch(text) {
    setQuery(text);
  }

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

  async function handleDeleteOrder(id) {
    const { status } = await api.delete(`orders/${id}`);

    if (status === 200) {
      toast.success('Encomenda removida com sucesso');
      setOrders(orders.filter((order) => order.id !== id));
    } else {
      toast.error('Não possível remover a encomenda. Tente novamente');
    }
    confirmModalRef.current.hide();
  }

  const confirmContent = (order) => {
    return (
      <ConfirmContent>
        <p className="question">
          Deseja remover a encomenda para o destinatário{' '}
          <strong>{order.recipient.name}</strong>?
        </p>
        <div className="actions">
          <button type="button" onClick={() => confirmModalRef.current.hide()}>
            Cancelar
          </button>
          <button type="button" onClick={() => handleDeleteOrder(order.id)}>
            Remover
          </button>
        </div>
      </ConfirmContent>
    );
  };

  const content = (order) => {
    return (
      <Order>
        <div className="recipient">
          <p>{order.recipient.street}</p>
          <p>
            {order.recipient.city} - {order.recipient.state}
          </p>
          <p>{order.recipient.zip_code}</p>
        </div>
        <strong>Datas</strong>
        <div className="data">
          <div className="item">
            <strong>Retirada:</strong>{' '}
            {formatDate(order.start_date, 'dd/MM/yyyy')}
          </div>
          <div className="item">
            <strong>Entrega:</strong> {formatDate(order.end_date, 'dd/MM/yyyy')}
          </div>
        </div>
        <strong>Assinatura do destinatário</strong>
        {order.signature && (
          <img src={order.signature.url} alt="Assinatura do destinatário" />
        )}
      </Order>
    );
  };

  function handleViewDelivery(order) {
    modalRef.current.setModalContent(content(order));
    modalRef.current.show();
  }

  function handleConfirmDelete(order) {
    confirmModalRef.current.setModalContent(confirmContent(order));
    confirmModalRef.current.show();
  }

  return (
    <>
      <PageHeaderList
        pageTitle="Gerenciando encomendas"
        inputPlaceholder="Buscar por encomendas"
        handleClick={() => history.push('/orders/create')}
        handleSearch={handleSearch}
        disabledInput={orders.length === 0 && query.length === 0}
      />
      {orders.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{`#${order.id}`}</td>
                <td>{order.recipient.name}</td>
                <td className="deliveryman">
                  <img
                    src={
                      order.deliveryman.avatar.url ||
                      `https://ui-avatars.com/api/?size=32&rounded=true&name=${order.deliveryman.name}`
                    }
                    alt="Avatar"
                  />
                  {order.deliveryman.name}
                </td>
                <td>{order.recipient.city}</td>
                <td>{order.recipient.state}</td>
                <td>
                  <span className={`status ${order.status.class}`}>
                    {order.status.text}
                  </span>
                </td>
                <td>
                  <DropdownMenu
                    onView={() => handleViewDelivery(order)}
                    onEdit={() => history.push(`/orders/edit/${order.id}`)}
                    onDelete={() => handleConfirmDelete(order)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
          <EmptyContent>Nenhuma encomenda encontrada</EmptyContent>
        )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={orders.length === 0 || orders.length < pagination.limit}
      />
      <Modal ref={modalRef} modalTitle="Informações da Encomenda" />
      <Modal ref={confirmModalRef} modalTitle="Remover registro" atTop />
    </>
  );
}
