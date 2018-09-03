import React from 'react';
import ReactDom from 'react-dom';

class Bottom extends React.Component {
  history() {
    console.log('in');
    this.props.history.push(`/history?user=${this.props.user}`);
  }

  render() {
    return (
      <div className='bottom' onClick={this.history.bind(this)}>
        历史签到记录
      </div>
    )
  }
}

export default Bottom;
