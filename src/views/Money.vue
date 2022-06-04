<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
    {{recordList}}
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
const model = require('@/model.js').default
console.log(model);
const recordList: RecordType[] = model.fetch()

type RecordType = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdTime?: Date // ?问号表示你管我有没有这个类型
}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  recordList: RecordType[] = recordList;
  record: RecordType = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateType(value: string) {
    this.record.type = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
    // 将类型转换成string
  }

  saveRecord() {
    // 深拷贝recordList赋值给record
    const record2 = JSON.parse(JSON.stringify(this.record));
    record2.createdTime = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

