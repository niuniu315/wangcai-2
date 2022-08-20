import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createdId from '@/lib/createdId';
import router from '@/router';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    output: '0',
    notes: '',
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }

    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordType[];
    },
    createRecord(state, record: RecordType) {
      const record2 = clone(record);
      record2.createdTime = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
      state.output = '0';
      console.log(state.output);
      state.notes = '';
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '服饰');
        store.commit('createTag', '餐饮');
        store.commit('createTag', '住房');
        store.commit('createTag', '交通');
        store.commit('createTag', '借入');
        store.commit('createTag', '借出');
        store.commit('createTag', '利息');
        store.commit('createTag', '医疗');
        store.commit('createTag', '奖金');
        store.commit('createTag', '娱乐');
        store.commit('createTag', '学习');
        store.commit('createTag', '投资');
        store.commit('createTag', '红包');
        store.commit('createTag', '烟酒');
        store.commit('createTag', '零食');
      }
    },
    createTag(state, name: string) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = createdId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  }
});

export default store;
