import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

class DefaultTabs extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeTab: '1',
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Col xs={12} md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">{t('ui_elements.tabs.default_tabs')}</h5>
              <h5 className="subhead">Use default tabs</h5>
            </div>
            <div className="tabs">
              <div className="tabs__wrap">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      Sales
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      Statistic
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      Offers
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '4' })}
                      onClick={() => {
                        this.toggle('4');
                      }}
                    >
                      Refounds
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <p>Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment
                      use tolerably dependent listening men. No peculiar in handsome together unlocked do by. Article
                      concern joy anxious did picture sir her. Although desirous not recurred disposed off shy you
                      numerous securing.
                    </p>
                  </TabPane>
                  <TabPane tabId="2">
                    <p>Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment
                      use tolerably dependent listening men. No peculiar in handsome together unlocked do by.
                    </p>
                  </TabPane>
                  <TabPane tabId="3">
                    <p>Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment
                      use tolerably dependent listening men. No peculiar in handsome together unlocked do by.
                    </p>
                  </TabPane>
                  <TabPane tabId="4">
                    <p>Direction has strangers now believing. Respect enjoyed gay far exposed parlors towards. Enjoyment
                      use tolerably dependent listening men. No peculiar in handsome together unlocked do by. Article
                      concern joy anxious did picture sir her.
                    </p>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default translate('common')(DefaultTabs);
