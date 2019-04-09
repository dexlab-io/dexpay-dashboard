import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const background = `${process.env.PUBLIC_URL}/img/landing/header_bg.png`;
const img = `${process.env.PUBLIC_URL}/img/landing/ipad_demo.png`;

const Header = ({ onClick }) => (
  <div className="landing__header" style={{ backgroundImage: `url(${background})` }}>
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="landing__header-title">
            <b> DexPay POS</b> for your retail store
          </h2>
          <p className="landing__header-subhead">The Stable Currency Poin of Sale for the Ethereum network.</p>
          <Link className="landing__btn landing__btn--header" to="/documentation/introduction" target="_blank">
            Check out the docs
          </Link>
          <button className="landing__btn landing__btn--header" onClick={onClick}>
            Go to the app
          </button>
          <img className="landing__header-img" src={img} alt="macbook" />
        </Col>
      </Row>
    </Container>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
