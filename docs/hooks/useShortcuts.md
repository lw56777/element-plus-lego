# useShortcuts

日期快捷选择 hook，为日期选择器提供常用的时间范围快捷选项。

## 功能特性

- 📅 12 种常用时间范围
- 🔄 支持相对时间计算
- 🎯 与 Element Plus DatePicker 完美集成
- ⚡ 自动处理时区和边界
- 🔁 **支持根据当前所选日期进行无限回跳** - 点击"上周"、"上月"、"过去x天"等过去式选项时，会基于当前选中的日期继续倒退时间
- 📅 **支持单选时间和时间范围选择** - 兼容 `type="date"` 和 `type="daterange"` 两种模式

## 基本用法

### 时间范围选择（daterange）

```vue
<template>
  <div>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      :shortcuts="shortcuts"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useShortcuts } from 'element-plus-lego';

const dateRange = ref([]);
const { shortcuts } = useShortcuts(computed(() => dateRange.value));
</script>
```

### 单选时间（date）

```vue
<template>
  <div>
    <el-date-picker
      v-model="singleDate"
      type="date"
      :shortcuts="shortcuts"
      placeholder="选择日期"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useShortcuts } from 'element-plus-lego';

const singleDate = ref('');
const { shortcuts } = useShortcuts(computed(() => singleDate.value ? [singleDate.value] : []));
</script>
```

## 无限回跳功能演示

**核心特性：** 当用户选择了某个日期后，再次点击过去式的快捷选项（如"上周"、"上月"、"过去7天"等），会基于当前选中的日期继续倒退时间，而不是基于今天。

```vue
<template>
  <div>
    <h4>无限回跳演示</h4>
    <p>当前选中：{{ dateRange[0] }} 至 {{ dateRange[1] }}</p>
    
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      :shortcuts="shortcuts"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    
    <div style="margin-top: 20px;">
      <h5>操作说明：</h5>
      <ol>
        <li>先选择"本月"，假设选中了 2024-01-01 至 2024-01-31</li>
        <li>再次点击"上月"，会基于 2024-01-01 倒退到 2023-12-01 至 2023-12-31</li>
        <li>继续点击"过去30天"，会基于 2023-12-01 倒退到 2023-11-01 至 2023-12-01</li>
        <li>这样实现了无限回跳功能</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useShortcuts } from 'element-plus-lego';

const dateRange = ref([]);
const { shortcuts } = useShortcuts(computed(() => dateRange.value));
</script>
```

## 自定义快捷选项

```vue
<script setup>
import { useShortcuts } from 'element-plus-lego';

const dateRange = ref([]);
const { shortcuts } = useShortcuts(computed(() => dateRange.value));

// 添加自定义快捷选项
const customShortcuts = [
  ...shortcuts,
  {
    text: '自定义范围',
    value: () => {
      const start = new Date();
      start.setDate(start.getDate() - 15);
      const end = new Date();
      return [start, end];
    }
  }
];
</script>
```

## 可用的快捷选项

| 选项 | 说明 | 时间范围 | 回跳特性 |
|------|------|----------|----------|
| 今日 | 今天 00:00:00 到 23:59:59 | 当天 | ❌ 不支持回跳 |
| 昨日 | 昨天 00:00:00 到 23:59:59 | 前一天 | ✅ 支持回跳 |
| 本周 | 本周一 00:00:00 到今天 23:59:59 | 周一到今天 | ❌ 不支持回跳 |
| 上周 | 上周一 00:00:00 到上周日 23:59:59 | 上一周 | ✅ 支持回跳 |
| 本月 | 本月1号 00:00:00 到今天 23:59:59 | 月初到今天 | ❌ 不支持回跳 |
| 上月 | 上月1号 00:00:00 到上月最后一天 23:59:59 | 上一月 | ✅ 支持回跳 |
| 过去7天 | 7天前 00:00:00 到今天 23:59:59 | 最近7天 | ✅ 支持回跳 |
| 过去30天 | 30天前 00:00:00 到今天 23:59:59 | 最近30天 | ✅ 支持回跳 |
| 本年 | 今年1月1号 00:00:00 到今天 23:59:59 | 年初到今天 | ❌ 不支持回跳 |
| 上一年 | 去年1月1号 00:00:00 到去年12月31号 23:59:59 | 上一年 | ✅ 支持回跳 |
| 本季度 | 本季度第一天 00:00:00 到今天 23:59:59 | 季度初到今天 | ❌ 不支持回跳 |
| 上季度 | 上季度第一天 00:00:00 到上季度最后一天 23:59:59 | 上一季度 | ✅ 支持回跳 |

