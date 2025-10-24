export function isObject(val: any) {
  return typeof val === 'object' && val !== null;
}

// 判断值有没有发生变化，使用Object.is，因为NaN === NaN是false，所以需要使用Object.is
export function hasChanged(newValue: any, oldValue: any) {
  return !Object.is(newValue, oldValue);
}

export function isFunction(val: any) {
  return typeof val === 'function';
}

export function isOn(key: string) {
  return /^on[A-Z]/.test(key);
}

export const isArray = Array.isArray;

export function isString(value: any) {
  return typeof value === 'string';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}

export function getLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  if (!value) return;

  return JSON.parse(value);
}

// 获取指定区间内的随机整数
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min); // 确保最小值是整数
  max = Math.floor(max); // 确保最大值是整数

  return Math.floor(Math.random() * (max - min + 1)) + min; // 加1是因为包括最大值
}

// 数组转策略
export function arrayToStrategy(
  arr: any[],
  labelKey: string | Function,
  valueKey: string | Function,
) {
  const strategy: { [key: string]: any } = {};
  const labelKeyFn =
    typeof labelKey === 'function' ? labelKey : (item: any) => item[labelKey];
  const valueKeyFn =
    typeof valueKey === 'function' ? valueKey : (item: any) => item[valueKey];

  arr.forEach(item => {
    strategy[labelKeyFn(item)] = valueKeyFn(item);
  });

  return strategy;
}

// Fisher-Yates 洗牌算法
export function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
  }

  return arr;
}

// 16进制颜色值转RGBA
export function hexToRgba(hex: string, alpha: number = 1) {
  if (!hex) return '';

  // 将3位16进制颜色值转换为6位
  hex = hex.replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, function (r, g, b) {
    return '#' + r + r + g + g + b + b;
  });

  // 移除16进制字符串中的#符号
  hex = hex.replace('#', '');

  // 将16进制颜色值转换为十进制
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 返回RGBA格式的字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 判断两个数组是否完全相等
export function isEqualArray(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// 获取文本宽度
export function getTextWidth(content: string, fontSize: number) {
  const oSpan = document.createElement('span');

  oSpan.innerText = content;
  oSpan.style.fontSize = fontSize + 'px';
  oSpan.style.position = 'absolute';
  document.body.appendChild(oSpan);

  const width = oSpan.offsetWidth;

  document.body.removeChild(oSpan);

  return width;
}
