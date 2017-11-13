import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game.jsx';
import Board from './components/board.jsx';
import Error404 from './components/error404.jsx';
import createHistory from 'history/createBrowserHistory';

require("./main.sass");

function renderComponent(component) {
  ReactDOM.render(
    component,
    document.getElementById('app')
  );
}

function render(location) {
  let args = location.pathname.split('/');
  let params = {};
  console.log(args.length);
  if(location.pathname === '/') {
    renderComponent(<Game/>);
  } else if(args.length > 2 && args[1] === 'play') {
    let val = parseInt(args[2]);
    if(!isNaN(val) && val > 2) {
      renderComponent(<Board cols={val} rows={val}/>);
    } else {
      renderComponent(<Error404 reason={"wrong route for board :) enter /play/{valid number > 3}"}/>);
    }
  } else {
    renderComponent(<Error404/>);
  }
}

const history = createHistory();
render(history.location);
history.listen(render);
