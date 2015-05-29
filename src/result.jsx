'use strict';

import React from 'react';
import { PieChart } from 'react-d3-components';

class Result extends React.Component {
  render() {
    const result = this.props.result;

    function renderPie(choices, votes) {
      if (!votes || !votes.length) { return null; }
      const votesWithLabels = votes.map((v, idx) => {
        return {
          x: choices[idx],
          y: v
        };
      }).filter(obj => obj.y); // only non-zero

      const pieChartOptions = {
        data: { values: votesWithLabels },
        width: 600,
        height: 400,
        sort: null
      };
      return <PieChart {...pieChartOptions} />;
    }

    return (
        <div className="result" key={result.id}>
          <h3>Result</h3>
          { result.question }
          <ol>
            { result.choices.map((c, i) =>
              <li key={i}>{c} ({ result.votes[i] || 0 })</li>) }
          </ol>
          Votes: { result.votes.reduce((acc, x) => acc + x, 0) }
          { renderPie(result.choices, result.votes) }
        </div>
    );
  }
}

export default Result;
