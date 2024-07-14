import type {
  FormItemProps,
  SelectProps,
  TreeSelectProps,
  DatePickerProps,
  InputProps,
} from "antd";
import type { RangePickerProps } from "antd/lib/date-picker";

export type FILTER_ITEM_PROPS =
  | HiddenFilterProps
  | InputProps
  | SelectProps
  | DatePickerProps
  | RangePickerProps
  | TreeSelectProps;

export type FILTER_ITEM_TYPE =
  | "Hidden"
  | "Input"
  | "Select"
  | "DatePicker"
  | "RangePicker"
  | "TreeSelect";

export type BaseFilterProps<T extends FILTER_ITEM_PROPS> = FormItemProps &
  Omit<T, keyof FormItemProps> & {
    type: FILTER_ITEM_TYPE;
    span?: number;
  };

export interface InputFilterProps extends BaseFilterProps<InputProps> { }

export interface HiddenFilterProps extends Omit<BaseFilterProps<InputProps>, "placeholder"> { }

export interface SelectFilterProps extends BaseFilterProps<SelectProps> { }

export interface TreeFilterProps extends BaseFilterProps<TreeSelectProps> { }

export interface DateFilterProps extends BaseFilterProps<DatePickerProps> { }

export interface CustomFilterProps extends FormItemProps {
  element: (props: Partial<{ onChange?: (value: any) => void, value?: any }>) => JSX.Element
}

export interface DateRangeFilterProps
  extends BaseFilterProps<RangePickerProps> { }
