<template>
  <div>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <div>
      <ol v-if="groupedList.length > 0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}
            <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes"><strong>备注:</strong> {{ item.notes }}</span>
              <span>￥{{ item.amount }} </span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">无记账记录</div>
    </div>
    <footer>
      <router-link to="/money">
        <Icon name="add"/>
      </router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/money/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import day from 'dayjs';

@Component({
  components: {Chart, Tabs},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format(('YYYY年M月D日'));
    }
  }

  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
  }
  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: dateString});
      array.push({date: dateString, value: found ? found.total : 0});
    }
    //将时间排序
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.date);
    const values = this.keyValueList.map(item => item.value);

    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: 'dodgerblue'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: 'dodgerblue', borderColor: 'dodgerblue'},
        data: values,
        type: 'line'
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

//分组后的列表
// 克隆 = 过滤掉未排序的列表 和 选择的类型（支出或收入）
// .sort() 方法用原地算法对数组的元素进行排序，并返回数组。
// 将后一天的时间 - 前一天的时间 进行排序
// format(格式)
// result(结果) 类型格式{
//    title:时间 , items[]:过滤后的新数组的第一项  , total:合计金额
// }
  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf());
    if (newList.length === 0) {return [];}  // 判断有无recordList数据，如果无，return[]
    type Result = { title: string, total?: number, items: RecordType[] }[]

    const result: Result = [{title: dayjs(newList[0].createdTime).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      // 判断：现在的列表 = 克隆后的列表的第i项
      const current = newList[i];
      const last = result[result.length - 1];
      // 判断结果的最后一项的title和current的时间是否是同一天 ， 就将最后一项push到 i 项
      // 反之结果的其他数据 push到新的 i 项里面
      if (dayjs(last.title).isSame(dayjs(current.createdTime), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdTime).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  //间隔
  interval = 'day';
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
footer {
  position: fixed;
  bottom: 30px;
  left: 50%;
  background: dodgerblue;
  margin-left: -20px;
  padding: 10px 15px;
  border-radius: 50%;
}

.icon {
  color: white;
}

::v-deep .type-tabs-item {
  background: white;

  &.selected {

    &::after {
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;

}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.noResult {
  padding: 16px;
  text-align: center;
}

.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
