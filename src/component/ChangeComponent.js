'use strict';

import React from 'react';
import Utils from '../utils';

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

const css = {
  inner: 'code-Inner',
  text: 'code-Inner-text',
  removed: 'code-Inner-removed',
  added: 'code-Inner-added'
};

class ChangeComponent extends React.Component {
  constructor(props) {
    super();
    this.className = this.className.bind(this);
    this.renderType = this.renderType.bind(this);
    this.renderLine = this.renderLine.bind(this);

    this.state = props;
  }

  renderType(state) {
    return removed(this.state.change) ?
      css.removed :
      added(this.state.change) ? css.added : '';
  }

  className() {
    return `${css.text} ${this.renderType(this.state)}`;
  }

  renderLine(line) {
    return (
      <span className={this.className()}>{line}</span>
    );
  }

  render() {
    return(
      <tr className="code">
        <td>{this.renderLine(this.state.line)}</td>
      </tr>
    );
  }
}

export default ChangeComponent

