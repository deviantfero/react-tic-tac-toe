import React from 'react';
import Board from './board.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.updateBoard = this.updateBoard.bind(this);
    this.startGame = this.startGame.bind(this);

    this.state = {
      rows: 3,
      cols: 3,
      game: false,
    };
  }

  updateBoard(which) {
    return (evt) => {
      this.setState({
        [which]: parseInt(evt.target.value)
      });
    };
  }

  startGame() {
    this.setState({
      game: true
    });
  }

  render() {
    console.log(this.state.rows, this.state.cols);
    let board = this.state.game ? <Board cols={this.state.cols} rows={this.state.rows}/> : null;
    return (
      <div>
        <h1>{this.state.cols} x {this.state.rows}</h1>
        <input type="number" 
          style={{display: this.state.game ? 'none' : 'initial'}}
          value={this.state.cols} 
          onChange={this.updateBoard("cols")}/>
        <input type="number" 
          style={{display: this.state.game ? 'none' : 'initial'}}
          value={this.state.rows} 
          onChange={this.updateBoard("rows")}/>
        <button 
          style={{display: this.state.game ? 'none' : 'initial'}}
          type="button" 
          onClick={this.startGame}>
          Start Game
        </button>
        {board}
      </div>
    );
  }
}
