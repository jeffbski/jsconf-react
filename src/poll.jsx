'use strict';

import React from 'react';
import httpClient from 'axios';
import shuffleArray from 'shuffle-array';
import Result from './result';
import getFormData from './util/get-form-data';

class Poll extends React.Component {
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
          <button onClick={this.nextPoll.bind(this)}>Next survey</button>
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

  nextPoll(e) {
    this.setState({
      result: null,
      polls: this.state.polls.slice(1)
    });
  }

}

export default Poll;
