import React from 'react';
import _ from 'lodash';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let board = Array(this.props.rows).fill(Array(this.props.cols).fill(false));

    this.state = {
      turn: 0,
      currentShape: 'X',
      games: 0,
      disableAll: false,
      board,
    };
  }

  render() {
    let vBoard = _.map(this.state.board, (row, i) => {
      return (
        <div key={"rowi-" + i} className="row-container">{
          _.map(row, (col, j) => {
            return (<div key={"case-" + j}>no</div>);
          })
        }</div>
      );
    });

    console.log(vBoard);

    return (
      <div>
        {vBoard}
      </div>
    );
  }
}
