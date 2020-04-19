import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { formatDate } from '~/util/formatDate';

import api from '~/services/api';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  ProductName,
  ProblemsList,
  ProblemItem,
  ProblemDescription,
  ProblemDate,
} from './styles';

export default function Problems({ route }) {
  const { delivery } = route.params;
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/${delivery.id}/problems`);

      setProblems(response.data.rows);
    }

    loadProblems();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented />
        <Content>
          <ContentOverlap>
            <ProductName>{delivery.product}</ProductName>
            <ProblemsList
              data={problems}
              keyExtractor={(problem) => String(problem.id)}
              ListEmptyComponent={
                <ProblemItem style={{ justifyContent: 'center' }}>
                  <ProblemDescription>
                    Nenhum problema informado
                  </ProblemDescription>
                </ProblemItem>
              }
              renderItem={({ item }) => (
                <ProblemItem>
                  <ProblemDescription>{item.description}</ProblemDescription>
                  <ProblemDate>
                    {formatDate(item.createdAt, 'dd/MM/yyyy')}
                  </ProblemDate>
                </ProblemItem>
              )}
            />
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

Problems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
        product: PropTypes.string,
      }),
    }),
  }),
};

Problems.defaultProps = {
  route: {},
};
