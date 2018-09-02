import React from 'react';
import ReactDom from 'react-dom';

import Datelabel from '../components/date-label';
import Header from '../components/header';
import Data from '../static/json/index';

let db, cns = [];
let ul = [];
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateLabel: ''
    };
  }

  componentDidMount() {
    // 开启数据库
    const request = indexedDB.open('yk',1);

    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    const that = this;

    request.onsuccess = function (event) {
      // 获取英文集合
      const ens = [];
      Data.targets.map(i =>
        ens.push(i.en)
      )
      console.log("打开数据库成功!");
      db = event.target.result;
      const objectStore = db.transaction('checkin', 'readonly').objectStore('checkin');
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        // 有数据就遍历所有记录
        if (cursor) {
          ul = <div key={cursor.key}>
              <Datelabel date={cursor.value.date} />
              <ul className='items'>
                {
                  // 对象转化为数组后过滤掉时间字段再遍历其他项目
                  Object.entries(cursor.value).filter(i => i[0].indexOf('date') < 0).map((item, index) => {
                    // 英文占据集合中第几个返回对应的中文
                    const cn = Data.targets[ens.indexOf(item[0])]['cn'];
                    return <li key={index} className={item[1] ? 'checked' : 'notChecked'}>{cn}</li>;
                  })
                }
              </ul>
            </div>;
          cursor.continue();
        }
        else {
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
