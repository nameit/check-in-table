import React from 'react';
import ReactDom from 'react-dom';

class CheckInItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plusHidden: true,
      no: 0,
      plus: true
    }
  }

  // 父组件的props更改后引起
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(nextProps.currentRow === prevState.lastRow) {
  //     return null;
  //   }
   
  //   return {
  //     no: nextProps.no
  //   }
  // }

  // 更新后能获取dom元素就能替换li里的内容
  componentDidUpdate(props) {
    this.createElement(props.no + 1);
  }

  componentDidMount() {
    this.createElement();
  }

  /**
   * 创建元素
   * @param  {Number} no [获取props的no，如果没有默认是1]
   * @return {[type]}    [null]
   */
  createElement(no = 1) {
    this.li = document.createElement('li');
    this.li.setAttribute('key', no);
    document.querySelector('.items').appendChild(this.li);
    this._renderLi();
  }

  _renderLi() {
    ReactDom.render(this.props.children, this.li);
  }

  render() {
    return null;
  }
}

export default CheckInItem;