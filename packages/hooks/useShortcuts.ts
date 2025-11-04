import { type ComputedRef } from 'vue';
import { formatDate, isString, isObject } from '../utils/tools';

let _dateRange: ComputedRef<string[]>;
let _format: string = 'YYYY-MM-DD HH:mm:ss';

/**
 * 格式化日期数组
 * @param dates 日期对象数组
 * @param format 格式字符串
 * @returns 格式化后的日期字符串数组或Date对象数组
 */
const formatDates = (dates: Date[], format?: string): Array<string | Date> => {
  const fmt = format || _format;
  return dates.map(date => formatDate(date, fmt));
};

/**
 * 获取今天的开始和结束时间
 */
const getToday = (format?: string) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取昨天的开始和结束时间
 */
const getYesterday = (format?: string) => {
  const start = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  const end = _dateRange ? new Date(_dateRange.value[1]) : new Date();
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取本周的开始时间到今天
 */
const getThisWeek = (format?: string) => {
  const now = new Date();
  const day = now.getDay(); // 0 (周日) 到 6 (周六)
  const diff = day === 0 ? 6 : day - 1; // 周一作为第一天
  const start = new Date(now);
  start.setDate(now.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取上周的开始和结束时间
 */
const getLastWeek = (format?: string) => {
  const now = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const start = new Date(now);
  start.setDate(now.getDate() - diff - 7);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setDate(now.getDate() - diff - 1);
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取本月第一天到今天
 */
const getThisMonth = (format?: string) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取上月第一天到上月最后一天
 */
const getLastMonth = (format?: string) => {
  const now = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取过去7天
 */
const getPast7Days = (format?: string) => {
  const end = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  end.setDate(end.getDate());
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  return formatDates([start, end], format);
};

/**
 * 获取过去30天
 */
const getPast30Days = (format?: string) => {
  const end = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  end.setDate(end.getDate());
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);
  return formatDates([start, end], format);
};

/**
 * 获取本年第一天到今天
 */
const getThisYear = (format?: string) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取上一年第一天到上一年最后一天
 */
const getLastYear = (format?: string) => {
  const now = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  const start = new Date(now.getFullYear() - 1, 0, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear() - 1, 11, 31);
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取本季度第一天到今天
 */
const getThisQuarter = (format?: string) => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), quarter * 3, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

/**
 * 获取上季度第一天到上季度最后一天
 */
const getLastQuarter = (format?: string) => {
  const now = _dateRange ? new Date(_dateRange.value[0]) : new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const lastQuarter = quarter === 0 ? 3 : quarter - 1;
  const year = quarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const start = new Date(year, lastQuarter * 3, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(year, lastQuarter * 3 + 3, 0);
  end.setHours(23, 59, 59, 999);
  return formatDates([start, end], format);
};

const shortcuts = [
  {
    text: '今日',
    value: () => getToday(),
  },
  {
    text: '昨日',
    value: () => getYesterday(),
  },
  {
    text: '本周',
    value: () => getThisWeek(),
  },
  {
    text: '上周',
    value: () => getLastWeek(),
  },
  {
    text: '本月',
    value: () => getThisMonth(),
  },
  {
    text: '上月',
    value: () => getLastMonth(),
  },
  {
    text: '过去7天',
    value: () => getPast7Days(),
  },
  {
    text: '过去30天',
    value: () => getPast30Days(),
  },
  {
    text: '本年',
    value: () => getThisYear(),
  },
  {
    text: '上一年',
    value: () => getLastYear(),
  },
  {
    text: '本季度',
    value: () => getThisQuarter(),
  },
  {
    text: '上季度',
    value: () => getLastQuarter(),
  },
];

type TDateRange = ComputedRef<string[]>;

interface IUseShortcutsOptions {
  dateRange?: TDateRange;
  format?: string;
}

export function useShortcuts(
  options?: IUseShortcutsOptions | TDateRange | string,
) {
  if (isString(options)) {
    _format = options;
  } else if (isObject(options)) {
    const { dateRange, format } = options as IUseShortcutsOptions;
    _dateRange = dateRange;
    _format = format;
  } else {
    _dateRange = options as TDateRange;
  }

  return {
    shortcuts,
    getToday,
    getYesterday,
    getThisWeek,
    getLastWeek,
    getThisMonth,
    getLastMonth,
    getPast7Days,
    getPast30Days,
    getThisYear,
    getLastYear,
    getThisQuarter,
    getLastQuarter,
  };
}
