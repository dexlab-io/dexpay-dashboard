import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import OrderEditCard from './components/OrderEditCard';
import Loading from '../../../shared/components/Loading';

const query = gql`
  query Invoice($id: ID!) {
    invoice(id: $id) {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      assetUsed
      status
      createdAt
    }
  }
`;

const OrderEdit = ({match}) => {
  const { id } = match.params;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Invoice Edit</h3>
        </Col>
      </Row>
      <Row>
        <Query query={query} variables={{ id }} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return `Error!: ${error}`;
            // console.log('data',data)

            return <OrderEditCard invoice={data.invoice} />;
          }}
        </Query>
      </Row>
    </Container>
  )
};

export default OrderEdit;
