# Introduction

## JSON 2 TableWithFilters

>  基于 [Ant Design 5.0](https://ant.design/index-cn) 组件库，使用 json 数组直接生成带有过滤条件的 Table 组件。
>
>  过滤条件、数据请求和数据展示通过 [useAntdTable - ahooks 3.0](https://ahooks.js.org/zh-CN/hooks/use-antd-table) 实现。

### 代码示例

```tsx
const filters = [
  { name: "id", label: "ID", type: "Input" },
  {
    name: "gender", label: "性别", type: "Select", initialValue: "",
    options: [
      { value: "", label: "全部" },
      { value: "male", label: "男" },
      { value: "female", label: "女" },
    ]
  },
  { name: "name", label: "姓名", type: "Input" },
  { name: "email", label: "邮箱", type: "Input" },
  { name: "phone", label: "手机号码", type: "Input" },
  { name: "birthdate", label: "出生日期", type: "RangePicker", format: "YYYY-MM-DD" },
]

const TablePage = () => {
    return (<Table
    // ...
    filters={filters}
    rowKey={(record: any) => record.email}
    //...
    } />)
}
```

<img src="../../../assets/images/demo/image-20240710163624526.png" alt="image" style="zoom: 50%;" />

### 当前支持的 FilterItem 

1. InputFilter
2. SelectFilter
3. DateFilter
4. RangeFilter
5. TreeFilter
