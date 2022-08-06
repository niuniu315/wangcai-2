<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  @extend %outerShadow;
  font-size: 12px;
  background: #f5f5f5;

  > .item {
    padding: 3px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}
</style>
