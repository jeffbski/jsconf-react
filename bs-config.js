'use strict';

var anyBody = require('body/any');
var Immutable = require('immutable');
var shortid = require('shortid');

var pollResults = Immutable.fromJS({});
var polls = Immutable.List();
var PollRecord = Immutable.Record({
  id: null,
  question: '',
  choices: []
});

polls = polls.push(new PollRecord({
  "id": "p1",
  "question": "What is 1 + 1?",
  "choices": [
    "one",
    "two"
  ]
}));

polls = polls.push(new PollRecord({
  "id": "p2",
  "question": "What is 2 + 2?",
  "choices": [
    "three",
    "four"
  ]
}));

function getPolls(req, res, next) {
  if (req.method === 'GET' && req.url === '/polls') {
    var retObj = {
      polls: polls.toJS()
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(retObj));
  }
  next();
}

function addPoll(req, res, next) {
  if (req.method === 'POST' && req.url === '/polls') {
    return anyBody(req, res, function (err, body) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.end('err: ' + err.toString());
      }
      body.id = shortid.generate();
      polls = polls.push(Immutable.fromJS(body));
      var retObj = {
        added: {
          id: body.id
        }
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(retObj));
    });
  }
  next();
}

function vote(req, res, next) {
  var url = req.url;
  var m = /^\/polls\/(.+)$/.exec(url);
  if (m) {
    return anyBody(req, res, function (err, body) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.end('err: ' + err.toString());
      }
      var id = m[1];
      var choiceIdx = body[id];
      // store vote
      pollResults = pollResults.update(id, Immutable.List(), function (pollResult) {
        return pollResult.update(choiceIdx, 0, function (prev) {
          return (prev || 0) + 1;
        });
      });
      // respond with aggregate
      var retObj = {
        votes: pollResults.get(id)
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(retObj));
    });
  }
  next();
}

function results(req, res, next) {
  if (req.url === '/admin/polls') {
    var pollsAndResults = polls.reduce(function (accum, poll) {
      poll = poll.toJS();
      poll.votes = pollResults.get(poll.id, []);
      accum.push(poll);
      return accum;
    }, []);
    var retObj = {
      polls: pollsAndResults
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(retObj));
  }
  next();
}


module.exports = {
  browser: ['google chrome'],
  // browser: ['google chrome canary'],
  port: 3005,
  // proxy: 'localhost:3000',
  // reloadDelay: 1000,
  files: [
    'public/*.html',
    'public/*.json',
    'dist/bundle.js',
    'dist/site.min.css'],
  server: {
    baseDir: './public',
    routes: {
      '/dist': './dist'
    },
    middleware: [getPolls, addPoll, vote, results]
  }
};
