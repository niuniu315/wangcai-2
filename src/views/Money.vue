<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"
               @submit="saveRecord"/>
    <div class="notes">
      <FormItem field-name=""
                placeholder="点此输入备注..."
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
    <div class="clearfix tabss" >
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="主页" class="home"/>
      </router-link>
      <Tabs :data-source="recordTypeList"
            :value.sync="record.type"/>
      <router-link to="/labels">
        <Icon class="add" name="add"/>
      </router-link>
    </div>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import Tabs from '@/components/money/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad}
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordType = {
    tags: [], notes: '', type: '-', amount: 0
  };

  // onUpdateNotes(value: string) {
  //   this.record.notes = value;
  // }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value); // 将类型转换成string
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    if (this.record.amount === 0) {
      return window.alert('请输入金额');
    }
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
    }
    this.record.notes = '';
  }

};
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.tabss> a > .home{
  position: relative;
  right: -14px;
  background: dodgerblue;
}

.notes {
  padding: 12px 0;
  background: #f5f5f5;

}

.clearfix{
  border-bottom: 1px solid black;
}
.tabss{
  background: white;
  display: flex;
  justify-content: center;
}
a >.icon{
  background: #333333;
  color: white;
  border-radius: 50%;
  position: relative;
  top: 21px;
  right: 10px;
  float: right;
  width: 24px;
  height: 24px;
}
</style>


