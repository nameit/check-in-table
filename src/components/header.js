import React from 'react';
import ReactDom from 'react-dom';
import {List, DatePicker} from 'antd-mobile';
import Users from '../static/json/users';

let db, objectStore;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPanelShow: false
    };
    this.changeUser = this.changeUser.bind(this);
  }
  
  handleBack() {
    this.props.handleBack ? this.props.handleBack() : this.props.history.goBack();
  }

  handleRight() {
    if (this.props.handleRight) {
      this.props.handleRight();
    } else {
      if (this.state.userPanelShow) {
        this.setState({userPanelShow: false});
        document.getElementById('home').removeAttribute('class');
      } else {
        document.getElementById('home').className = 'hide';
        this.setState({userPanelShow: true});
      }
    }
  }

  changeUser(user) {
    const that = this;
    // 开启数据库
    const request = indexedDB.open(user, 1);
    
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = function (event) {
      console.log(`打开${user}数据库成功!`);
      db = event.target.result;
      objectStore = db.transaction("checkin", "readwrite").objectStore("checkin");
      that.props.changeUser(user);
      that.setState({
        userListShow: false
      });
    } 

    request.onupgradeneeded = function(event) {
      console.log("版本变化！");
      db = event.target.result;
      if (!db.objectStoreNames.contains('checkin')) {
        objectStore = db.createObjectStore("checkin", {
          keyPath: "date"
          // autoIncrement: true
        });
        objectStore.createIndex('date', 'date', {unique: false});
      }
    }
  }

  render() {
    const li = Users.filter(i => i !== this.props.user).map((item, index) =>
          <li key={index} onClick={() => this.changeUser(item)}>{item}</li>);
    const userList = this.state.userListShow ? <ul className='userList'>
        {li}
      </ul> : '';
    const userPanel = <div className='user-panel'>
      <div className='avatar'></div>
      <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker
          mode="date"
          title="Select Date"
          extra="开始日期"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal"></List.Item>
        </DatePicker>
      </List>
    </div>;
    return (
      <header className='header'>
        <span className={this.props.needBack ? 'back' : ''} onClick={this.handleBack.bind(this)} />
        <span className='center'>{this.props.title}</span>
        <span className='right' onClick={this.handleRight.bind(this)}>
          {this.props.user}
        </span>
        {userList}
        {userPanel}
      </header>
    )
  }
}

export default Header;
