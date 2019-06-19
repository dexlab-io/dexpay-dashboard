import React, { PureComponent } from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends PureComponent {
  render() {
    const { color } = this.props;

    return (
      <ReactLoading type="spin" color={color || '#fff'} />
    );
  }
}
