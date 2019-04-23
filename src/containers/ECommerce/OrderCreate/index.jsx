import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import OrderCreateCard from './components/OrderCreateCard';

const OrderCreate = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Invoice Create</h3>
      </Col>
    </Row>
    <Row>
      <OrderCreateCard {...props} />
    </Row>
  </Container>
);

export default OrderCreate;
