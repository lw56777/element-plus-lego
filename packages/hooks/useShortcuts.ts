import { type ComputedRef } from 'vue';
import { formatDate, isArray } from '../utils/tools';

type TDateValue = ComputedRef<string | string[]>;

interface IUseShortcutsOptions {
  type?: 'point' | 'range';
  dateValue?: TDateValue;
  format?: string;
}

export function useShortcuts(
  options?: IUseShortcutsOptions | TDateValue | string,
) {
  const {
    type = 'range',
    dateValue,
    format: _format = 'YYYY-MM-DD HH:mm:ss',
  } = (options as IUseShortcutsOptions) || {};
  const _dateValue = dateValue || (options as TDateValue);
  // 记录上次点击的时间段标识
  let lastClickedShortcut: string | null = null;

  // 获取已选择的日期作为基准时间
  const getSelectedDateValue = () => {
    if (_dateValue?.value) {
      if (isArray(_dateValue.value)) {
        const [start, end] = _dateValue.value;
        return [
          start ? new Date(start) : new Date(),
          end ? new Date(end) : new Date(),
        ];
      }
      return [new Date(_dateValue.value), new Date(_dateValue.value)];
    }
    return [new Date(), new Date()];
  };

  // 获取真实当前时间
  const getCurrentDateValue = () => [new Date(), new Date()];

  // 高阶函数：包装时间段计算函数，自动处理点击跟踪逻辑
  const withShortcutTracking = <T extends (...args: any[]) => any>(
    shortcutId: string,
    fn: (baseDate: Date[], format: string) => ReturnType<T>,
    useSelectedDate: boolean = false,
  ) => {
    return (format: string = _format) => {
      const isRepeatClick = lastClickedShortcut === shortcutId;
      const baseDate =
        isRepeatClick && useSelectedDate
          ? getSelectedDateValue()
          : getCurrentDateValue();

      if (!isRepeatClick) {
        lastClickedShortcut = shortcutId;
      }

      return fn(baseDate, format);
    };
  };

  // 格式化返回结果
  const formatDates = (dates: Date[], format = _format) => {
    let res;

    if (type === 'range') {
      res = dates.map(date => formatDate(date, format));
    } else if (type === 'point') {
      res = formatDate(dates[0], format);
    }

    return res;
  };

  // 时间段计算函数（纯函数，只负责日期计算）
  const calculateToday = (_baseDate: Date[], format: string) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateYesterday = (baseDate: Date[], format: string) => {
    const [start, end] = baseDate.map(d => new Date(d));
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateThisWeek = (_baseDate: Date[], format: string) => {
    const now = new Date();
    const day = now.getDay(); // 0 (周日) 到 6 (周六)
    const diff = day === 0 ? 6 : day - 1; // 周一作为第一天
    const start = new Date(now);
    start.setDate(now.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    // 结束时间设置为本周日
    end.setDate(now.getDate() - diff + 6);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateLastWeek = (baseDate: Date[], format: string) => {
    const [now] = baseDate.map(d => new Date(d));
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

  const calculateThisMonth = (_baseDate: Date[], format: string) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    // 结束时间设置为本月最后一天
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateLastMonth = (baseDate: Date[], format: string) => {
    const [now] = baseDate.map(d => new Date(d));
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculatePast7Days = (baseDate: Date[], format: string) => {
    const [end] = baseDate.map(d => new Date(d));
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return formatDates([start, end], format);
  };

  const calculatePast30Days = (baseDate: Date[], format: string) => {
    const [end] = baseDate.map(d => new Date(d));
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(start.getDate() - 29);
    start.setHours(0, 0, 0, 0);
    return formatDates([start, end], format);
  };

  const calculateThisYear = (_baseDate: Date[], format: string) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    // 结束时间设置为本年12月31日
    const end = new Date(now.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateLastYear = (baseDate: Date[], format: string) => {
    const [now] = baseDate.map(d => new Date(d));
    const start = new Date(now.getFullYear() - 1, 0, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now.getFullYear() - 1, 11, 31);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateThisQuarter = (_baseDate: Date[], format: string) => {
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3);
    const start = new Date(now.getFullYear(), quarter * 3, 1);
    start.setHours(0, 0, 0, 0);
    // 结束时间设置为本季度最后一天
    const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const calculateLastQuarter = (baseDate: Date[], format: string) => {
    const [now] = baseDate.map(d => new Date(d));
    const quarter = Math.floor(now.getMonth() / 3);
    const lastQuarter = quarter === 0 ? 3 : quarter - 1;
    const year = quarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const start = new Date(year, lastQuarter * 3, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(year, lastQuarter * 3 + 3, 0);
    end.setHours(23, 59, 59, 999);
    return formatDates([start, end], format);
  };

  const getToday = withShortcutTracking('today', calculateToday, false);
  const getYesterday = withShortcutTracking(
    'yesterday',
    calculateYesterday,
    true,
  );
  const getThisWeek = withShortcutTracking(
    'thisWeek',
    calculateThisWeek,
    false,
  );
  const getLastWeek = withShortcutTracking('lastWeek', calculateLastWeek, true);
  const getThisMonth = withShortcutTracking(
    'thisMonth',
    calculateThisMonth,
    false,
  );
  const getLastMonth = withShortcutTracking(
    'lastMonth',
    calculateLastMonth,
    true,
  );
  const getPast7Days = withShortcutTracking(
    'past7Days',
    calculatePast7Days,
    true,
  );
  const getPast30Days = withShortcutTracking(
    'past30Days',
    calculatePast30Days,
    true,
  );
  const getThisYear = withShortcutTracking(
    'thisYear',
    calculateThisYear,
    false,
  );
  const getLastYear = withShortcutTracking('lastYear', calculateLastYear, true);
  const getThisQuarter = withShortcutTracking(
    'thisQuarter',
    calculateThisQuarter,
    false,
  );
  const getLastQuarter = withShortcutTracking(
    'lastQuarter',
    calculateLastQuarter,
    true,
  );

  const shortcuts = [
    {
      text: '今日',
      value: () => getToday(_format),
    },
    {
      text: '昨日',
      value: () => getYesterday(_format),
    },
    {
      text: '本周',
      value: () => getThisWeek(_format),
    },
    {
      text: '上周',
      value: () => getLastWeek(_format),
    },
    {
      text: '本月',
      value: () => getThisMonth(_format),
    },
    {
      text: '上月',
      value: () => getLastMonth(_format),
    },
    {
      text: '过去7天',
      value: () => getPast7Days(_format),
    },
    {
      text: '过去30天',
      value: () => getPast30Days(_format),
    },
    {
      text: '本年',
      value: () => getThisYear(_format),
    },
    {
      text: '上一年',
      value: () => getLastYear(_format),
    },
    {
      text: '本季度',
      value: () => getThisQuarter(_format),
    },
    {
      text: '上季度',
      value: () => getLastQuarter(_format),
    },
  ];

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
