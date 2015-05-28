'use strict';

import React from 'react';
import Result from './result';
import getFormData from './util/get-form-data';
import httpClient from 'axios';

const ENTER_KEY = 13; // return

class Results extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showAddQuestion: false,
      choices: []
    };
  }
  render() {
    const polls = this.props.polls;
    const choices = this.state.choices;
    const showAdd = this.state.showAddQuestion;
    if (!polls || !polls.length) { return null; }

    const addForm = (showAdd) ?
      (<div>
        <form className="createPoll"
              onSubmit={this.savePoll.bind(this)}
              onReset={this.resetPoll.bind(this)} >
          <label>
            Question:
            <input name="question" required="true"
                   autoFocus="true"
                   onKeyDown={this.questionKeyDown.bind(this)} />
          </label>
          <label>Choices:</label>
          <ol>
            { choices.map((x, idx) => <li key={idx}>{x}</li>) }
            <li>
              <input key={choices.length + 1} name="choice"
                     ref="choice"
                     onKeyDown={this.choiceKeyDown.bind(this)} />
              <button type="button" onClick={this.addChoice.bind(this)}>Add</button>
            </li>
          </ol>
          <div>
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
          </div>
        </form>
        <hr/>
      </div>) :
      null;

    return (
      <div className="admin">
        <button type="button" onClick={this.toggleAddVis.bind(this)}>
          { (showAdd) ? 'Hide Form' : 'Add Poll' }
        </button>
        { addForm }
        <div className="toc">
          <h3>Surveys</h3>
          <ol>
            { polls.map(x => (
              <li key={x.id}>
                <a href={ `#${x.id}` }>{ x.question }</a>
              </li> )) }
          </ol>
        </div>
        <div className="results">
          <h2>All Results</h2>
          { polls.map(x => (
            <div key={x.id}>
              <a name={x.id}/>
              <Result result={x} />
              <hr/>
            </div> )) }
        </div>
      </div>
    );
  }
  toggleAddVis(e) {
    this.setState({ showAddQuestion: !this.state.showAddQuestion });
  }
  addChoice(e) {
    const choiceNode = React.findDOMNode(this.refs.choice);
    const val = choiceNode.value;
    if (val) {
      this.setState({ choices: this.state.choices.concat(val) }, () =>
        React.findDOMNode(this.refs.choice).focus());
    }
  }
  savePoll(e) {
    e.preventDefault();
    const formComp = e.target;
    const formData = getFormData(e.target);
    const choices = (formData.choice) ?
                    this.state.choices.concat(formData.choice) :
                    this.state.choices;
    if (formData.question && choices.length > 1) {
      httpClient({
        method: 'post',
        url: '/polls',
        data: {
          question: formData.question,
          choices: choices
        }
      }).then(resp => {
        formComp.reset();
        this.setState({ choices: [] });
      });
    }
  }
  resetPoll(e) {
    this.setState({ choices: [] });
  }

  choiceKeyDown(e) {
    if (e.which === ENTER_KEY) {
      e.preventDefault();
      this.addChoice(e);
    }
  }

  questionKeyDown(e) {
    if (e.which === ENTER_KEY) {
      const choiceNode = React.findDOMNode(this.refs.choice);
      choiceNode.focus();
    }
  }

}

export default Results;
