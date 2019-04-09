/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Col, Row, Container } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Technologies from './components/Technologies';
import Demos from './components/Demos';
import Features from './components/Features';
import Purchase from './components/Purchase';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import FeatureRequest from './components/FeatureRequest';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { ThemeProps } from '../../shared/prop-types/ReducerProps';

const logo = `${process.env.PUBLIC_URL}/img/landing/logo_svg.svg`;

class Landing extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    theme: ThemeProps.isRequired,
  };

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
  };

  render() {
    const { theme } = this.props;

    return (
      <div className="landing">
        <div className="landing__menu">
          <Container>
            <Row>
              <Col md={12}>
                <div className="landing__menu-wrap">
                  <p className="landing__menu-logo">
                    <img src={logo} alt="" />
                  </p>
                  <nav className="landing__menu-nav">
                    <button
                      onClick={() => scrollToComponent(this.About, { offset: -50, align: 'top', duration: 1000 })}
                    >
                      About DexPay
                    </button>
                    <button onClick={() => scrollToComponent(this.Features, {
                      offset: -50,
                      align: 'top',
                      duration: 1500,
                    })}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })}
                    >
                      Demos
                    </button>
                    <a
                      className="landing__btn"
                      rel="noopener noreferrer"
                      href="/register"
                    >
                      Join Beta
                    </a>
                  </nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Header onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })} />
        <span ref={(section) => {
          this.About = section;
        }}
        />
        <Technologies />
        <span ref={(section) => {
          this.Features = section;
        }}
        />
        <Features />
        <span ref={(section) => {
          this.Demos = section;
        }}
        />
        <Demos theme={theme} changeToDark={this.changeToDark} changeToLight={this.changeToLight} />
        <span ref={(section) => {
          this.FeatureRequest = section;
        }}
        />
        <FeatureRequest />
        <Testimonials />
        <Purchase />
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({ theme: state.theme }))(Landing);
