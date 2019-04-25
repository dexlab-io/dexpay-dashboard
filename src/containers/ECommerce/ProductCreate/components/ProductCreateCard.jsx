import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Loading from '../../../../shared/components/Loading';
import ProductEditForm from '../../ProductEdit/components/ProductEditForm';

const query = gql`
  query Me {
    me {
      store {
        currency
      }
    }
  }
`;

const createProductMutation = gql`
  mutation createProduct(
    $title: String,
    $details: String,
    $price: Float,
    $priceCurrency: String,
    $status: ProductStatus
  ) {
    createProduct(
      input: {
        title: $title,
        details: $details,
        price: $price,
        priceCurrency: $priceCurrency,
        status: $status
      }
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
            <Query query={query} fetchPolicy="cache-and-network">
              {({ loading, error, data: queryData }) => {
                if (loading) return <Loading />;
                if (error) return `Error!: ${error}`;
                // console.log('data', queryData)

                return (
                  <Mutation
                    mutation={createProductMutation}
                    update={() => {
                      history.push(`/store/products`);
                    }}
                    onError={() => {
                      swal(
                        'Issue!',
                        'Please fill in all fields to create a product.',
                        'warning'
                      );
                    }}
                  >
                    {createProduct => (
                      <ProductEditForm
                        initialValues={{ status:'active' }}
                        onSubmit={({price, status, ...data}) => {
                          // console.log('login form', data);
                          return createProduct({
                            variables: {
                              price: parseFloat(price),
                              status: status ? status.value : '',
                              priceCurrency: queryData.me.store.currency,
                              ...data
                            }
                          });
                        }}
                      />
                    )}
                  </Mutation>
                );
              }}
            </Query>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ProductCreateCard;
