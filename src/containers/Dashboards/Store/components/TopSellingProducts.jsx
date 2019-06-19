/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';

const style = {
  left: 0,
  width: 150,
  lineHeight: '24px',
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {
      payload.map((entry, index) => (
        <li key={`item-${index}`}><span style={{ backgroundColor: entry.color }} />{entry.value}</li>
      ))
    }
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    vslue: PropTypes.string,
  })).isRequired,
};

const TopSellingProducts = ({ t, products }) => {
  if (products.length === 0) {
    return null;
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const data = products.map(product => ({
    name: product.title, value: product.count, fill: getRandomColor()
  }));

  return (
    <Panel lg={12} xl={12} md={12} xs={12} title={t('dashboard_commerce.top_selling_products')}>
      <ResponsiveContainer className="dashboard__chart-pie dashboard__chart-pie--commerce" height={360}>
        <PieChart className="dashboard__chart-pie-container">
          <Tooltip />
          <Pie data={data} dataKey="value" cy={180} innerRadius={130} outerRadius={160} label />
          <Legend layout="vertical" verticalAlign="bottom" wrapperStyle={style} content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </Panel>
  );
}

TopSellingProducts.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(TopSellingProducts);
