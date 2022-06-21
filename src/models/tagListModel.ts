import createdId from '@/lib/createdId';

const localStorageLeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  // 获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageLeyName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createdId().toString();
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id) [0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'notfound';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = 1;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem(localStorageLeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;