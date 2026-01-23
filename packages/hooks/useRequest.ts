import { ref, toRef } from 'vue';
import { debounce, cloneDeep } from 'lodash-es';
import { isArray } from '@element-plus-lego/utils';

export type TServiceFunction = (...args: any[]) => Promise<any>;

export interface IOptionsBase {
  initData?: any; // 初始值
  immediate?: boolean; // 是否立即执行
  delay?: number; // 防抖等待时间
}

export interface IOptionsSingle extends IOptionsBase {
  params?: any; // 单个函数时，参数可以是任意值
}

export interface IOptionsArray extends IOptionsBase {
  params?: any[]; // 函数数组时，参数必须是数组
}

const defaultOptions = {
  immediate: true,
  delay: 0,
  params: {},
};

// 函数重载：当 service 是数组时，params 必须是数组
export function useRequest(
  service: TServiceFunction[],
  options?: IOptionsArray,
): any;
// 函数重载：当 service 是单个函数时，params 可以是任意值
export function useRequest(
  service: TServiceFunction,
  options?: IOptionsSingle,
): any;
export function useRequest(
  service: TServiceFunction | TServiceFunction[],
  options?: IOptionsSingle | IOptionsArray,
): any {
  const {
    initData,
    immediate,
    delay,
    params: _params,
  } = {
    ...defaultOptions,
    ...options,
  };

  const loading = ref(false);
  const params = toRef(_params);
  const data = ref(initData);
  const error = ref(null);
  const isArr = isArray(service);

  let run = () => {
    loading.value = true;
    const queue: Promise<any>[] = [];

    if (isArr) {
      service.forEach((item, index) => {
        queue.push(item(params.value[index]));
      });
    } else {
      queue.push(service(params.value) as Promise<any>);
    }

    Promise.all(queue)
      .then(res => {
        data.value = isArr
          ? res.map(item => item?.data || item)
          : res[0]?.data || res[0];
      })
      .catch(err => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (debounce) {
    run = debounce(run, delay);
  }

  immediate && run();

  // 保存初始 params 状态
  const initialParams = cloneDeep(_params || {});

  const reset = () => {
    params.value = cloneDeep(initialParams);
  };

  return {
    loading,
    params,
    data,
    error,
    run,
    reset,
  };
}
