import { createApp, h, ref } from 'vue';
import type { VNode, Component } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import type { DialogProps, ButtonProps } from 'element-plus';
import { isString } from '~/utils/tools';

export type TDialogProps = Partial<DialogProps> & {
  footer?: (() => VNode) | (() => VNode[]) | Component;
};

type TFooterBtnProps = Partial<ButtonProps> & {
  name?: string; // 按钮名称
  hidden?: boolean; // 是否执行完毕后关闭
  click?: string | ((...args: any[]) => void); // 事件名称/点击事件
};

export function useBaDialog(
  componet: Component | (() => VNode) | string,
  props: Record<string, any>,
  DialogProps: TDialogProps,
) {
  if (isString(componet)) {
    const text = componet;
    componet = () => h('div', text);
  }

  const modal = ref(true);
  const instnce = ref();

  const dialog = () =>
    h(
      ElDialog,
      {
        ...DialogProps,
        modelValue: modal.value,
      },
      {
        default: () => h(componet, { ref: instnce, ...props }),
        footer: DialogProps.footer,
      },
    );

  const app = createApp(dialog);
  const div = document.createElement('div');
  document.body.appendChild(div);
  app.mount(div);

  const close = () => {
    modal.value = false;
  };

  const createConfirm = (props?: string | TFooterBtnProps) => {
    const Component = {
      setup() {
        const _props = {
          name: '确认',
          hidden: true,
          click: 'confirm',
          ...(isString(props) ? { name: props } : props),
        };
        const { name, hidden, click } = _props;
        const loading = ref(false);

        const onClick = async () => {
          try {
            loading.value = true;

            if (isString(click)) {
              await instnce.value?.[click]?.();
            } else {
              await click?.(instnce.value);
            }

            hidden && close();
          } catch (error) {
            throw error;
          } finally {
            loading.value = false;
          }
        };

        return () =>
          h(
            ElButton,
            {
              loading: loading.value,
              type: 'primary',
              onClick,
              ..._props,
            },
            () => name,
          );
      },
    };

    return h(Component);
  };

  const createCancel = (
    name: string = '取消',
    props?: Partial<ButtonProps>,
  ) => {
    const Component = {
      setup() {
        return () => h(ElButton, { ...props, onClick: close }, () => name);
      },
    };

    return h(Component);
  };

  return {
    instnce,
    close,
    createConfirm,
    createCancel,
  };
}
