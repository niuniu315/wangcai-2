<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
    {{ allValue }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';

type AllValue = {
  tags: string[]
  notes: string
  type: string
  amount: number
}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  allValue: AllValue = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.allValue.tags = value;
  }

  onUpdateNotes(value: string) {
    this.allValue.notes = value;
  }

  onUpdateType(value: string) {
    this.allValue.type = value;
  }

  onUpdateAmount(value: string) {
    this.allValue.amount = parseFloat(value);
    // 将类型转换成string
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

