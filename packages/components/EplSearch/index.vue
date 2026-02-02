<script setup lang="ts">
import { getCurrentInstance, computed, type PropType } from 'vue';
import { ElForm, ElFormItem, ElSpace, type FormRules } from 'element-plus';
import { Search, Refresh, RefreshLeft } from '@element-plus/icons-vue';
import { isFunction } from '@element-plus-lego/utils';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import { isObject, omit } from 'lodash-es';
import { EplButton } from '../EplButton';
import type { TFormItem } from '../EplForm';
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
  showSearch: {
    type: Boolean,
    default: true,
  },
});

const { getComponent: getComponentI } = useDynamicComponent('input');
const { getComponent: getComponentO } = useDynamicComponent('button');
const { getComponent } = useDynamicComponent();

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
    show: true,
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
        show: props.showSearch,
      };

    case 'onReset':
      return {
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
  // if (props.emits.length > 0) {
  //   return [];
  // }

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
  <el-form class="epl-search" @submit.prevent>
    <div class="epl-search__conditions">
      <template v-if="items.length">
        <template v-for="item of items" :key="item.prop">
          <el-form-item v-bind="omit(item, ['label', 'error'])">
            <template v-if="item.label" #label>
              <component
                v-if="isObject(item.label)"
                :is="getComponent(item.label?.compType)"
                v-bind="(item.label?.compProps as Record<string, any>) || {}"
              />

              <slot v-else :name="item.label">{{ item.label }}</slot>
            </template>

            <slot :name="item.prop">
              <component
                :is="getComponentI(item.compType)"
                v-model="params[item.prop as typeof params]"
                v-bind="(item.compProps as Record<string, any>) || {}"
              />
            </slot>

            <template v-if="item.error" #error>
              <component
                v-if="isObject(item.error)"
                :is="getComponent(item.error?.compType)"
                v-bind="(item.error?.compProps as Record<string, any>) || {}"
              />

              <slot v-else :name="item.error">{{ item.error }}</slot>
            </template>
          </el-form-item>
        </template>
      </template>

      <template v-else>
        <el-form-item v-for="name in Object.keys($slots)" :key="name">
          <slot :name="name" />
        </el-form-item>
      </template>

      <el-space class="epl-search__actions">
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

        <template v-for="(item, index) of defaultEmits" :key="index">
          <EplButton v-if="item" v-show="item.show" v-bind="item">
            {{ item.name }}
          </EplButton>
        </template>
      </el-space>
    </div>
  </el-form>
</template>

<style lang="scss">
.epl-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  &__conditions {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .el-form-item {
      margin-bottom: 0;

      .el-select {
        min-width: 120px;
      }
    }
  }

  &__actions {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
