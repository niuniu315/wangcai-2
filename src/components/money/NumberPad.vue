<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">100</button>
      <button @click="inputContent">1000</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
      <button id="ok" @click="ok" class="ok">保存</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output: string = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    // 监听获取output value值
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 0 16px;
    text-align: right;
    color: rgb(235,88,96);
    background: #f5f5f5;
  }

  .buttons {
    @extend %clearFix;
    display: grid;
    grid-template-columns: repeat(4,25%);
    grid-template-rows: repeat(4,56px);
    background: #f5f5f5;
    padding: 6px 10px;
    > button {
      font-size: 18px;
      background: white;
      margin: 6px;
      border: none;
      border-radius: 10px;
      &:nth-child(16) {
        background: rgb(235,88,96);
        color: white;
      }
      &:nth-child(15) {
        font-size: larger;
        font-weight: bolder;
      }
    }
  }
}
</style>
