import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { DateFilterProps, DateRangeFilterProps, InputFilterProps, SelectFilterProps, TreeFilterProps } from "./type";

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
  // 解构props，提取placeholder和其他属性
  const { placeholder, ...otherProps } = props

  // 返回一个Form.Item组件，其中包含一个Input输入框，Input输入框具有placeholder和allowClear属性
  return <Form.Item {...otherProps}>
    <Input
      placeholder={placeholder || `请输入${otherProps.label}`}
      allowClear />
  </Form.Item>
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
  // 解构props，提取出placeholder、onChange、options以及其他剩余属性
  const { placeholder, onChange, options, ...otherProps } = props

  // 返回一个Form.Item组件，其中包含一个Select组件
  // Form.Item用于表单中的字段包装，提供校验、样式控制等功能
  // Select组件是一个下拉选择框，允许用户从一组选项中进行选择
  return <Form.Item {...otherProps}>
    <Select
      className="text-left"
      placeholder={placeholder || `请选择${otherProps.label}`}
      allowClear
      onChange={onChange}
      options={options} />
  </Form.Item>
};

const TreeFilter = (props: TreeFilterProps) => {

};

/**
 * 根据给定的值，返回对应的Date对象。
 * 此函数主要用于将可能的日期字符串转换为Date对象，以便进行后续的操作或比较。
 * 
 * @param value 任何类型的值，如果该值是有效的日期字符串，将被转换为Date对象。
 * @returns 返回Date对象，如果value不是有效的日期字符串或为空，则返回null。
 */
const getValueProps = (value: any) => (value && dayjs(value).toDate())

/**
 * 根据指定的格式规范化日期值。
 * 
 * 此函数用于处理传入的值，如果该值存在且是一个有效的时间戳或日期字符串，
 * 则将其转换为指定格式的日期字符串。这有助于统一日期的表示方式，
 * 以便在不同的上下文中使用。
 * 
 * @param value 任意类型的值，预期是时间戳或可以被dayjs解析的日期字符串。
 * @param format 字符串格式，指定输出的日期格式。参考dayjs的格式化文档以了解更多细节。
 * @returns 如果传入的值是有效的日期，则返回格式化后的日期字符串；否则返回空字符串。
 */
const normalizeValue = (value: any, format: any) => (value && dayjs(value).format(format))

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
  // 解构赋值，提取出 placeholder, onChange, format 以及其他的 props。
  const { placeholder, onChange, format = "YYYY-MM-DD", ...otherProps } = props

  // 返回一个 Form.Item 组件，该组件包含一个 DatePicker 组件。
  // Form.Item 组件使用了传递进来的其他 props，并通过 getValueProps 和 normalize 方法进行值的处理。
  // DatePicker 组件设置了 className, placeholder, allowClear, onChange 和 format 等属性，提供了日期选择、清除功能和格式化输出。
  return <Form.Item {...otherProps}
    getValueProps={getValueProps}
    normalize={value => normalizeValue(value, format)}
  >
    <DatePicker
      className="text-left w-full"
      placeholder={placeholder || `请选择${otherProps.label}`}
      allowClear
      onChange={onChange}
      format={format}
    />
  </Form.Item>
}
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
  // 解构props中的placeholder、onChange和format属性，并为format提供默认值"YYYY-MM-DD"。
  // 其他属性通过...otherProps收集，将传递给Form.Item组件。
  const { placeholder, onChange, format = "YYYY-MM-DD", ...otherProps } = props

  // 返回一个Form.Item组件，该组件使用了收集到的其他属性。
  // Form.Item通过getValueProps和normalize来处理日期选择器的值获取和格式化。
  // 在Form.Item内部，使用DatePicker.RangePicker组件来实际显示日期选择器。
  // DatePicker.RangePicker允许用户清除选择，并根据props中的format属性格式化显示日期。
  return <Form.Item {...otherProps}
    getValueProps={getValueProps}
    normalize={value => normalizeValue(value, format)}>
    <DatePicker.RangePicker
      className="text-center w-full"
      allowClear
      onChange={props.onChange}
      format={props.format} />
  </Form.Item>
}

export default { InputFilter, SelectFilter, DateFilter, RangeFilter };