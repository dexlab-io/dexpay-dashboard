import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductEditCard from './components/ProductEditCard';
import Loading from '../../../shared/components/Loading';

const query = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      details
      price
      status
    }
  }
`;

const ProductEdit = ({match}) => {
  const { id } = match.params;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Product Edit</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                information
          </h3>
        </Col>
      </Row>
      <Row>
        <Query query={query} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return `Error!: ${error}`;
            // console.log('data',data)

            return <ProductEditCard product={data.product} />;
          }}
        </Query>
      </Row>
    </Container>
  )
};

export default ProductEdit;
