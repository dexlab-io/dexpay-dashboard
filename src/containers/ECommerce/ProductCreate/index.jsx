import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductCreateCard from './components/ProductCreateCard';

const ProductCreate = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Product Create</h3>
      </Col>
    </Row>
    <Row>
      <ProductCreateCard {...props} />
    </Row>
  </Container>
);

export default ProductCreate;
