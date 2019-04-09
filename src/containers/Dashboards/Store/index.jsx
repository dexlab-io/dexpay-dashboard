import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TotalProducts from './components/TotalProducts';
import TotalProfit from './components/TotalProfit';
import OrdersToday from './components/OrdersToday';
import RecentOrders from './components/RecentOrders';
import ProductSales from './components/ProductSales';
import ETH from './components/ETH';
import { deleteNewOrderTableData } from '../../../redux/actions/newOrderTableActions';
import { NewOrderTableProps } from '../../../shared/prop-types/TablesProps';

class ECommerceDashboard extends PureComponent {
  static propTypes = {
    newOrder: NewOrderTableProps.isRequired,
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  onDeleteRow = (index, e) => {
    e.preventDefault();
    const arrayCopy = [...this.props.newOrder];
    arrayCopy.splice(index, 1);
    this.props.dispatch(deleteNewOrderTableData(arrayCopy));
  };

  render() {
    const { t } = this.props;

    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{t('dashboard_commerce.page_title')}</h3>
          </Col>
        </Row>
        <Row>
          <TotalProducts />
          <TotalProfit />
          <OrdersToday />
          <ETH />
        </Row>
        <Row>
          <RecentOrders />
          <ProductSales />
        </Row>
      </Container>
    );
  }
}

export default connect(state => ({ newOrder: state.newOrder.items }))(translate('common')(ECommerceDashboard));
