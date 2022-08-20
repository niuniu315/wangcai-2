<template>
  <div>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
      <!--      tip:多加一个标签好平均布局-->
    </div>
    <div class="tip">点击修改标签</div>
    <div class="form-wrapper">
      <FormItem field-name="标签名"
                placeholder="请输入标签名"
                :value="currentTag.name"
                @update:value="update"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  // 当前标签
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    } else {

    }
  }

  goBack() {
    this.$router.back();
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag', {
        id: this.currentTag.id, name
      });
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-weight: lighter;
  font-size: smaller;
  text-align: center;
  margin-top: 8px;
}
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .leftIcon {
    width: 24px;
    height: 24px;
    color: red;
  }
}

.form-wrapper {
  background: #f5f5f5;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
.title{
  color: gray;
  font-size: 24px;
  position: relative;
  left: -5px;
}
</style>
