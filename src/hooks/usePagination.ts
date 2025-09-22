import { computed, ref, watch } from 'vue';
import type { PaginationProps } from 'element-plus';
import { useRequest, type TService, type IOptions } from '~/hooks/useRequset';

interface IPagination {
  totalKey: string;
  pageSizeKey: string;
  currentPageKey: string;
}

export type TPageProps = Partial<IPagination> & Partial<PaginationProps>;

export function usePagination(service: TService, options: IOptions) {
  const { params: defaultParams, pagination } = options;

  const {
    totalKey = 'total',
    pageSizeKey = 'pageSize',
    currentPageKey = 'currentPage',
    pageSize = 10,
    currentPage = 1,
  } = pagination || {};

  const _params = {
    ...defaultParams.value,
    [pageSizeKey]: pageSize,
    [currentPageKey]: currentPage,
  };

  const { loading, params, data, run } = useRequest(service, {
    ...options,
    params: _params,
  });

  const pageProps = ref({
    background: true,
    hideOnSinglePage: true,
    layout: 'total, sizes, prev, pager, next',
    ...pagination,
    [totalKey]: computed(() => data.value?.[totalKey] || 0),
  });

  const _currentPage = ref(params.value[currentPageKey]);
  const _pageSize = ref(params.value[pageSizeKey]);

  watch(
    () => [_currentPage, _pageSize],
    () => {
      params.value[currentPageKey] = _currentPage.value;
      params.value[pageSizeKey] = _pageSize.value;
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
    currentPage: _currentPage,
    pageSize: _pageSize,
    data,
    run,
  };
}
