/* eslint-disable react/no-unused-state */
import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Card, CardBody, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import EditTable from '../../../../shared/components/table/EditableTable';

const deleteProductMutation = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const StatusFormatter = ({ value }) => (
  <span className="badge badge-success">{value}</span>
);

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const EditFormatter = ({ value }) => (
  <ButtonToolbar>
    <ButtonGroup className="btn-group--icons">
      <Link to={`/store/product/${value}`}>
        <Button outline><span className="lnr lnr-pencil" /></Button>
      </Link>
      &nbsp;
      <Mutation
        mutation={deleteProductMutation}
        update={() => {
          swal("Product deleted!");
        }}
        onError={error => {
          swal(
            'Issue!',
            error.message.replace('GraphQL error: ', ''),
            'warning'
          );
        }}
      >
        {deleteProduct => (
          <Button
            outline
            onClick={() => {
              return swal("Are you sure you want to do this?", {
                buttons: {
                  cancel: "No",
                  catch: {
                    text: "Yes, delete!",
                    value: "delete",
                  },
                }
              })
              .then((val) => {
                  switch (val) {
                    case "delete":
                      deleteProduct({
                        variables: {
                          id: value
                        }
                      });
                      break;
                  }
              });
            }}>
            <span className="lnr lnr-trash" />
          </Button>
        )}
      </Mutation>
    </ButtonGroup>
  </ButtonToolbar>
);

export default class ProductsListTable extends React.Component {
  constructor() {
    super();

    this.heads = [
      {
        key: 'title',
        name: 'Name',
        sortable: true,
      },
      {
        key: 'price',
        name: 'Price',
        sortable: true,
      },
      {
        key: 'priceCurrency',
        name: 'Price Currency',
        sortable: true,
      },
      {
        key: 'status',
        name: 'Status',
        sortable: true,
        formatter: StatusFormatter,
        width: 110,
      },
      {
        key: 'edit',
        name: 'Actions',
        sortable: false,
        formatter: EditFormatter,
      },
    ];

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.loadProducts();
    }
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  loadProducts() {
    const { products } = this.props;
    const rows = products.map(product => {
      return {
        ...product,
        edit: product.id
      }
    });
    this.setState({ products: rows });
  }

  render() {
    const { products } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="products-list">
            <div className="card__title">
              <h5 className="bold-text">Products List</h5>
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link className="btn btn-primary products-list__btn-add" to="/store/product/create">
                  Add new product
                </Link>
              </ButtonToolbar>
            </div>
            <EditTable heads={this.heads} rows={products} enableRowSelect />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
