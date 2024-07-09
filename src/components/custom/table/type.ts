import { TableProps } from "antd";

export interface MyTableProps extends TableProps {
  showSearchButton?: boolean;
  showResetButton?: boolean;
  fetchData: (params: any) => Promise<any>;
  exportFn?: () => Promise<any>;
  // filters: any[];
}

/**
 * FormItem渲染逻辑
 * 渲染item逻辑相对复杂
 * 独立出来，方便维护
 * 可监听onchange事件，第一个参数是form，原始的事件参数将后移一位
 */
export interface BaseItem {
  label: string;
  name: string;
  value?: string;
  rules?: ValidationRule[];
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  labelSpan?: number;
  onChange?: (form: WrappedFormUtils, ...args: any[]) => void;
  maxLength: number;
}
