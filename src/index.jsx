import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game.jsx';
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
  if(location.pathname === '/') {
    renderComponent(<Game/>);
  } else {
    renderComponent(<Error404/>);
  }
}

const history = createHistory();
render(history.location);
history.listen(render);
