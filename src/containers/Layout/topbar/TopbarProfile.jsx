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
    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          <p className="topbar__avatar-name">Alessio Delmonti</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Store Profile" icon="user" path="/account/profile" />
            <div className="topbar__menu-divider" />
            <TopbarMenuLink title="Account Settings" icon="cog" path="/account/profile" />
            <TopbarMenuLink title="Lock Screen" icon="lock" path="/lock_screen" />
            <TopbarMenuLink title="Log Out" icon="exit" path="/log_in" />
          </div>
        </Collapse>
      </div>
    );
  }
}
