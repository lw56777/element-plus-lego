import { type ComputedRef } from 'vue';

let _dateRange: ComputedRef<string[]>;

/**
 * 获取今天的开始和结束时间
 */
const getToday = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取昨天的开始和结束时间
 */
const getYesterday = () => {
  const start = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  const end = _dateRange.value ? new Date(_dateRange.value[1]) : new Date();
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取本周的开始时间到今天
 */
const getThisWeek = () => {
  const now = new Date();
  const day = now.getDay(); // 0 (周日) 到 6 (周六)
  const diff = day === 0 ? 6 : day - 1; // 周一作为第一天
  const start = new Date(now);
  start.setDate(now.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取上周的开始和结束时间
 */
const getLastWeek = () => {
  const now = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const start = new Date(now);
  start.setDate(now.getDate() - diff - 7);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setDate(now.getDate() - diff - 1);
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取本月第一天到今天
 */
const getThisMonth = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取上月第一天到上月最后一天
 */
const getLastMonth = () => {
  const now = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取过去7天
 */
const getPast7Days = () => {
  const end = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  end.setDate(end.getDate());
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  return [start, end];
};

/**
 * 获取过去30天
 */
const getPast30Days = () => {
  const end = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  end.setDate(end.getDate());
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);
  return [start, end];
};

/**
 * 获取本年第一天到今天
 */
const getThisYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取上一年第一天到上一年最后一天
 */
const getLastYear = () => {
  const now = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  const start = new Date(now.getFullYear() - 1, 0, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear() - 1, 11, 31);
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取本季度第一天到今天
 */
const getThisQuarter = () => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), quarter * 3, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return [start, end];
};

/**
 * 获取上季度第一天到上季度最后一天
 */
const getLastQuarter = () => {
  const now = _dateRange.value ? new Date(_dateRange.value[0]) : new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const lastQuarter = quarter === 0 ? 3 : quarter - 1;
  const year = quarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const start = new Date(year, lastQuarter * 3, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(year, lastQuarter * 3 + 3, 0);
  end.setHours(23, 59, 59, 999);
  return [start, end];
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

export function useShortcuts(dateRange: ComputedRef<string[]>) {
  if (dateRange) {
    _dateRange = dateRange;
  }

  return {
    shortcuts,
  };
}
