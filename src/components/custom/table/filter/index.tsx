import { DatePicker, Form, FormInstance, Input, Radio, Select, TreeSelect } from "antd";
import dayjs from "dayjs";
import {
  DateFilterProps,
  DateRangeFilterProps,
  InputFilterProps,
  SelectFilterProps,
  TreeFilterProps,
  HiddenFilterProps,
  CustomFilterProps,
  RadioFilterProps,
  FILTER_ITEM_TYPE,
} from "./type";
import React from "react";

const HiddenFilter = (props: HiddenFilterProps) => {
  return (
    <Form.Item {...props}>
      <Input />
    </Form.Item>
  );
};

/**
 * 输入框组件过滤器，用于在表单中集成带清除功能的输入框。
 *
 * 该组件主要通过解构props获取placeholder和其他输入框属性，然后传递给Form.Item和Input组件。
 * 如果没有提供placeholder，则默认为`请输入${otherProps.label}`，这样可以确保输入框总是有提示文本。
 *
 * @param props 输入过滤器的属性，包括placeholder和其他传递给Form.Item和Input的属性。
 * @returns 返回一个封装了Input和Form.Item的组件，提供带清除功能的输入框。
 */
const InputFilter = (props: InputFilterProps) => {
  const { placeholder, ...otherProps } = props;

  return (
    <Form.Item {...otherProps} className={`text-left ${otherProps.className}`}>
      <Input
        placeholder={placeholder || `Enter ${otherProps.label}`}
        allowClear
      />
    </Form.Item>
  );
};

/**
 * 自定义选择过滤器组件。
 *
 * 该组件用于在表单中集成一个下拉选择框，提供可选的选项给用户进行选择。
 * 它接受一系列的属性来定制这个选择框的行为和外观。
 *
 * @param props 组件的属性对象，包含以下属性：
 * @param placeholder 选择框的占位符文本，当选择框为空时显示。
 * @param onChange 当选择项发生改变时的回调函数。
 * @param options 下拉选择框中的选项数组。
 * @param otherProps 其他传递给Form.Item组件的属性，可以用于定制表单项的行为和外观。
 * @returns 返回一个封装了下拉选择框的表单项组件。
 */
const SelectFilter = (props: SelectFilterProps) => {
  const { placeholder, onChange, options, ...otherProps } = props;

  return (
    <Form.Item {...otherProps} className={`text-left ${otherProps.className}`}>
      <Select
        className="text-left"
        placeholder={placeholder || `Select ${otherProps.label}`}
        allowClear
        onChange={onChange}
        options={options}
      />
    </Form.Item>
  );
};

/**
 * 树形筛选组件。
 *
 * 该组件用于提供一个树形选择器，允许用户从一个层次结构的数据集中选择一项或多项。
 * 它被设计为表单的一部分，可以集成到Ant Design的Form.Item中，提供占位符、数据和变化处理函数等配置。
 *
 * @param props - 组件的属性。
 * @param props.placeholder - 输入框的占位符，如果没有提供，则默认为"Select ${otherProps.label}"。
 * @param props.onChange - 当选择项发生变化时的回调函数。
 * @param props.treeData - 树形选择器的数据源。
 * @param otherProps - 其他传递给Form.Item的属性，例如label、name等。
 * @returns 返回一个包装在Form.Item内的TreeSelect组件。
 */
const TreeFilter = (props: TreeFilterProps) => {
  const { placeholder, onChange, treeData, ...otherProps } = props;
  return (
    <Form.Item {...otherProps} className={`text-left ${otherProps.className}`}>
      <TreeSelect
        className="text-left"
        placeholder={placeholder || `Select ${otherProps.label}`}
        allowClear
        onChange={onChange}
        treeData={treeData}
      />
    </Form.Item>
  );
};

/**
 * DateFilter 是一个用于日期选择的组件，它封装了 Ant Design 的 DatePicker 组件。
 * 该组件主要用于表单中，提供日期选择功能，并能根据传入的属性进行自定义。
 *
 * @param props DateFilterProps 类型的属性对象，包含以下属性：
 * - placeholder: 日期选择框的占位符。
 * - onChange: 日期选择变化时的回调函数。
 * - format: 日期的显示格式，默认为 "YYYY-MM-DD"。
 * - otherProps: 其他传递给 Form.Item 组件的属性。
 *
 * @returns 返回一个 Form.Item 组件，其中包含一个 DatePicker 组件，用于日期选择。
 */
