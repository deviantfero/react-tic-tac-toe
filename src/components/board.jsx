import React from 'react';
import _ from 'lodash';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.updateCell   = this.updateCell.bind(this);
    this.setupBoard   = this.setupBoard.bind(this);
    this.restartBoard = this.restartBoard.bind(this);


    this.state = {
      turn: 0,
      currentShape: true,
      games: 0,
      disableAll: false,
      board: this.setupBoard(),
    };
  }

  updateCell(i, j) {
    return (evt) => {
      let newBoard = [... this.state.board];
      newBoard[i][j].value = this.state.currentShape ? 'X' : 'O';
      newBoard[i][j].disabled = true;
      console.log(newBoard[i]);

      this.setState({
          currentShape: !this.state.currentShape,
          board: newBoard
      })
    }
  }

  restartBoard() {
    this.setState({
        turn: 0,
        currentShape: true,
        disableAll: false,
        board: this.setupBoard(),
    })
  }

  setupBoard() {
    let board = Array(this.props.rows);
    return _.map(board, (row) => {
      let col = [];
      for(let i = 0; i < this.props.cols; i++) {
        col.push({
            value: '',
            disabled: false
        });
      }
      return col;
    });
  }

  render() {
    let vBoard = _.map(this.state.board, (row, i) => {
      return (
        <div key={"rowi-" + i} className="row-container">{
          _.map(row, (col, j) => {
            return (
              <button 
                style={{pointerEvents: col.disabled ? 'none' : 'initial'}}
                className="tic-cell"
                key={"case-" + j} 
                onClick={this.updateCell(i, j)}>
                  {col.value}
              </button>
            );
          })
        }</div>
      );
    });

    return (
      <div>
        {vBoard}
      </div>
    );
  }
}
