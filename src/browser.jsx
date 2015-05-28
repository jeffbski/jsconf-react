'use strict';

import './util/polyfill'; // first import polyfills
import React from 'react';
import Result from './result';
import httpClient from 'axios';
import shuffleArray from 'shuffle-array';
import getFormData from './util/get-form-data';

/*
  Example which fetches a list of items from a REST api
  and renders it to the screen. Also logs and renders
  renders the error message if one occurs.
 */

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      polls: shuffleArray(this.props.polls),
      result: null
    };
  }

  render() {
    const result = this.state.result;
    const firstPoll = this.state.polls[0];

    // once we have a poll result display it
    if (result) {
      const resultAndPoll = {
        id: firstPoll.id,
        question: firstPoll.question,
        choices: firstPoll.choices,
        votes: result.votes
      };
      return (
        <div>
          <Result result={resultAndPoll} />
        </div>
      );
    }

    // else if no poll, display message
    if (!firstPoll) {
      return (
        <div>No more polls</div>
      );
    }

    // otherwise display first poll
    return (
      <form className="poll" onSubmit={this.vote.bind(this)}>
        <label>{firstPoll.question}</label>
        { firstPoll.choices.map((x, idx) => (
          <label key={idx}>
          <input type="radio"
          name={firstPoll.id}
          value={idx}
          required="true" />
          {x}
          </label>
         )) }
          <button type="submit">Vote</button>
      </form>
    );
  }

  vote(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const id = Object.keys(formData)[0];
    httpClient({ method: 'post', url: `/polls/${id}`, data: formData })
                              .then(resp => {
                                this.setState({ result: resp.data });
                              });
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