const DateFilter = (props: DateFilterProps) => {
  const { placeholder, onChange, format = "YYYY-MM-DD", ...otherProps } = props;
  const normalizeValue = (value: any, format: any) =>
    value && dayjs(value).format(format);

  const getValueProps = (value: any) => value && dayjs(value).toDate();
  return (
    <Form.Item
      {...otherProps}
      getValueProps={getValueProps}
      className={`text-left ${otherProps.className}`}
      normalize={(value) => normalizeValue(value, format)}
    >
      <DatePicker
        className="text-left w-full"
        allowClear
        onChange={onChange}
        format={format}
      />
    </Form.Item>
  );
};
/**
 * RangeFilter 是一个用于日期范围筛选的组件。
 *
 * 该组件接受一个包含日期范围筛选属性的对象，并渲染一个日期选择器，用户可以选择一个日期范围。
 * 当选择器的值改变时，会触发onChange事件回调，允许父组件响应日期范围的变化。
 *
 * @param props 一个包含日期范围筛选属性的对象，包括placeholder、onChange和format等属性。
 * @returns 返回一个Form.Item组件，其中嵌套了一个DatePicker.RangePicker组件，用于选择日期范围。
 */
const RangeFilter = (props: DateRangeFilterProps) => {
  const { placeholder, onChange, format = "YYYY-MM-DD", ...otherProps } = props;
  const normalizeValue = (value: any, format: any) =>
    value && [dayjs(value[0]).format(format), dayjs(value[1]).format(format)];
  const getValueProps = (value: any) =>
    value && [dayjs(value[0]).toDate(), dayjs(value[1]).toDate()];

  // Form.Item通过getValueProps和normalize来处理日期选择器的值获取和格式化。
  return (
    <Form.Item
      {...otherProps}
      getValueProps={getValueProps}
      className={`text-left ${otherProps.className}`}
      normalize={(value) => normalizeValue(value, format)}
    >
      <DatePicker.RangePicker
        className="text-center w-full"
        allowClear
        onChange={props.onChange}
        format={props.format}
      />
    </Form.Item>
  );
};

/**
 * CustomFilter 是一个自定义过滤器组件。
 * 
 * 该组件接受一个包含元素和其他属性的 props 对象，并渲染一个表单项（Form.Item）。
 * 其中，元素（element）属性用于指定要创建的 React 元素，其他属性（otherProps）则会传递给 Form.Item 组件。
 * 
 * @param props CustomFilterProps 类型的对象，包含 element 和其他任意属性。
 * @returns 返回一个 Form.Item 组件，其中包含一个带有指定 id 的 span 元素，该 span 元素的内容是通过 element 属性创建的 React 元素。
 */
const CustomFilter = (props: CustomFilterProps) => {
  // 解构 props，提取 element 属性，并将其他属性打包到 otherProps 中
  const { element, ...otherProps } = props;
  // 返回一个 Form.Item 组件，其中 otherProps 用于配置 Form.Item 的属性，span 元素用于展示 element 属性指定的 React 元素
  return (
    <Form.Item {...otherProps} className={`text-left ${otherProps.className}`}>
      {element && React.createElement(element)}
    </Form.Item>
  );
};

const RadioFilter = (props: RadioFilterProps) => {
  const { options, optionType = "button", ...otherProps } = props

  return (
    <Form.Item {...otherProps} className={`text-left ${otherProps.className}`}>
      <Radio.Group optionType={optionType} options={options} />
    </Form.Item>
  )
}

export const Span: Record<FILTER_ITEM_TYPE, number> = {
  Hidden: 0,
  Input: 6,
  Select: 6,
  TreeSelect: 6,
  DatePicker: 6,
  RangePicker: 10,
  Custom: 6,
  Radio: 24
}


export default {
  HiddenFilter,
  InputFilter,
  SelectFilter,
  TreeFilter,
  DateFilter,
  RangeFilter,
  CustomFilter,
  RadioFilter,
};
