/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, ButtonToolbar } from 'reactstrap';
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

export default class OrdersListTable extends PureComponent {
  constructor() {
    super();

    this.heads = [
      {
        key: 'invoiceNumber',
        name: 'ID',
        width: 80,
        sortable: true,
      },
      {
        key: 'fiatCurrency',
        name: 'Currency',
        sortable: true,
      },
      {
        key: 'fiatAmount',
        name: 'Amount',
        sortable: true,
      },
      {
        key: 'cryptoAmount',
        name: 'Crypto Amount',
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
        key: 'createdAt',
        name: 'Created At',
        sortable: true,
      },
    ];

    // this.state = {
    //   rows: this.createRows(17),
    //   pageOfItems: [],
    // };
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  // getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
  //   - start.getTime()))).toLocaleDateString();

  // createRows = (numberOfRows) => {
  //   const rows = [];

  //   for (let i = 1; i < numberOfRows + 1; i += 1) {
  //     rows.push({
  //       id: Math.min(99999, Math.round((Math.random() * 99999) + 1000)),
  //       date: this.getRandomDate(new Date(2017, 3, 1), new Date(2018, 3, 1)),
  //       customer_name: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
  //       price: Math.min(1000, (Math.random() * 1000) + 20).toFixed(2),
  //       tax: Math.min(10, Math.random() * 10).toFixed(2),
  //       delivery: Math.min(10, Math.random() * 10).toFixed(2),
  //       quantity: Math.min(5, Math.round((Math.random() * 5) + 1)),
  //       status: ['Enabled', 'Disabled'][Math.floor((Math.random() * 2))],
  //     });
  //   }
  //   return rows;
  // };

  render() {
    const { invoices }=this.props;
    const rows = invoices.map(invoice => {
      return {
        ...invoice,
        edit: invoice.id
      }
    });

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
          <div className="card__title">
              <h5 className="bold-text">Orders List</h5>
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <form className="form">
                  <div className="form__form-group products-list__search">
                    <input placeholder="Search..." name="search" />
                    <MagnifyIcon />
                  </div>
                </form>
                <Link className="btn btn-primary products-list__btn-add" to="/store/order/create">
                  Create new invoice
                </Link>
              </ButtonToolbar>
            </div>
            <EditTable heads={this.heads} rows={rows} />
            <Pagination items={invoices} onChangePage={this.onChangePage} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
