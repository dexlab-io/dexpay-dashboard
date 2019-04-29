import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import OrderCreateForm from './OrderCreateForm';

const createInvoiceMutation = gql`
  mutation createInvoice($fiatAmount: String!, $fiatCurrency: String!, $invoiceType: InvoiceType!) {
    createInvoice(
      input: { fiatAmount: $fiatAmount, fiatCurrency: $fiatCurrency, invoiceType: $invoiceType }
    ) {
      id
      invoiceNumber
      fiatAmount
      fiatCurrency
      store {
        name
        walletAddress
      }
    }
  }
`;

class OrderCreateCard extends React.Component {
  onSuccess = (cache, { data: { createInvoice } }) => {
    swal({
      icon: 'info',
      title: 'Invoice created',
      button: {
        text: 'Get URL'
      }
    }).then(() => {
      const win = window.open(
        `https://app.dexpay.me/invoice/${createInvoice.invoiceNumber}`,
        '_blank'
      );
      this.props.history.push();
      win.focus();
    });
  };

  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Main Information</h5>
            </div>
            <Mutation
                mutation={createInvoiceMutation}
                update={this.onSuccess}
                onError={() => {
                  swal(
                    'Issue!',
                    'Please fill in all fields to create a invoice.',
                    'warning'
                  );
                }}
              >
                {createInvoice => (
                  <OrderCreateForm
                    onSubmit={data => {
                      // console.log('login form', data);
                      return createInvoice({
                        variables: {
                          fiatAmount: data.amount.toString(),
                          fiatCurrency: data.currency.value,
                          invoiceType: 'invoice'
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

export default OrderCreateCard;
