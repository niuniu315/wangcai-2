const localStorageLeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
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
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageLeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;