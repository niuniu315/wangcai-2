<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)"
        @click="select(item)"
        class="tabs-item">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceType = {
  text: string, value: string
}

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceType[];
  @Prop(String) readonly value!: string; //!表示一定不为空
  @Prop(String) classPrefix?: string;  //？表示可能是空  classPrefix: class前缀

  liClass(item: DataSourceType) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    };
  }

  select(item: DataSourceType) {
    this.$emit('update:value', item.value);

  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  text-align: center;
  font-size: 16px;
  width: 120px;
  margin: 0 auto;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}

.earning {
  background: white;
}

</style>
