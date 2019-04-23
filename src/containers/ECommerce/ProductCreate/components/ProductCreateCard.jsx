import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import ProductEditForm from '../../ProductEdit/components/ProductEditForm';

const createProductMutation = gql`
  mutation createProduct($title: String, $details: String, $price: Float, $status: ProductStatus) {
    createProduct(
      input: { title: $title, details: $details, price: $price, status: $status }
    ) {
      id
    }
  }
`;

class ProductCreateCard extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Main Information</h5>
            </div>
            <Mutation
                mutation={createProductMutation}
                update={(cache, { data: { createProduct } }) => {
                  history.push(`/store/product/${createProduct.id}`);
                }}
                onError={error => {
                  swal(
                    'Issue!',
                    error.message.replace('GraphQL error: ', ''),
                    'warning'
                  );
                }}
              >
                {createProduct => (
                  <ProductEditForm
                    onSubmit={({price, status, ...data}) => {
                      // console.log('login form', data);
                      return createProduct({
                        variables: {
                          price: parseFloat(price),
                          status: status.value,
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
  }
}

export default ProductCreateCard;
