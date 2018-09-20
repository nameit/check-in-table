import React from 'react';
import ReactDom from 'react-dom';
import { InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';


class CheckInItemWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plusHidden: true,
      no: 0,
      plus: true
    }
    this.checkCnValue = this.checkCnValue.bind(this);
    this.checkEnValue = this.checkEnValue.bind(this);
    this.onChange = this.onChange.bind(this);
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
  // componentDidUpdate(props) {
  //   this.createElement(props.no + 1);
  // }

  componentDidMount() {
    // this.createElement();
  }

  /**
   * 删除当前行
   * @param  {[Number]} i [删除元素的下标]
   * 传给父级要渲染的列表
   */
  deleteItem(i) {
    const props = this.props.ul
    const newarr = []
    props.map((item, index) => {
      if(index > i) {
        props[index].no = props[index].no - 1
      }
      newarr.push(item);
      return item;
    });
    newarr.splice(i, 1);
    this.props.deleteItem(newarr);
  }


  checkCnValue(v, e) {
    this.setState({
      cnValue: v
    })
  }

  checkEnValue(v, e) {
    this.setState({
      enValue: v
    })
  }

  onChange(name, i, v) {
    this.props.changeList(name, i, v);
  }

  render() {
    const item = this.props.ul.map((item, i) => {
      const li = <dl key={i} className='item-row'>
        <dd>{item.no}</dd>
        <dd>
          <InputItem
            value={item.cnValue}
            onChange={(v) => this.onChange('cnValue', i, v)}
            className='cnValue'
          ></InputItem>
        </dd>
        <dd>
          <InputItem
            value={item.enValue}
            onChange={(v) => this.onChange('enValue', i, v)}
            className='enValue'
          ></InputItem>
        </dd>
        <dd>
          <span className='delete-btn' onClick={() => this.deleteItem(i)}>+</span>
        </dd>
      </dl>;
      return li;
    })
    return (
      <li>
        {item}
      </li>
    );
  }
}

const CheckInItem = createForm()(CheckInItemWrap)
export default CheckInItem;