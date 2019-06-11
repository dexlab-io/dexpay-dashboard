import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import dayjs from 'dayjs';

import Loading from '../../../shared/components/Loading';
import TotalProducts from './components/TotalProducts';
import TotalProfit from './components/TotalProfit';
import OrdersToday from './components/OrdersToday';
import RecentOrders from './components/RecentOrders';
// import ProductSales from './components/ProductSales';
import ETH from './components/ETH';
import { deleteNewOrderTableData } from '../../../redux/actions/newOrderTableActions';
import { NewOrderTableProps } from '../../../shared/prop-types/TablesProps';

const query = gql`
  {
    storeStats {
      totalProducts
      totalIncomeFiat
      totalOrders
      ordersToday
    }
    invoices(limit: 8) {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      assetUsed
      status
      createdAt
    }
  }
`;

class ECommerceDashboard extends PureComponent {
  static propTypes = {
    newOrder: NewOrderTableProps.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onDeleteRow = (index, e) => {
    e.preventDefault();
    const arrayCopy = [...this.props.newOrder];
    arrayCopy.splice(index, 1);
    this.props.dispatch(deleteNewOrderTableData(arrayCopy));
  };

  render() {
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">
              Sales Report: {dayjs().format('MMMM YYYY')}
            </h3>
          </Col>
        </Row>
        <Query query={query} fetchPolicy="cache-and-network">
          {({ data, loading, error }) => {
            if (loading && !data.me) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;
            // console.log('dashboard', data);

            return (
              <React.Fragment>
                <Row>
                  <TotalProducts data={data.storeStats} />
                  <TotalProfit data={data.storeStats} />
                  <OrdersToday data={data.storeStats} />
                  <ETH data={data.storeStats} />
                </Row>
                <Row>
                  <RecentOrders invoices={data.invoices} />
                  {/* <ProductSales /> */}
                </Row>
              </React.Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default connect(state => ({ newOrder: state.newOrder.items }))(translate('common')(ECommerceDashboard));
