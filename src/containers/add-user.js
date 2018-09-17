import React from 'react';
import ReactDom from 'react-dom';

import AddCheckInTable from '../components/add-check-in-table';
import Utils from '../utils';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id='addUser'>
        <div className="add-user">
          <div className='add-avatar'>
            <img id='avatar' onClick={() => Utils.IdClick('file')} src='http://sandbox.runjs.cn/uploads/rs/72/huvtowwn/zanwu.png' />
            <input type="file" name="file" accept="image/png,image/jpg,image/jpeg" id="file" onChange={() => Utils.changeAvatar('file', 'avatar')} />
          </div>
          <div className="add-name">
            <input type="text" className='chinese-name' placeholder='请输入中文名' />
            <input type="text" className='english-name' placeholder='请输入英文名' />
          </div>
        </div>
        <div className="add-items">
          <div className="add-items-head">每日完成项目表</div>
          <dl className="add-items-title">
            <dd>序号</dd>
            <dd>项目中文名</dd>
            <dd>项目英文名</dd>
          </dl>
          <AddCheckInTable />
        </div>
      </div>
    )
  }
}

export default AddUser;