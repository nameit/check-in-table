import React from 'react';
import ReactDom from 'react-dom';

class Datelabel extends React.Component {
  render() {
    return (
      <div className='date-label'>{this.props.date}</div>
    )
  }
}

export default Datelabel;
