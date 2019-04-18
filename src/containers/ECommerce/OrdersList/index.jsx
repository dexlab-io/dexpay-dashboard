import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import OrdersListTable from './components/OrdersListTable';
import Loading from '../../../shared/components/Loading';

const query = gql`
  {
    invoices {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      status
      createdAt
    }
  }
`;

const OrdersList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Invoices List</h3>
      </Col>
    </Row>
    <Row>
      <Query query={query} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (loading && !data.invoices) return <Loading />;
          if (error) return <p>Error: {error.message}</p>;
          // console.log('invoices', data.invoices);

          return (
            <OrdersListTable invoices={data.invoices} />
          );
        }}
      </Query>
    </Row>
  </Container>
);

export default OrdersList;
