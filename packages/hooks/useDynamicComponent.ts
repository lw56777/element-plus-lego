import { h } from 'vue';
import {
  ElButton,
  ElInput,
  ElCascader,
  ElCheckbox,
  ElDatePicker,
  ElRadio,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import { isString, isFunction } from '@element-plus-pro/utils';

const componentMap: Record<string, any> = {
  button: ElButton,
  input: ElInput,
  cascader: ElCascader,
  checkbox: ElCheckbox,
  date: ElDatePicker,
  radio: ElRadio,
  select: ElSelect,
  switch: ElSwitch,
};

type TComponentType = keyof typeof componentMap;

export function useDynamicComponent(initType?: TComponentType): {
  componentMap: Record<string, any>;
  getComponent: (type: unknown, scope?: any) => any;
} {
  const getComponent = (type: unknown, scope?: any) => {
    if (type && !isString(type)) {
      return isFunction(type) ? (type as Function)(scope) : type;
    }

    const dynamicComponent = componentMap[
      (type as TComponentType) || (initType as TComponentType)
    ] || {
      render() {
        return h('span', {}, type as string);
      },
    };

    return dynamicComponent;
  };

  return {
    componentMap,
    getComponent,
  };
}
