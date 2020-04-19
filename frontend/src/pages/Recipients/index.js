import React, { useState, useEffect, useCallback } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import PageHeaderList from '~/Components/PageHeaderList';
import DropdownMenu from '~/Components/Dropdown';
import Pagination from '~/Components/Pagination';
import { EmptyContent } from '~/Components/styles/Table';
import { Table } from './styles';

export default function Recipients() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [query, setQuery] = useState('');
  const [recipients, setRecipients] = useState([]);

  const loadRecipients = useCallback(async () => {
    const response = await api.get('recipients', {
      params: {
        ...pagination,
        q: query,
      },
    });
    setRecipients(response.data.rows);
  }, [pagination, query]);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

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

  return (
    <>
      <PageHeaderList
        pageTitle="Gerenciando destinatários"
        inputPlaceholder="Buscar por destinatários"
        handleClick={() => history.push('/recipients/create')}
        handleSearch={handleSearch}
        disabledInput={recipients.length === 0 && query.length === 0}
      />
      {recipients.length ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>{`#${recipient.id}`}</td>
                <td>{recipient.name}</td>
                <td>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</td>
                <td>
                  <DropdownMenu
                    onEdit={() =>
                      history.push(`/recipients/edit/${recipient.id}`)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
          <EmptyContent>Nenhum destinatário encontrado</EmptyContent>
        )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        prevDisabled={pagination.page === 1}
        nextDisabled={
          recipients.length === 0 || recipients.length < pagination.limit
        }
      />
    </>
  );
}
