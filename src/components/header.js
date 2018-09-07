import React from 'react';
import ReactDom from 'react-dom';
import { List, DatePicker, Popover, Modal } from 'antd-mobile';
import Users from '../static/json/users';

const Item = Popover.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPanelShow: false,
      visible: false,
      selected: '',
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

  onSelect(opt) {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };

  changeUser(user) {
    const that = this;
    // 开启数据库
    const request = indexedDB.open(user, 1);
    
    request.onerror = function (event) {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = function (event) {
      console.log(`打开${user}数据库成功!`);
      const db = event.target.result;
      const objectStore = db.transaction("checkin", "readwrite").objectStore("checkin");
      that.props.changeUser(user);
      that.setState({
        userListShow: false
      });
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

  deleteDatabase() {
    Modal.alert('','确定要删除数据库', [{
      text: '取消',
      onPress: () => {}
    }, {
      text: '确定',
      onPress: () => {
        const request = indexedDB.open(this.props.user, 1);
        request.onsuccess = function(event) {
          console.log("版本变化！");
          const db = event.target.result;
          
          const objectStore = db.transaction('checkin', 'readwrite').objectStore('checkin');
          objectStore.clear();
        }
      }
    }])
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
          extra="开始日期"
          value={this.state.startDate}
          onChange={startDate => this.setState({ startDate })}
        >
          <List.Item arrow="horizontal"></List.Item>
        </DatePicker>
      </List>
      <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker
          mode="date"
          extra="结束日期"
          value={this.state.endDate}
          onChange={endDate => this.setState({ endDate })}
        >
          <List.Item arrow="horizontal"></List.Item>
        </DatePicker>
      </List>
      <div className='search'>搜索</div>
      <div className='divider'></div>
      <Popover mask
        overlayClassName="fortest"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        overlay={[
          (<Item key="4" value="scan" data-seed="logId">Scan</Item>),
          (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
          (<Item key="6" value="button ct" >
            <span style={{ marginRight: 5 }}>Help</span>
          </Item>),
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 10 },
          offset: [-10, 0],
        }}
        onVisibleChange={this.handleVisibleChange.bind(this)}
        onSelect={this.onSelect.bind(this)}
      >
        <div className='change-user'>切换用户</div>
      </Popover>
      <div className='delete-database' onClick={this.deleteDatabase.bind(this)} >删除数据</div>
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
