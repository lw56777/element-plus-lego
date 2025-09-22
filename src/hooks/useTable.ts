import { computed, ref } from 'vue';
// import { useRequest } from '~/hooks/useRequset';
import { usePagination } from '~/hooks/usePagination';
import { getTableData } from '~/request';

interface IParams {
  keywords: string;
  region: string;
  date: string[];
  check: boolean;
}

class CParams implements IParams {
  keywords = '';
  region = '';
  date = [];
  check = false;
}

export function useTable() {
  const _params = ref(new CParams());

  // const { loading, params, data, run } = useRequest(getTableData, {
  //   data: [],
  //   params: _params,
  // });

  // 分页
  const { loading, params, data, run, pageProps, currentPage, pageSize } =
    usePagination(getTableData, {
      data: [],
      params: _params,
    });

  const search = () => {
    run();
  };

  const reset = () => {
    params.value = new CParams();
    run();
  };

  const refresh = () => {
    run();
  };

  const onAdd = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const onEdit = async (row: any) => {
    console.log('onEdit', row);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const onDelete = async (row: any) => {
    console.log('onDelete', row);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return {
    loading,
    data: computed(() => data.value?.list),
    params,
    search,
    reset,
    refresh,
    run,
    onAdd,
    onEdit,
    onDelete,
    pageProps,
    currentPage,
    pageSize,
  };
}