## 回跳功能说明

**支持回跳的选项：** 昨日、上周、上月、过去7天、过去30天、上一年、上季度

**不支持回跳的选项：** 今日、本周、本月、本年、本季度

**回跳逻辑：**
- 当用户选择了某个日期后，再次点击支持回跳的快捷选项时
- 系统会基于当前选中的开始日期（`dateRange[0]`）作为基准点
- 然后按照快捷选项的逻辑继续倒退时间
- 这样实现了连续的时间倒退，而不是每次都基于今天计算

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dateRange | `ComputedRef<string[]>` | - | 当前选中的日期范围 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| shortcuts | `Array<{text: string, value: () => Date[]}>` | 快捷选项数组 |

## 使用场景

### 1. 在 EplSearch 中使用
```vue
<template>
  <div>
    <EplSearch
      v-model="searchParams"
      :items="searchItems"
      :emits="searchEmits"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { EplSearch } from '@element-plus-lego/components';
import { useShortcuts } from 'element-plus-lego';

const searchParams = ref({
  keywords: '',
  dateRange: []
});

const { shortcuts } = useShortcuts(computed(() => searchParams.value.dateRange));

const searchItems = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
    compProps: {
      placeholder: '请输入关键词'
    }
  },
  {
    label: '查询时间',
    prop: 'dateRange',
    compType: 'daterange',
    compProps: {
      shortcuts,
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    }
  }
]);

const searchEmits = [
  {
    type: 'primary',
    name: '搜索',
    onClick: handleSearch
  },
  {
    name: '重置',
    onClick: handleReset
  }
];

const handleSearch = () => {
  console.log('搜索参数', searchParams.value);
};

const handleReset = () => {
  searchParams.value = {
    keywords: '',
    dateRange: []
  };
};
</script>
```

### 2. 日志分析
```vue
<template>
  <div>
    <EplSearch
      v-model="logParams"
      :items="logItems"
      :emits="logEmits"
    />
  </div>
</template>

<script setup>
const logParams = ref({
  logLevel: '',
  dateRange: []
});

const { shortcuts } = useShortcuts(computed(() => logParams.value.dateRange));

const logItems = computed(() => [
  {
    label: '日志级别',
    prop: 'logLevel',
    compType: 'select',
    compProps: {
      placeholder: '请选择日志级别',
      options: [
        { label: 'ERROR', value: 'error' },
        { label: 'WARN', value: 'warn' },
        { label: 'INFO', value: 'info' },
        { label: 'DEBUG', value: 'debug' }
      ]
    }
  },
  {
    label: '时间范围',
    prop: 'dateRange',
    compType: 'daterange',
    compProps: {
      shortcuts,
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
]);
</script>
```

### 3. 统计图表
```vue
<template>
  <div>
    <EplSearch
      v-model="chartParams"
      :items="chartItems"
      :emits="chartEmits"
    />
    <div ref="chartContainer"></div>
  </div>
</template>

<script setup>
const chartParams = ref({
  chartType: '',
  dateRange: []
});

const { shortcuts } = useShortcuts(computed(() => chartParams.value.dateRange));

const chartItems = computed(() => [
  {
    label: '图表类型',
    prop: 'chartType',
    compType: 'select',
    compProps: {
      placeholder: '请选择图表类型',
      options: [
        { label: '折线图', value: 'line' },
        { label: '柱状图', value: 'bar' },
        { label: '饼图', value: 'pie' }
      ]
    }
  },
  {
    label: '统计时间',
    prop: 'dateRange',
    compType: 'daterange',
    compProps: {
      shortcuts,
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
]);
</script>
```
