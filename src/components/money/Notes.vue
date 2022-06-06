<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
  @Prop({required: true}) fieldName!: string;  // 必须有一个字符串  别管我有没有默认值
  @Prop({required: true}) placeholder!: string;  // 必须有一个字符串  别管我有没有默认值

  @Watch('value')  // 监听获取value值
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>