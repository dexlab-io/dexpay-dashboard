import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import ProductEditForm from './ProductEditForm';

const updateProductMutation = gql`
  mutation updateProduct($id: ID!, $title: String, $details: String, $price: Float, $status: ProductStatus) {
    updateProduct(
      id: $id,
      input: { title: $title, details: $details, price: $price, status: $status  }
    ) {
      id
      title
      details
      price
      status
    }
  }
`;

const PaymentCard = ({ product }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Main Information</h5>
        </div>
        <Mutation
          mutation={updateProductMutation}
          update={() => {
            swal("Product updated!");
          }}
          onError={error => {
            swal(
              'Issue!',
              error.message.replace('GraphQL error: ', ''),
              'warning'
            );
          }}
        >
          {updateProduct => (
            <ProductEditForm
              enableReinitialize
              initialValues={product}
              onSubmit={data => {
                // console.log('login form', data);
                return updateProduct({
                  variables: {
                    id: product.id,
                    ...data
                  }
                });
              }}
            />
          )}
        </Mutation>
      </CardBody>
    </Card>
  </Col>
);

export default PaymentCard;
