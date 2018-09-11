import React from 'react';
import ReactDom from 'react-dom';
import { List, DatePicker, Popover, Modal } from 'antd-mobile';

import Datelabel from '../components/date-label';
import Users from '../static/json/users';
import Utils from '../utils';
import Data from '../static/json/index';

const Item = Popover.Item;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPanelShow: false,
      visible: false,
      selected: '',
    };
    // this.changeUser = this.changeUser.bind(this);
    this.preImg = this.preImg.bind(this);
    this.Id = this.Id.bind(this);
    this.getFileUrl = this.getFileUrl.bind(this);
  }
  
  handleBack() {
    this.props.handleBack ? this.props.handleBack() : this.props.history.goBack();
  }

  // 点击名字
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

  // 改变头像
  changeAvatar(files, type, index) {
    this.setState({
      files,
    });
  }

  // 点击其他用户
  onSelect(opt) {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    }, () => {
      this.props.changeUser(this.state.selected);
      Utils.setStorage('currentUser', this.state.selected);
    });
  };
  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };

  // 点击搜索
  search() {
    const that = this;
    const startDate = Utils.formDate(this.state.startDate);
    const endDate = Utils.formDate(this.state.endDate);
    let ul = [];
    const Goals = Data[this.props.user];
    const ens = [];
    Goals.map(i =>
      ens.push(i.en)
    )
    // 开启数据库
    const request = indexedDB.open(this.props.user, 1);
    request.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction('checkin', 'readwrite').objectStore('checkin');
      that.props.history.push(`/history?user=${this.props.user}&sd=${startDate}&ed=${endDate}`);
    }
  }

  Id(id) {
    return document.getElementById(id);
  }

  IdClick(id) {
    return document.getElementById(id).click();
  }

  changeToop(){
    var file = this.Id("file");
    if(file.value==''){
      //设置默认图片
    this.Id("avatar").src = 'http://sandbox.runjs.cn/uploads/rs/72/huvtowwn/zanwu.png';
    } else {
      this.preImg("file", "avatar");
    }
  }

  //获取input[file]图片的url Important
  getFileUrl(fileId) {
    var url;
    var file = this.Id(fileId);
    var agent = navigator.userAgent;
    console.log(agent)
    if (agent.indexOf("MSIE")>=1) {
    url = file.value;
    } else {
      url = window.URL.createObjectURL(file.files.item(0));
    }
    Utils.setStorage('avatarUrl', url);
    return url;
  }

  //读取图片后预览
  preImg(fileId,imgId) {
    var imgPre =this.Id(imgId);
    imgPre.src = this.getFileUrl(fileId);
  }

  // 切换用户
  /* changeUser(user) {
    const that = this;
    // 开启数据库
    const request = indexedDB.open(user, 1);
    
    request.onerror = (event) => {
      console.log("打开数据库失败:"+event.target.message);
    }

    request.onsuccess = (event) => {
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
  } */

  // 清空数据
  clearDatabase() {
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
    // const li = Users.filter(i => i !== this.props.user).map((item, index) =>
          // <li key={index} onClick={() => this.changeUser(item)}>{item}</li>);
    const li = Users.filter(i => i !== this.props.user).map((item, index) =>
          <Item key={index} value={item}>{item}</Item>);
    const userList = this.state.userListShow ? <ul className='userList'>
        {li}
      </ul> : '';
    const userPanel = <div className='user-panel'>
      <img id='avatar' onClick={this.IdClick.bind(this, 'file')} src='http://sandbox.runjs.cn/uploads/rs/72/huvtowwn/zanwu.png' />
      <input type="file" name="file" accept="image/png,image/jpg,image/jpeg" id="file" onChange={this.changeToop.bind(this)} />
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
      <div className='search' onClick={this.search.bind(this)}>搜索</div>
      <div className='divider'></div>
      <Popover mask
        overlayClassName="fortest"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        // overlay={[
        //   (<Item key="4" value="scan" data-seed="logId">Scan</Item>),
        //   (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
        //   (<Item key="6" value="button ct" >
        //     <span style={{ marginRight: 5 }}>Help</span>
        //   </Item>),
        // ]}
        overlay={[li]}
        placement='bottom'
        align={{
          overflow: { adjustY: 0, adjustX: 10 },
          offset: [0, 0],
        }}
        onVisibleChange={this.handleVisibleChange.bind(this)}
        onSelect={this.onSelect.bind(this)}
      >
        <div className='change-user'>切换用户</div>
      </Popover>
      <div className='delete-database' onClick={this.clearDatabase.bind(this)} >删除数据</div>
    </div>;
    return (
      <header className='header'>
        <span className={this.props.needBack ? 'back' : ''} onClick={this.handleBack.bind(this)} />
        <span className='center'>{this.props.title}</span>
        <span className='right' onClick={this.handleRight.bind(this)}>
          {this.state.selected || this.props.user}
        </span>
        {userList}
        {userPanel}
      </header>
    )
  }
}

export default Header;
