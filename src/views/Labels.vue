<template>
  <div>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">标签页</span>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="主页" class="home"/>
      </router-link>
      <!--      tip:多加一个标签好平均布局-->
    </div>
    <div class="tip">点击编辑标签</div>
    <div class="tags">
      <router-link class="tag"
                   v-for="tag in tags"
                   :to="`/labels/edit/${tag.id}`"
                   :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="addTag">新建标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component({
  components: {Button}
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  goBack() {
    this.$router.back();
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }
};
</script>

<style lang="scss" scoped>

.navBar a > .home {
  width: 24px;
  height: 24px;
  background: dodgerblue;
  color: white;
  border-radius: 50%;
}

.tip {
  font-weight: lighter;
  font-size: smaller;
  text-align: center;
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
  }
}

.tags {
  background: #f5f5f5;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
