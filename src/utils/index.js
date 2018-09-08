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
  }
}

export default Utils;