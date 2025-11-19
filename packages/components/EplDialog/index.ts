import { createApp, h, ref } from 'vue';
import type { VNode, Component } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import type { DialogProps, ButtonProps } from 'element-plus';
import { isString } from '@element-plus-lego/utils';

export type TDialogProps = Partial<DialogProps> & {
  footer?: (() => VNode) | (() => VNode[]) | Component;
  cb?: null | (() => void);
};

type TFooterBtnProps = Partial<ButtonProps> & {
  name?: string; // 按钮名称
  hidden?: boolean; // 是否隐藏
  autoClose?: boolean; // 是否执行完毕后自动关闭弹窗
  click?: string | ((...args: any[]) => void); // 事件名称/点击事件
};

export function useEplDialog(
  componet: Component | (() => VNode) | string,
  props: Record<string, any>,
  DialogProps: TDialogProps,
) {
  if (isString(componet)) {
    const text = componet;
    componet = () => h('div', text);
  }

  const modal = ref(true);
  const instance = ref();
  const disabled = ref(false);
  const cb = DialogProps.cb;

  const dialog = () =>
    h(
      ElDialog,
      {
        ...DialogProps,
        modelValue: modal.value,
      },
      {
        default: () => h(componet, { ref: instance, ...props }),
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
          hidden: false,
          autoClose: true,
          click: 'confirm',
          ...(isString(props) ? { name: props } : props),
        };
        const { name, hidden, autoClose, click } = _props;
        const loading = ref(false);

        const onClick = async () => {
          try {
            loading.value = true;
            disabled.value = true;

            if (isString(click)) {
              await instance.value?.[click]?.();
            } else {
              await click?.(instance);
            }

            cb?.();

            autoClose && close();
          } catch (error) {
            throw error;
          } finally {
            loading.value = false;
            const t = setTimeout(() => {
              disabled.value = false;
              clearTimeout(t);
            }, 200);
          }
        };

        return () =>
          !hidden &&
          h(
            ElButton,
            {
              loading: loading.value,
              type: 'primary',
              disabled: disabled.value,
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
    instance,
    close,
    createConfirm,
    createCancel,
  };
}
