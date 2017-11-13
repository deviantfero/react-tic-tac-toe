import React from 'react';
import Board from './board.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.updateBoard = this.updateBoard.bind(this);
    this.startGame = this.startGame.bind(this);

    this.state = {
      rows: 3,
      game: false,
    };
  }

  updateBoard() {
    return (evt) => {
      let val = parseInt(evt.target.value);
      if(!isNaN(val) && val > 2) {
        this.setState({
          rows: parseInt(evt.target.value)
        });
      }
    };
  }

  startGame() {
    this.setState({
      game: true
    });
  }

  render() {
    let board = this.state.game ? <Board cols={this.state.rows} rows={this.state.rows}/> : null;
    return (
      <div className="parent-container">
        <div className="game">
          <div className="board-container">
            <div>
              <h1 className="text-center">{this.state.rows} x {this.state.rows} Tic Tac Toe</h1>
              <div className="col-md-12" style={{display: this.state.game ? 'none' : 'initial'}}>
              <form action={"/play/" + this.state.rows} method="GET">
                  <input type="number" 
                    className="text-center"
                    value={this.state.rows} 
                    onChange={this.updateBoard()}/>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
