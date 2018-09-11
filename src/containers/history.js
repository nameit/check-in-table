import React from 'react';
import ReactDom from 'react-dom';
import qs from 'qs';

import Datelabel from '../components/date-label';
import Header from '../components/header';
import Data from '../static/json/index';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateLabel: ''
    };
  }

  componentDidMount() {
    let db, cns = [], bound;
    let ul = [];
    // 从首页传过来的用户
    const user = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).user;
    // 从首页传过来的时间
    const startDate = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sd;
    const endDate = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).ed;
    if (startDate && endDate) {
      bound = IDBKeyRange.bound(startDate, endDate, false, false);
    } else {
      bound = '';
    }

    // 开启数据库
    const request = indexedDB.open(user, 1);

    const that = this;

    const Goals = Data[user];
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }


    request.onsuccess = function (event) {
      // 获取英文集合
      const ens = [];
      Goals.map(i =>
        ens.push(i.en)
      )
      console.log(`打开${user}数据库成功!`);
      db = event.target.result;
      const objectStore = db.transaction('checkin', 'readonly').objectStore('checkin');
      const cursors = bound ? objectStore.openCursor(bound) : objectStore.openCursor();
      cursors.onsuccess = function(event) {
        var cursor = event.target.result;
        // 有数据就遍历所有记录
        if (cursor) {
          ul.push(<div key={cursor.key}>
              <Datelabel date={cursor.value.date} />
              <ul className='items'>
                {
                  // 对象转换为数组后过滤掉时间字段再遍历其他项目
                  Object.entries(cursor.value).filter(i => i[0].indexOf('date') < 0).map((item, index) => {
                    // 英文占据集合中第几个返回对应的中文
                    const cn = Goals[ens.indexOf(item[0])]['cn'];
                    return <li key={index} className={item[1] ? 'checked' : 'notChecked'}>{cn}</li>;
                  })
                }
              </ul>
            </div>);
          cursor.continue();
        }
        else {
          // ul.push(<div key={1} className='nodata'>暂无数据</div>);
          that.setState({
            ul
          });
        }
      };
    }
  }

  render() {
    return (
      <div className='history' >
        <Header title='历史签到记录' {...this.props} needBack={true}/>
        {this.state.ul}
      </div>
      )
  }
}

export default History;
