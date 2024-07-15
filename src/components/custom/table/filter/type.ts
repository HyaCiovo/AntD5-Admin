import type {
  FormItemProps,
  SelectProps,
  TreeSelectProps,
  DatePickerProps,
  InputProps,
  RadioGroupProps,
} from "antd";
import type { RangePickerProps } from "antd/lib/date-picker";

export type FILTER_PROPS =
  | HiddenFilterProps
  | InputProps
  | SelectProps
  | DatePickerProps
  | RangePickerProps
  | TreeSelectProps
  | RadioGroupProps;

export type FILTER_ITEM_TYPE =
  | "Hidden"
  | "Input"
  | "Select"
  | "DatePicker"
  | "RangePicker"
  | "TreeSelect"
  | "Custom"
  | "Radio";

export type BaseFilterProps<T extends FILTER_PROPS> = FormItemProps &
  Omit<T, keyof FormItemProps> & {
    type: FILTER_ITEM_TYPE;
    span?: number;
  };

export interface InputFilterProps extends BaseFilterProps<InputProps> {}

export interface HiddenFilterProps
  extends Omit<BaseFilterProps<InputProps>, "placeholder"> {}

export interface SelectFilterProps extends BaseFilterProps<SelectProps> {}

export interface TreeFilterProps extends BaseFilterProps<TreeSelectProps> {}

export interface DateFilterProps extends BaseFilterProps<DatePickerProps> {}

export interface CustomFilterProps extends FormItemProps {
  type: FILTER_ITEM_TYPE;
  span?: number;
  element?: (
    props: Partial<{
      onChange?: (value: any) => void;
      value?: any;
      /**
       * 传递 id 属性到 dom 以支持 scrollToField 方法。
       * *此处默认不需要支持。
       */
      id?: string;
    }>
  ) => JSX.Element;
}

export interface RadioFilterProps extends BaseFilterProps<RadioGroupProps> {}

export interface DateRangeFilterProps
  extends BaseFilterProps<RangePickerProps> {}

export type FilterItemProps =
  | InputFilterProps
  | SelectFilterProps
  | TreeFilterProps
  | DateFilterProps
  | DateRangeFilterProps
  | HiddenFilterProps
  | CustomFilterProps
  | RadioFilterProps;
