import React from 'react';
import ReactDom from 'react-dom';

import '../static/scss/index.scss';

import Header from '../components/header';
import Bottom from '../components/bottom';
import Datelabel from '../components/date-label';
import Checkin from '../components/check-in';
import Data from '../static/json/index';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'dad'
    };
  }

  componentDidMount() {
    const today = new Date();
    const time = today.setTime(today.getTime() - 24*60*60*1000);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    this.setState({
      today: `${year}年${month}月${day}日`
    });

    // 开启数据库
    const request = indexedDB.open(this.state.user, 1);
    
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = function (event) {
      console.log("打开数据库成功!");
      const db = event.target.result;
      const objectStore = db.transaction("checkin", "readwrite").objectStore("checkin");
    } 

    request.onupgradeneeded = function(event) {
      console.log("版本变化！");
      const db = event.target.result;
      if (!db.objectStoreNames.contains('checkin')) {
        const objectStore = db.createObjectStore("checkin", {
          keyPath: "date"
          // autoIncrement: true
        });
        objectStore.createIndex('date', 'date', {unique: false});
      }
    }
  }

  handleRight() {
    this.setState({
      userListShow: true
    });
  }

  changeUser(user) {
    this.setState({
      user
    });
  }

  submit() {
    const that = this;
    // 获取是否签到集合数组
    const isCheckedArr = Array.from(document.querySelectorAll('.check-in')).map(item =>
      item.className.indexOf('checked') >= 0
    );

    const request = indexedDB.open(this.state.user, 1);
    
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = function (event) {
      console.log("打开数据库成功!");
      const db = event.target.result;
      const objectStore = db.transaction("checkin", "readwrite").objectStore("checkin");
      const detail = {};

      // 返回detail对象

      Data[that.state.user].map((item, index) =>
        detail[item.en] = isCheckedArr[index]
      );

      // 增加时间字段
      detail.date = that.state.today

      // 往数据库里增加数据
      const req = objectStore.put(detail);
      req.onsuccess = () => {
        console.log("添加成功！");
      }

      req.onerror = (error) => {
        console.log(error);
      }
    } 

  }
  render() {
    return (
      <div id='home'>
        <Header title='签到表' user={this.state.user} changeUser={this.changeUser.bind(this)} />
        <Datelabel date={this.state.today} />
        <Checkin user={this.state.user} />
        <div className='submit' onClick={() => { this.submit() }}>提交</div>
        <Bottom {...this.props} user={this.state.user} />
      </div>
    )
  }
}

export default Index;