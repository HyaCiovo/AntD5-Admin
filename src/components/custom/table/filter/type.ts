import type {
  FormItemProps,
  SelectProps,
  TreeSelectProps,
  DatePickerProps,
  InputProps,
  RadioGroupProps,
} from "antd";
import type { RangePickerProps } from "antd/lib/date-picker";

export type FILTER_ITEM_PROPS =
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
  | "Tabs";

export type BaseFilterProps<T extends FILTER_ITEM_PROPS> = FormItemProps &
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
  element: (
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

export interface TabsFilterProps extends BaseFilterProps<RadioGroupProps> {}

export interface DateRangeFilterProps
  extends BaseFilterProps<RangePickerProps> {}
