/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, ButtonToolbar, ButtonGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import EditTable from '../../../../shared/components/table/EditableTable';

const deleteInvoiceMutation = gql`
  mutation deleteInvoice($id: ID!) {
    deleteInvoice(id: $id)
  }
`;

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
      &nbsp;
      <Mutation
        mutation={deleteInvoiceMutation}
        update={() => {
          swal("Invoice deleted!");
        }}
        onError={error => {
          swal(
            'Issue!',
            error.message.replace('GraphQL error: ', ''),
            'warning'
          );
        }}
      >
        {deleteInvoice => (
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
                      deleteInvoice({
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
            <EditTable heads={this.heads} rows={rows} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
