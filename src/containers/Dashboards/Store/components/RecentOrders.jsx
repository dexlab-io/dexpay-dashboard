import React from 'react';
import { Badge, Table } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Panel from '../../../../shared/components/Panel';

const RecentOrders = ({ t, invoices }) => (
  <Panel lg={12} title={t('dashboard_commerce.recent_orders')}>
    <Table responsive className="table--bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>TX Hash</th>
          <th>Fiat Amount</th>
          <th>Crypto Amount</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.id}>
            <td>
              <a target="_blank" rel="noopener noreferrer" href={`https://app.dexpay.me/invoice/${invoice.invoiceNumber}`}>
                {invoice.invoiceNumber}
              </a>
            </td>
            <td>{invoice.txHash}</td>
            <td>{invoice.fiatAmount} {invoice.fiatCurrency}</td>
            <td>{invoice.cryptoAmount} {invoice.assetUsed}</td>
            <td><Badge color="success">{invoice.status}</Badge></td>
            <td>{dayjs(invoice.createdAt).format('DD/MM/YYYY HH:mm')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Panel>
);

RecentOrders.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(RecentOrders);
