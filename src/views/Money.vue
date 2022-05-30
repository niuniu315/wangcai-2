<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  onUpdateTags(value: string[]) {
    console.log(value);
  }

  onUpdateNotes(value: string) {
    console.log(value);
  }

  onUpdateType(value: string) {
    console.log(value);
  }

  onUpdateAmount(value: string) {
    console.log(value);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

