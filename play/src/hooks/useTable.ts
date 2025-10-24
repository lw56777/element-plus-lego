import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { usePagination } from '@element-plus-pro/hooks';
import { useElpDialog } from '@element-plus-pro/components';
import { getTableData } from '~/request';
import DialogContent from '~/components/DialogContent.vue';

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

export function useTable(service?: any) {
  const { loading, params, data, run, pageProps, pageSize, currentPage } =
    usePagination(service || getTableData, {
      initData: [],
      params: new CParams(),
    });

  const search = () => {
    run();
  };

  const reset = () => {
    params.value = {
      ...params.value,
      ...new CParams(),
    };
    run();
  };

  const refresh = () => {
    run();
  };

  const onAdd = () => {
    openDialog();
  };

  const onEdit = (row: any) => {
    openDialog(row);
  };

  const openDialog = (row?: any) => {
    const { createCancel, createConfirm } = useElpDialog(
      DialogContent,
      {
        row,
      },
      {
        title: row ? '编辑数据' : '添加数据',
        closeOnClickModal: false,
        footer: () => [createCancel(), createConfirm()],
        cb: refresh,
      },
    );
  };

  const onDelete = async (row: any) => {
    const { createConfirm, createCancel } = useElpDialog(
      '确定要删除吗？',
      {
        row,
      },
      {
        title: '删除数据',
        closeOnClickModal: false,
        width: '420px',
        footer: () => [
          createCancel(),
          createConfirm({
            click: async () => {
              await await new Promise(resolve => setTimeout(resolve, 1000));
              ElMessage.success('删除成功');
              refresh();
            },
          }),
        ],
      },
    );
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
    pageSize,
    currentPage,
  };
}
