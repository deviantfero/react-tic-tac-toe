import React from 'react';
import _ from 'lodash';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.updateCell       = this.updateCell.bind(this);
    this.setupBoard       = this.setupBoard.bind(this);
    this.restartBoard     = this.restartBoard.bind(this);
    this.countBoardValues = this.countBoardValues.bind(this);


    this.state = {
      winner: null,
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
        winner: null,
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

  countBoardValues(val, orientation) {
    if(orientation === 'rows') {
      return _.map(this.state.board, (row) => {
        return _.reduce(row, (sum, cel) => {
          return cel.value === val ? sum + 1 : sum;
        }, 0)
      });
    } else if(orientation === 'cols') {
      let colCount = [];
      let ocurrence = 0;
      for(let i = 0; i < this.props.cols; i++) {
        for(let j = 0; j < this.props.rows; j++) {
          ocurrence += this.state.board[j][i].value === val ? 1 : 0;
        }
        colCount.push(ocurrence);
        ocurrence = 0;
      }
      return colCount;
    } else if(orientation === 'diagonal') {
      let ocurrence = 0;
      let diaCount = []
      for(let i = 0; i < this.props.cols; i++)
        ocurrence += this.state.board[i][i].value === val ? 1 : 0;
      diaCount.push(ocurrence);
      ocurrence = 0;
      for(let i = 0, j = this.props.cols - 1; i < this.props.cols; i++, j--)
        ocurrence += this.state.board[i][j].value === val ? 1 : 0;
      diaCount.push(ocurrence)
      return diaCount;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    /* we only need to check the previous player's score */
    let prevVal = prevState.currentShape ? 'X' : 'O';

    let prevValRowCount = this.countBoardValues(prevVal, 'rows');
    let prevValColCount = this.countBoardValues(prevVal, 'cols');
    let prevValDiaCount = this.countBoardValues(prevVal, 'diagonal');

    let winIndexRow = _.find(prevValRowCount, (val) => val === this.props.cols);
    let winIndexCol = _.find(prevValColCount, (val) => val === this.props.rows);
    let winIndexDia = _.find(prevValDiaCount, (val) => val === this.props.cols);

    if(winIndexCol || winIndexRow || winIndexDia) {
      this.setState({
        disableAll: true,
        winner: prevState.currentShape ? 'X' : 'O',
        games: this.state.games + 1
      });
    }

    console.log(`${prevVal}: ${prevValColCount}`);
    console.log(`${prevVal}: ${prevValRowCount}`);
    console.log(`${prevVal}: ${prevValDiaCount}`);
  }

  render() {
    let vBoard = _.map(this.state.board, (row, i) => {
      return (
        <div key={"rowi-" + i} className="row-container">{
          _.map(row, (col, j) => {
            return (
              <button 
                style={{pointerEvents: (col.disabled || this.state.disableAll) ? 'none' : 'initial'}}
                disabled={col.disabled || this.state.disableAll}
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
      <div className="board-holder">
        {vBoard}
        <button
          className="col-md-10"
          style={{display: this.state.disableAll ? 'initial' : 'none'}}
          onClick={this.restartBoard}>
            Restart Game
        </button>
        { this.state.disableAll ? 
          <h2 className="text-center">The winner is {this.state.winner}</h2> :
          <h2 className="text-center">Its {this.state.currentShape ? 'X' : 'O'}s turn</h2>
        }
      </div>
    );
  }
}
