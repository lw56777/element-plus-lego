<script setup lang="ts">
import { h, ref, computed, type ComputedRef } from 'vue';
import { ElCheckboxGroup, ElTag } from 'element-plus';
import {
  EplDescriptions,
  type TDescriptionsItem,
} from '@element-plus-lego/components';
import HeaderComp from '~/components/HeaderComp.vue';
import AgeComp from '~/components/AgeComp.vue';

const descriptionsData = ref({
  date: '2016-05-03',
  name: '远方os',
  genderType: 1,
  gender: 0,
  age: 35,
  city: 3,
  course: 'Vue源码课',
  price: 699,
  state: [0],
});

const items: ComputedRef<TDescriptionsItem[]> = computed(() => [
  // 普通项
  {
    label: '姓名',
    value: descriptionsData.value.name,
  },

  // 自定义-插槽
  {
    label: 'course',
    value: 'price',
  },

  // 自定义-函数组件
  {
    span: 2,
    label: {
      compType: () => h(ElTag, { type: 'warning' }, () => '状态'),
    },
    value: {
      prop: 'state',
      compType: () =>
        h(ElCheckboxGroup, {
          options: [
            {
              label: '未付款',
              value: 0,
            },
            {
              label: '已付款',
              value: 1,
            },
            {
              label: '已发货',
              value: 2,
            },
          ],
        }),
    },
  },

  // 自定义-组件对象
  {
    label: {
      compType: HeaderComp,
    },
    value: {
      prop: 'age',
      compType: AgeComp,
    },
  },

  // 自定义-动态组件
  {
    label: {
      prop: 'genderType',
      compType: 'switch',
      compProps: {
        activeText: '性别',
        inactiveText: '爱好',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
    value: {
      prop: 'gender',
      compType: 'switch',
      compProps: {
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
  },

  // 显示/隐藏
  {
    label: '时间',
    value: descriptionsData.value.date,
    hidden: descriptionsData.value.gender === 1,
  },
]);
</script>

<template>
  <div>
    <EplDescriptions v-model="descriptionsData" :items="items" border>
      <template #course>
        <el-tag type="primary" size="large">
          {{ descriptionsData.course }}
        </el-tag>
      </template>

      <template #price>
        <el-tag type="success" size="large">
          {{ descriptionsData.price }}
        </el-tag>
      </template>
    </EplDescriptions>
  </div>
</template>
