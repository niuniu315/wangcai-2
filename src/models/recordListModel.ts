import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordType[],
  create(record: RecordType) {
    const record2: RecordType = clone(record);// 深拷贝recordList赋值给record
    record2.createdTime = new Date();
    this.data.push(record2);
    this.save()
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