import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import OrderEditForm from './OrderEditForm';

const updateInvoiceMutation = gql`
  mutation updateInvoice(
    $id: ID!,
    $fiatAmount: String,
    $fiatCurrency: String,
    $cryptoAmount: Int,
    $status: InvoiceStatus
  ) {
    updateInvoice(
      id: $id,
      input: {
        fiatAmount: $fiatAmount,
        fiatCurrency: $fiatCurrency,
        cryptoAmount: $cryptoAmount,
        status: $status
      }
    ) {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      status
      createdAt
    }
  }
`;

const OrderCard = ({ invoice }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Main Information</h5>
        </div>
        <Mutation
          mutation={updateInvoiceMutation}
          update={() => {
            swal("Invoice updated!");
          }}
          onError={error => {
            swal(
              'Issue!',
              error.message.replace('GraphQL error: ', ''),
              'warning'
            );
          }}
        >
          {updateInvoice => (
            <OrderEditForm
              enableReinitialize
              initialValues={invoice}
              onSubmit={({fiatAmount, cryptoAmount, status, ...data}) => {
                // console.log('login form', data);
                return updateInvoice({
                  variables: {
                    id: invoice.id,
                    fiatAmount: fiatAmount.toString(),
                    cryptoAmount: parseFloat(cryptoAmount),
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

export default OrderCard;
