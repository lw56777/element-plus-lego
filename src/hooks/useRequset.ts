import { isRef, ref } from 'vue';
import { debounce } from 'lodash-es';
import { isArray } from '~/utils/tools';
import { type TPageProps } from '~/hooks/usePagination';

export type TService = (...args: any[]) => Promise<any> | Promise<any>[];

export interface IOptions {
  data?: any; // 初始值
  immediate?: boolean; // 是否立即执行
  delay?: number; // 防抖等待时间
  params?: any; // 请求参数
  pagination?: TPageProps;
}

const defaultOptions: IOptions = {
  immediate: true,
  delay: 0,
  params: {},
};

// 假设相应结构
// interface IResult {
//   code: number;
//   data: {
//     list: [];
//     total: 0;
//   };
//   message: string;
// }

export function useRequest(service: TService, options?: IOptions) {
  const {
    data: defaultData,
    immediate,
    delay,
    params,
  } = {
    ...defaultOptions,
    ...options,
  };

  const loading = ref(false);
  const _params = isRef(params) ? params : ref(params);
  const data = ref(defaultData);
  const error = ref(null);
  const isArr = isArray(service);

  let run = () => {
    loading.value = true;
    const queue: Promise<any>[] = [];

    if (isArr) {
      service.forEach(item => {
        queue.push(item(_params.value));
      });
    } else {
      queue.push(service(_params.value) as Promise<any>);
    }

    Promise.all(queue)
      .then(res => {
        console.log('res', res);
        data.value = isArr ? res : res[0].data;
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
    params: _params,
    data,
    error,
    run,
  };
}
