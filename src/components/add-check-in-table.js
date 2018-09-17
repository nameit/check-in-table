import React from 'react';
import ReactDom from 'react-dom';
// import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import Utils from '../utils';

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
    this.cnref.value && this.enref.value ? this.setState({plusHidden: false}) : this.setState({plusHidden: true})
  }

  addNewItem(e) {
    console.log(this.add.delete)
    if(this.add.delete !== 'undefined') {
      this.setState({
        no: this.state.no + 1
      }, function() {
        ul.push(li);
        this.setState({
          ul
        });
      })
    } else {
      console.log('xx')
    }
  }

  render() {
    li = <li key={this.state.no}>
          <dl className='item-row'>
            <dd>{this.state.no}</dd>
            <dd>
              {/* <InputItem
                {...getFieldProps('inputclear')}
                onClick={() => this.checkValue()}
                onBlur={() => this.deleteLine()}
              ></InputItem> */ }
              <input type="text"
                onChange={(e) => this.checkValue(e)}
                ref={input => this.cnref = input} />
            </dd>
            <dd>
              {/* <InputItem
                {...getFieldProps('inputclear')}
                onClick={() => this.checkValue()}
                onBlur={() => this.deleteLine()}
              ></InputItem> */}
              <input type="text"
                onChange={(e) => this.checkValue(e)}
                ref={input => this.enref = input} />
            </dd>
            <dd className={this.state.plusHidden ? 'hide-plus' : ''} ref={input => this.add = input } onClick={(e) => this.addNewItem(e)}>+</dd>
          </dl>
        </li>
    const { getFieldProps } = this.props.form;
    return (
      <ul>
        <li key={1}>
          <dl className='item-row'>
            <dd>1</dd>
            <dd>
              {/* <InputItem
                {...getFieldProps('inputclear')}
                onClick={() => this.checkValue()}
                onBlur={() => this.deleteLine()}
              ></InputItem> */ }
              <input type="text"
                onChange={(e) => this.checkValue(e)}
                ref={input => this.cnref = input} />
            </dd>
            <dd>
              {/* <InputItem
                {...getFieldProps('inputclear')}
                onClick={() => this.checkValue()}
                onBlur={() => this.deleteLine()}
              ></InputItem> */}
              <input type="text"
                onChange={(e) => this.checkValue(e)}
                ref={input => this.enref = input} />
            </dd>
            <dd className={this.state.plusHidden ? 'hide-plus' : ''} ref={input => this.add = input } onClick={() => this.addNewItem()}>+</dd>
          </dl>
        </li>
        {this.state.ul}
      </ul>
    )
  }
}

const AddCheckInTable = createForm()(AddCheckInTableWrap);
export default AddCheckInTable;