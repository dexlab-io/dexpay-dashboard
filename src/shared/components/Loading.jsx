import React, { PureComponent } from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends PureComponent {
  render() {
    return (
      <ReactLoading type="spin" />
    );
  }
}
