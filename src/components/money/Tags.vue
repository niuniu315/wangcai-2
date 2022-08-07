<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">
        <Icon :name="tag.name" ></icon>
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    // 监听selectedTags拿到value值
    this.$emit('update:value', this.selectedTags);
  }
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  //剩余空间
  flex-grow: 1;
  display: flex;
  background: white;

  > .current {
    display: flex;
    flex-wrap: wrap;


    > li {
      $bg: rgb(237, 243, 250);
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 10px;
      margin-top: 4px;
      display: flex;
      flex-direction: column;
      text-align: center;

      &.selected {
        color: rgb(54, 146, 249);
        > .icon {
          background: rgb(234,243,253);
          color: rgb(54, 146, 249);
        }
      }
    }
  }
}

ul > li > .icon {
  width: 32px;
  height: 32px;
  padding: 5px;
  color: rgb(124,137,153);
  border-radius: 50px;
}

</style>
