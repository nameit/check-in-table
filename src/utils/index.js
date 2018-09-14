const Utils = {
  formDate(date) {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}年${month}月${day}日`;
  },
  setStorage(item, value) {
    return localStorage.setItem(item, value);
  },
  getStorage(item) {
    return localStorage.getItem(item);
  },

  Id(id) {
    return document.getElementById(id);
  },
  IdClick(id) {
    return document.getElementById(id).click();
  },

  // 改变头像
  changeAvatar(fileId, imgId){
    const file = this.Id(fileId);
    if(file.value == ''){
      //设置默认图片
      this.Id(imgId).src = 'http://sandbox.runjs.cn/uploads/rs/72/huvtowwn/zanwu.png';
    } else {
      this.Id(imgId).src = this.getFileUrl(fileId);
    }
  },

  //获取input[file]图片的url Important
  getFileUrl(fileId) {
    let url;
    const file = this.Id(fileId);
    const agent = navigator.userAgent;
    if (agent.indexOf("MSIE")>=1) {
    url = file.value;
    } else {
      url = window.URL.createObjectURL(file.files.item(0));
    }
    this.setStorage('avatarUrl', url);
    return url;
  }
}

export default Utils;