'use strict';

import './util/polyfill'; // first import polyfills
import React from 'react';
import httpClient from 'axios';
import shuffleArray from 'shuffle-array';

/*
  Example which fetches a list of items from a REST api
  and renders it to the screen. Also logs and renders
  renders the error message if one occurs.
 */

class App extends React.Component {
  render() {
    const polls = this.props.polls;
    const shuffledPolls = shuffleArray(polls);
    const firstPoll = shuffledPolls[0];
    return (
      <div>
        <h2>All Polls</h2>
        <ul>
          { polls.map(poll =>
            <li key={poll.id}>{poll.question}</li>) }
        </ul>
        <h2>First poll</h2>
        <div>Question: { firstPoll.question }</div>
        <ol>
          { firstPoll.choices.map((choice, idx) => (
            <li key={idx}>{ choice }</li> )) }
        </ol>
        <div className="devHelp">(REST data fetched and rendered in src/browser.jsx)</div>
      </div>
    );
  }
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

function fetchData() {
  return httpClient({ url: '/polls' });
}

function fetchDataAndRender() {
  fetchData()
    .then(resp => render(resp.data))
    .catch(err => {
      console.error(err);
      renderError(err);
    });
}

fetchDataAndRender();
