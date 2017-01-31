'use strict';

import React from 'react';
import Diff from './Diff';

class App extends React.Component {
  constructor(props) {
    super();
    this.renderDiff = this.renderDiff.bind(this);

    this.state = {
      diffs: props.initialRows
    };
  }

  renderDiff(diff, i) {
    // TODO: convert to component
    return (
      <Diff diff={diff} key={i} />
    );
  }

  render() {
    return(
      <div className="App">
        {this.state.diffs.map(this.renderDiff)}
      </div>
    );
  }
};

export default App

