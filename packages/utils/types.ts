import type { Component, VNode } from 'vue';

// 把指定类型中的指定属性变成可选
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 把指定类型中的指定属性变成必选
type Compulsory<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type TCompType = string | (() => VNode) | Component;

export type { Optional, Compulsory, TCompType };
