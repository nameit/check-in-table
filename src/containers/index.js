import React from 'react';
import ReactDom from 'react-dom';

import '../static/scss/index.scss';

import Header from '../components/header';
import Bottom from '../components/bottom';
import Datelabel from '../components/date-label';
import Checkin from '../components/check-in';
import Data from '../static/json/index';

let db,objectStore,transaction,detail = {};

class Index extends React.Component {
  state = {}
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
    const request = indexedDB.open('yk',1);
    
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = function (event) {
      console.log("打开数据库成功!");
      db = event.target.result;
      transaction = db.transaction("checkin", "readwrite");
      objectStore = transaction.objectStore("checkin");
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


  submit() {
    // 获取是否签到集合数组
    const isCheckedArr = Array.from(document.querySelectorAll('.check-in')).map(item =>
      item.className.indexOf('checked') >= 0
    );

    // 返回detail对象，
    Data.targets.map((item, index) =>
      detail[item.en] = isCheckedArr[index]
    );

    // 增加时间字段
    detail.date = this.state.today

    // 往数据库里增加数据
    transaction = db.transaction("checkin", "readwrite");
    objectStore = transaction.objectStore("checkin");
    const request = objectStore.put(detail);
    request.onsuccess = () => {
      console.log("添加成功！");
    }

    request.onerror = (error) => {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <Header title='签到表' />
        <Datelabel date={this.state.today} />
        <Checkin />
        <div className='submit' onClick={() => { this.submit() }}>提交</div>
        <Bottom {...this.props} />
      </div>
    )
  }
}

export default Index;