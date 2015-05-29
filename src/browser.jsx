'use strict';

import './util/polyfill'; // first import polyfills
import React from 'react';
import httpClient from 'axios';
import Poll from './poll';
import Results from './results';

/*
  Example which fetches a list of items from a REST api
  and renders it to the screen. Also logs and renders
  renders the error message if one occurs.
 */

let isAdmin = (window.location.pathname === '/admin.html');

class App extends React.Component {
  render() {
    const polls = this.props.polls;
    const pollOrResults = (isAdmin) ?
      <Results polls={polls} /> :
      <Poll polls={polls} />;
    return (
      <div className="pollDiv">
        { pollOrResults }
      </div>
    );
  }
}

function fetchDataAndRender() {
  fetchData()
    .then(resp => render(resp.data))
    .catch(err => {
      console.error(err);
      renderError(err);
    });
}

function fetchData() {
  const url = (isAdmin) ?
              '/admin/polls' :
              '/polls';
  return httpClient({ url: url });
}


const appContainerDiv = document.querySelector('#appContainer');

function render(data) {
  React.render(<App polls={data.polls} />, appContainerDiv);
}

function renderError(err) {
  const errMsg = (err.statusText) ?
                 `Error: ${err.data} - ${err.statusText}` :
                 err.toString();
  React.render(<div>{errMsg}</div>, appContainerDiv);
}


fetchDataAndRender();

if (isAdmin) { setInterval(fetchDataAndRender, 1000); }
