<template>
  <div>编辑标签页面</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue {
  created() {
    tagListModel.fetch();
    const id = this.$route.params.id;
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0]; //获取到的是个数组  数组里面的第0个
    if (tag) {

    } else {
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>