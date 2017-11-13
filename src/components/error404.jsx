import React from 'react';

export default class Error404 extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let reason = this.props.reason || 'Not found';
    return (
      <div className="parent-container">
        <div className="game">
          <div className="board-holder">
            <div>Error: {reason}</div>
          </div>
        </div>
      </div>
    );
  }
}
