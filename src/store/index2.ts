import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';


const store = {
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签重复');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  findTag: (id: string) => {
    return window.tagList.filter(t => t.id === id)[0];
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },

  recordList: recordListModel.fetch(),
  createRecord: (record: RecordType) => recordListModel.create(record)
};

export default store;