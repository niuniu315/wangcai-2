<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"
               @submit="saveRecord"/>
    <Types @update:value="onUpdateType"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="请输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import store from '@/store/index';

@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

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

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
  background: #f5f5f5;

}
</style>


