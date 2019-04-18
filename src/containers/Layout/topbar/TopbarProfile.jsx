import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';

export default class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { user } = this.props;

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle} type="button">
          <p className="topbar__avatar-name">{user.profile.fullName}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} type="button" />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Store Profile" icon="user" path="/account/profile" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title="Log Out" icon="exit" path="/login" />
          </div>
        </Collapse>
      </div>
    );
  }
}
