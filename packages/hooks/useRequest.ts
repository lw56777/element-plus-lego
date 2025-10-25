import { isRef, ref } from 'vue';
import { debounce } from 'lodash-es';
import { isArray } from '@element-plus-lego/utils';

export type TService = (...args: any[]) => Promise<any> | Promise<any>[];

export interface IOptions {
  initData?: any; // 初始值
  immediate?: boolean; // 是否立即执行
  delay?: number; // 防抖等待时间
  params?: any; // 请求参数
}

const defaultOptions: IOptions = {
  immediate: true,
  delay: 0,
  params: {},
};

export function useRequest(service: TService, options?: IOptions) {
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
  const params = isRef(_params) ? _params : ref(_params);
  const data = ref(initData);
  const error = ref(null);
  const isArr = isArray(service);

  let run = () => {
    loading.value = true;
    const queue: Promise<any>[] = [];

    if (isArr) {
      service.forEach(item => {
        queue.push(item(params.value));
      });
    } else {
      queue.push(service(params.value) as Promise<any>);
    }

    Promise.all(queue)
      .then(res => {
        console.log('res', res);
        data.value = isArr ? res.map(item => item.data) : res[0].data;
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

  return {
    loading,
    params,
    data,
    error,
    run,
  };
}
