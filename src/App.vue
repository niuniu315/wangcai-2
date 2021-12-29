<template>
  <div>
    <!-- 在这里展示指定路由的内容 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  line-height: 1.5;
}
</style>
