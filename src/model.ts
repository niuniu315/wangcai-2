const localStorageKeyName = 'recordList';
const model = {
  clone(data: RecordType | RecordType[]) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordType[]; // 强制类型是个RecordType[]
  },
  save(data: RecordType[]) {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(data));
  }
};

export default model;