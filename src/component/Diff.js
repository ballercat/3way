'use strict';

import React from 'react';
import Utils from '../utils';
import Change from './ChangeComponent';

const {
  splitLines,
  prop: {
    get: {
      value,
      removed,
      added
    }
  }
} = Utils;


class Diff extends React.Component {

  constructor(props) {
    debugger;
    super(props);
    this.state = props;
  }

  renderChange(change) {
    return (
      splitLines(change.value).map(
        (line, i) => line ?
          <Change key={i} line={line} change={change} /> :
          null
        )
    );
  }

  className() {
    return `${this.state.css.inner} ${this.renderType(this.state)}`;
  }

  render() {
    return(
      <table className="Diff">
        <tbody>
          {this.state.diff.diff.map(this.renderChange)}
        </tbody>
      </table>
    );
  }
}

export default Diff

