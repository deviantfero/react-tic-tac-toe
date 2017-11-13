import React from 'react';

export default class Error404 extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let reason = this.props.reason || 'Unknown';
    return (
      <div>Content not found, reason was: {reason}</div>
    );
  }
}
