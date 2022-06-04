<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList
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
    this.record.amount = parseFloat(value); // 将类型转换成string
  }

  saveRecord() {
    const record2: RecordType = recordListModel.clone(this.record);// 深拷贝recordList赋值给record
    record2.createdTime = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }

};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


