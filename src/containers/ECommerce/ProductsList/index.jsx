import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProductsListTable from './components/ProductsListTable';
import Loading from '../../../shared/components/Loading';

const query = gql`
  {
    products {
      id
      title
      details
      price
      status
    }
  }
`;

const ProductsList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Products List</h3>
        <h3 className="page-subhead subhead">
          Easiliy add, edit or remove your products.
        </h3>
      </Col>
    </Row>
    <Row>
      <Query query={query} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
            if (loading && !data.products) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;
            // console.log('products', data.products);

            return (
              <ProductsListTable products={data.products} />
            );
          }}
      </Query>
    </Row>
  </Container>
);

export default ProductsList;
