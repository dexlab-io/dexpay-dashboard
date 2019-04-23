/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, ButtonToolbar, ButtonGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import EditTable from '../../../../shared/components/table/EditableTable';

const StatusFormatter = ({ value }) => (
  <span className="badge badge-success">{value}</span>
);

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const DateFormatter = ({ value }) => (
  <span>{dayjs(value).format('DD/MM/YYYY')}</span>
);


const EditFormatter = ({ value }) => (
  <ButtonToolbar>
    <ButtonGroup className="btn-group--icons">
      <Link to={`/store/order/${value}`}>
        <Button outline><span className="lnr lnr-pencil" /></Button>
      </Link>
    </ButtonGroup>
  </ButtonToolbar>
);

export default class OrdersListTable extends PureComponent {
  constructor() {
    super();

    this.heads = [
      {
        key: 'invoiceNumber',
        name: 'Invoice Number',
        width: 210,
        sortable: true,
      },
      {
        key: 'fiatCurrency',
        name: 'Currency',
        sortable: true,
        width: 90,
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
        key: 'createdAt',
        name: 'Created At',
        formatter: DateFormatter,
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
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <Link className="btn btn-primary products-list__btn-add" to="/store/order/create">
                  Create new invoice
                </Link>
              </ButtonToolbar>
            </div>
            {rows.length > 0 && <EditTable heads={this.heads} rows={rows} />}
          </CardBody>
        </Card>
      </Col>
    );
  }
}
