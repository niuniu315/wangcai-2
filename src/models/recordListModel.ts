const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordType[],
  clone(data: RecordType | RecordType[]) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordType[]; // 强制类型是个RecordType[])
    return this.data;
  },
  save() {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.data));
  }
};

export default recordListModel;