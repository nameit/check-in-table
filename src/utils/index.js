const Utils = {
  formDate(date) {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}年${month}月${day}日`;
  }
}

export default Utils;