import React from 'react';
import ReactDom from 'react-dom';
// import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import Utils from '../utils';
import CheckInItem from '../components/check-in-item';

let ul = [],li;

class AddCheckInTableWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plusHidden: true,
      no: 1,
      plus: true
    }
    this.checkValue = this.checkValue.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
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

  checkValue(e) {
    e.target.className = e.target.value ? 'no-border' : ''
  }

  addNewItem() {
    this.setState({
      no: this.state.no + 1 
    })
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className='add-item-area'>
        <ul className='items'>
          <CheckInItem no={this.state.no} >
            <dl className='item-row'>
              <dd>{this.state.no}</dd>
              <dd>
                <input type="text"
                  onChange={(e) => this.checkValue(e)}
                  ref={input => this.cnref = input} />
              </dd>
              <dd>
                <input type="text"
                  onChange={(e) => this.checkValue(e)}
                  ref={input => this.enref = input} />
              </dd>
              <dd>
                <span className='delete-btn'>+</span>
              </dd>
            </dl>
          </CheckInItem>
        </ul>
        <div className="plus-btn" onClick={this.addNewItem.bind(this)}>+</div>
        <div className="btn green narrow fixed">添加</div>
      </div>
    )
  }
}

const AddCheckInTable = createForm()(AddCheckInTableWrap);
export default AddCheckInTable;