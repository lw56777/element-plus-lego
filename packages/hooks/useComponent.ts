import { h, ref, reactive, Component } from 'vue';
import type { ComponentInstance, Ref } from 'vue';

function proxyComponentInstance<TInstance extends object = object>() {
  const instance = ref<TInstance>();

  new Proxy(
    {},
    {
      has: () => true,
      get: (_, key) => Reflect.get(instance.value, key),
      set: (_, key, val) => Reflect.set(instance.value, key, val),
    },
  );

  return instance;
}

export type UseComponentReturn<TInstance extends object = object> = [
  Component,
  Ref<TInstance | undefined>,
] & {
  Component: Component;
  instance: Ref<TInstance | undefined>;
};

export function useComponent<
  TComp extends Component,
  TInstance extends object = ComponentInstance<TComp>,
>(
  component: TComp,
): <TProps extends Record<string, any> = Record<string, any>>(
  props: TProps,
) => UseComponentReturn<TInstance> {
  return props => {
    const instance = proxyComponentInstance<TInstance>();

    const Component = (_: unknown, { slots }: { slots: any }) => {
      return h(
        component as Component,
        { ...reactive(props), ref: instance },
        slots,
      );
    };

    return Object.assign(
      [Component, instance] as [Component, Ref<TInstance | undefined>],
      { Component, instance },
    );
  };
}
