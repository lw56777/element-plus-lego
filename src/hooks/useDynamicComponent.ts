import {
  ElButton,
  ElDatePicker,
  ElInput,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import { isString } from '~/utils/tools';

const componentMap = {
  input: ElInput,
  button: ElButton,
  select: ElSelect,
  date: ElDatePicker,
  switch: ElSwitch,
};

type TComponentType = keyof typeof componentMap;

export function useDynamicComponent(initType?: unknown) {
  const getComponent = (type: unknown) => {
    if (type && !isString(type)) {
      return type;
    }

    return componentMap[(type as TComponentType) || initType];
  };

  return {
    componentMap,
    getComponent,
  };
}
