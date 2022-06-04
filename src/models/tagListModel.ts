const localStorageLeyName = 'tagList';
type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => 'success' | 'duplicated' //创建两个联合类型 成功和重复
  save: () => void
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageLeyName) || '[]');
    return this.data;
  },
  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push(name);
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageLeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;