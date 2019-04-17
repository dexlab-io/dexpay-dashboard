/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { ButtonToolbar, ButtonGroup, Button, Card, CardBody, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

import EditTable from '../../../../shared/components/table/EditableTable';
import Pagination from '../../../../shared/components/pagination/Pagination';

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
      <Button outline><span className="lnr lnr-trash" /></Button>
    </ButtonGroup>
  </ButtonToolbar>
);

export default class ProductsListTable extends PureComponent {
  constructor() {
    super();

    this.heads = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        sortable: true,
      },
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
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  render() {
    const { products }=this.props;
    const rows = products.map(product => {
      return {
        ...product,
        edit: product.id
      }
    });

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="products-list">
            <div className="card__title">
              <h5 className="bold-text">Products List</h5>
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <form className="form">
                  <div className="form__form-group products-list__search">
                    <input placeholder="Search..." name="search" />
                    <MagnifyIcon />
                  </div>
                </form>
                <Link className="btn btn-primary products-list__btn-add" to="/store/products/create">
                  Add new product
                </Link>
              </ButtonToolbar>
            </div>
            <EditTable heads={this.heads} rows={rows} enableRowSelect />
            <Pagination items={products} onChangePage={this.onChangePage} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
