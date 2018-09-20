import React from 'react';
import ReactDom from 'react-dom';

import Utils from '../utils';
import CheckInItem from '../components/check-in-item';

class AddCheckInTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plus: true,
      ul: [{
        no: 1,
        cnValue: '早睡',
        enValue: 'sa'
      }]
    }
    // this.checkCnValue = this.checkCnValue.bind(this);
    // this.checkEnValue = this.checkEnValue.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.changeList = this.changeList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    // li = <li key={this.state.no}>
    //     <dl className='item-row'>
    //       <dd>{this.state.no}</dd>
    //       <dd>
    //         {/* <InputItem
    //           {...getFieldProps('inputclear')}
    //           onClick={() => this.checkValue()}
    //           onBlur={() => this.deleteLine()}
    //         ></InputItem> */ }
    //         <input type="text"
    //           onChange={(e) => this.checkValue(e)}
    //           ref={input => this.cnref = input} />
    //       </dd>
    //       <dd>
    //         { <InputItem
    //           {...getFieldProps('inputclear')}
    //           onClick={() => this.checkValue()}
    //           onBlur={() => this.deleteLine()}
    //         ></InputItem> }
    //         <input type="text"
    //           onChange={(e) => this.checkValue(e)}
    //           ref={input => this.enref = input} />
    //       </dd>
    //       <dd className={this.state.plusHidden ? 'hide-plus' : ''} onClick={() => this.addNewItem()}>+</dd>
    //     </dl>
    //   </li>;
    // ul.push(li);
    // this.setState({});
  }

  /**
   * 修改input值，可控
   * @param  {[String]} name [中文名还是英文名]
   * @param  {[type]}   i    [改变的值在列表里的下标]
   * @param  {[Stirng]} v    [改变后的值]
   * @return {[Object]}      [返回列表对象]
   */
  changeList(name, i, v) {
    this.setState((prevState, props) => {
      return prevState.ul[i][name] = v;
    });
  }

  /**
   * 删除某一项
   * @param  {[Array]} list [子组件传过来的列表]
   * @return {[type]}      [description]
   */
  deleteItem(list) {
    this.setState((prevState) => ({
      ul: list
    }));
  }

  addNewItem() {
    // this.setState({
    //   no: this.state.no + 1 
    // })

    // 为了return整个对象，所以对象外面包含小括号
    // ul里增加元素可以用push，但元素是对象需要用concat
    this.setState((prevState, props) => ({
      ul: prevState.ul.concat([{no: prevState.ul[prevState.ul.length - 1].no + 1, cnValue: '', enValue: ''}])
    }));
    console.log(this.state.ul)
  }


  render() {
    return (
      <div className='add-item-area'>
        <ul className='items'>
          <CheckInItem ul={this.state.ul}
            changeList={(name, i, v) => { this.changeList(name, i, v); }}
            deleteItem={this.deleteItem} />
        </ul>
        <div className="plus-btn" onClick={this.addNewItem}>+</div>
        <div className="btn green narrow fixed">添加</div>
      </div>
    )
  }
}

export default AddCheckInTable;