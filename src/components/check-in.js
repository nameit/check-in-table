import React from 'react';
import ReactDom from 'react-dom';

import Data from '../static/json/index'

class Checkin extends React.Component {
  checkIn(e) {
    e.target.className = e.target.className.indexOf('checked') >= 0 ?
      'body-item check-in' : 'body-item check-in checked';
  }

  render() {
    const arr = Data[this.props.user]
    const target = arr.map((item, index) =>
            <div className='check-in-body-row' key={ index }>
              <div className='body-item target-name'>{ item.cn }</div>
              <div className='body-item check-in checked' onClick={this.checkIn}></div>
            </div>
          );
    return (
      <div className='check-in-wrap'>
        <div className='check-in-head'>
          <div className='head-item target-name-title'>目标</div>
          <div className='head-item check-in-title'>签到</div>
        </div>
        <div className='check-in-body'>
          { target }
        </div>
      </div>
    )
  }
}

export default Checkin;
