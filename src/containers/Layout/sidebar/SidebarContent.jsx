import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Dashboard" icon="home" route="/dashboard" onClick={this.hideSidebar} />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Manage store" icon="cart">
            <SidebarLink title="Products List" route="/store/products" onClick={this.hideSidebar} />
            <SidebarLink title="Transaction List" route="/store/orders" onClick={this.hideSidebar} />
            {/* <SidebarLink title="Cart" route="/e-commerce/cart" onClick={this.hideSidebar} />
            <SidebarLink title="Catalog" route="/e-commerce/catalog" onClick={this.hideSidebar} />
            <SidebarLink title="Payment" route="/e-commerce/payment" onClick={this.hideSidebar} />
            <SidebarLink title="Product Edit" route="/store/product_edit" onClick={this.hideSidebar} />
            <SidebarLink title="Product Page" route="/e-commerce/product_page" onClick={this.hideSidebar} /> */}
          </SidebarCategory>
          {/* <SidebarCategory title="Support" icon="file-empty">
            <SidebarLink title="FAQs" route="/default_pages/faq" onClick={this.hideSidebar} />
          </SidebarCategory> */}
        </ul>
        <ul className="sidebar__block">
          <SidebarLink title="Log Out" icon="exit" route="/login" />
        </ul>
        {/* <ul className="sidebar__block">
          <SidebarLink
            title="Documentation"
            icon="text-align-justify"
            route="/documentation/introduction"
            onClick={this.hideSidebar}
          />
        </ul> */}
      </div>
    );
  }
}

export default SidebarContent;
