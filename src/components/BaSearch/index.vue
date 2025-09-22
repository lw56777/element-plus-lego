<script setup lang="ts">
import { getCurrentInstance, computed, type PropType } from 'vue';
import { Search, Refresh, RefreshLeft } from '@element-plus/icons-vue';
import type { FormRules } from 'element-plus';
import { isFunction } from '~/utils/tools';
import { useDynamicComponent } from '~/hooks/useDynamicComponent';
import type { TFormItem } from '../BaForm';
import type { TProps, TEmits, TEmitsAttrs } from '.';

const props = defineProps({
  rules: {
    type: Object as PropType<FormRules>,
    default: () => {},
  },
  items: {
    type: Array as PropType<TFormItem[]>,
    default: () => [],
  },
  emits: {
    type: Array as PropType<TEmitsAttrs[]>,
    default: () => [],
  },
});

const { getComponent: getComponentI } = useDynamicComponent('input');
const { getComponent: getComponentO } = useDynamicComponent('button');

const params = defineModel<any>('modelValue');

const items = computed(() => {
  return props.items.filter(item => !item.hidden);
});

const emits = computed(() => {
  return props.emits.filter(item => !item.hidden);
});

const vm = getCurrentInstance();
const attrs = vm?.attrs as Record<string, any>;

const getAttrs = (item: any): TEmitsAttrs | false => {
  const key = Object.keys(item)[0];
  const value = item[key];
  const attrs = {
    onClick: value,
  };

  switch (Object.keys(item)[0]) {
    case 'onSearch':
      return {
        type: 'primary',
        icon: Search,
        name: '搜索',
        nativeType: 'submit',
        ...attrs,
      };

    case 'onReset':
      return {
        type: 'info',
        icon: RefreshLeft,
        plain: true,
        name: '重置',
        ...attrs,
      };

    case 'onRefresh':
      return {
        icon: Refresh,
        name: '刷新',
        ...attrs,
      };

    default:
      return false;
  }
};

const emitOrder = ['onSearch', 'onReset', 'onRefresh'];
const defaultEmits = computed(() => {
  // 如果用户传递了自定义 emits，就不需要计算默认 emits
  if (props.emits.length > 0) {
    return [];
  }

  return emitOrder.reduce((pre, cur) => {
    if (isFunction(attrs[cur])) {
      const emitAttrs = getAttrs({ [cur]: attrs[cur] });
      if (emitAttrs) {
        pre.push(emitAttrs);
      }
    }

    return pre;
  }, [] as any[]);
});

defineEmits({} as TEmits);
defineExpose({} as TProps);
</script>

<template>
  <el-form
    class="ba-search flex flex-wrap items-center justify-start gap-4"
    @submit.prevent
  >
    <div class="conditions flex flex-wrap gap-4">
      <template v-if="items.length">
        <template v-for="item of items" :key="item.prop">
          <el-form-item v-bind="item">
            <slot :name="item.prop">
              <component
                :is="getComponentI(item.compType)"
                v-model="params[item.prop as typeof params]"
                v-bind="item.compProps || {}"
              />
            </slot>
          </el-form-item>
        </template>
      </template>

      <template v-else>
        <el-form-item v-for="name in Object.keys($slots)" :key="name">
          <slot :name="name" />
        </el-form-item>
      </template>
    </div>

    <div class="actions flex-1 flex justify-end gap-4">
      <template v-if="emits.length">
        <template v-for="item of emits" :key="item.name">
          <slot :name="item.prop">
            <component
              :is="getComponentO(item.compType)"
              v-model="params[item.prop as typeof params]"
              v-bind="item"
            >
              <template v-if="item.name" #default>{{ item.name }}</template>
            </component>
          </slot>
        </template>
      </template>

      <template v-else>
        <template v-for="(item, index) of defaultEmits" :key="index">
          <el-button v-if="item" v-bind="item">
            {{ item.name }}
          </el-button>
        </template>
      </template>
    </div>
  </el-form>
</template>

<style lang="scss">
.ba-search {
  .conditions {
    .el-form-item {
      margin-bottom: 0;

      .el-select {
        min-width: 120px;
      }
    }
  }

  .actions {
    .el-button {
      margin: 0;
    }
  }
}
</style>
