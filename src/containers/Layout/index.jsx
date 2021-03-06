/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotificationSystem from 'rc-notification';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import { BasicNotification } from '../../shared/components/Notification';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';
import { CustomizerProps, SidebarProps } from '../../shared/prop-types/ReducerProps';
import Loading from '../../shared/components/Loading';

const query = gql`
  {
    me {
      id
      email
      profile {
        fullName
      }
      store {
        name
      }
    }
  }
`;

let notification = null;

const showNotification = () => {
  notification.notice({
    content: <BasicNotification
      title="👋 Welcome to the Dexpay!"
      message="Have a look around and check the FAQ in case you need help!"
    />,
    duration: 5,
    closable: true,
    style: { top: 0, left: 'calc(100vw - 100%)' },
    className: 'right-up',
  });
};

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
  };

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notification = n);
    // setTimeout(() => showNotification(), 700);
  }

  componentWillUnmount() {
    if (notification) {
      notification.destroy();
    }
  }

  changeSidebarVisibility = () => {
    this.props.dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    this.props.dispatch(changeMobileSidebarVisibility());
  };

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
  };

  toggleTopNavigation = () => {
    this.props.dispatch(toggleTopNavigation());
  };

  changeBorderRadius = () => {
    this.props.dispatch(changeBorderRadius());
  };

  toggleBoxShadow = () => {
    this.props.dispatch(toggleBoxShadow());
  };

  render() {
    const { customizer, sidebar } = this.props;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
      'layout--top-navigation': customizer.topNavigation,
    });

    return (
      <Query query={query} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (loading && !data.me) return <Loading />;
          if (error) return <p>Error: {error.message}</p>;
          // console.log('me', data.me);

          return (
            <div className={layoutClass}>
              {this.props.customizer.topNavigation ?
                <TopbarWithNavigation
                  changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
                /> :
                <Topbar
                  changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
                  changeSidebarVisibility={this.changeSidebarVisibility}
                  user={data.me}
                />
              }
              {this.props.customizer.topNavigation ?
                <SidebarMobile
                  sidebar={sidebar}
                  changeToDark={this.changeToDark}
                  changeToLight={this.changeToLight}
                  changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
                /> :
                <Sidebar
                  sidebar={sidebar}
                  changeToDark={this.changeToDark}
                  changeToLight={this.changeToLight}
                  changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
                />
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme,
}))(Layout));
