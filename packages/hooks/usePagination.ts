import { computed, ref, watch, type Ref } from 'vue';
import type { PaginationProps } from 'element-plus';
import { omit } from 'lodash-es';
import { useRequest, type TService, type IOptions } from './useRequest';

interface IPagination {
  totalKey: string;
  pageSizeKey: string;
  currentPageKey: string;
}

export type TPageProps = Partial<IPagination> & Partial<PaginationProps>;

export interface IUsePaginationReturn {
  pageProps: Ref<TPageProps>;
  loading: Ref<boolean>;
  params: Ref<any>;
  pageSize: Ref<number>;
  currentPage: Ref<number>;
  data: Ref<any>;
  run: () => void;
}

export function usePagination(
  service: TService,
  options: IOptions & { pagination?: TPageProps },
): IUsePaginationReturn {
  const { params: defaultParams, pagination } = options;

  const {
    totalKey = 'total',
    pageSizeKey = 'pageSize',
    currentPageKey = 'currentPage',
    pageSize = 10,
    currentPage = 1,
  } = pagination || {};

  const { loading, params, data, run } = useRequest(service, {
    ...omit(options, ['params', 'pagination']),
    params: {
      ...defaultParams.value,
      [pageSizeKey]: pageSize,
      [currentPageKey]: currentPage,
    },
  });

  const pageProps = ref({
    background: true,
    hideOnSinglePage: true,
    layout: 'total, sizes, prev, pager, next',
    ...pagination,
    [totalKey]: computed(() => data.value?.[totalKey] || 0),
  });

  const _pageSize = ref(params.value[pageSizeKey]);
  const _currentPage = ref(params.value[currentPageKey]);

  watch(
    () => [_pageSize, _currentPage],
    () => {
      params.value[pageSizeKey] = _pageSize.value;
      params.value[currentPageKey] = _currentPage.value;
      run();
    },
    {
      deep: true,
    },
  );

  return {
    pageProps,
    loading,
    params,
    pageSize: _pageSize,
    currentPage: _currentPage,
    data,
    run,
  };
}
