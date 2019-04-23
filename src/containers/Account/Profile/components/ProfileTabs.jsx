import React, { PureComponent } from 'react';
import { Card, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import ProfileSettings from './ProfileSettings';

const updateMeMutation = gql`
  mutation updateMe(
    $fullName: String,
    $name: String,
    $websiteUrl: String,
    $taxNumber: String,
    $walletAddress: String,
    $currency: String
  ) {
    updateMe(
      input: {
        fullName: $fullName,
        storeName: $name,
        websiteUrl: $websiteUrl,
        taxNumber: $taxNumber,
        walletAddress: $walletAddress,
        walletCurrency: $currency
      }
    ) {
      id
    }
  }
`;

export default class ProfileTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { user } = this.props;
    // console.log('user', user);

    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <div className="profile__card tabs tabs--bordered-bottom">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Settings
                  </NavLink>
                </NavItem>
              </Nav>
              <Mutation
                mutation={updateMeMutation}
                update={() => {
                  swal("Profile updated!");
                }}
                onError={error => {
                  swal(
                    'Issue!',
                    error.message.replace('GraphQL error: ', ''),
                    'warning'
                  );
                }}
              >
                {updateMe => (
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <ProfileSettings
                        enableReinitialize
                        initialValues={{
                          ...user.profile,
                          ...user.store
                        }}
                        onSubmit={data => {
                          // console.log('login form', data);
                          return updateMe({
                            variables: data
                          });
                        }}
                      />
                    </TabPane>
                  </TabContent>
                )}
              </Mutation>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
}
