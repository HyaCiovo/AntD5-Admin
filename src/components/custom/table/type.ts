import type { TableProps, GetProp, PaginationProps } from "antd";
import { FILTER_ITEM_TYPE } from "./filter/type";
export interface Result {
  total: number;
  list: any[];
}

export interface MyTableProps extends TableProps {
  showSearchButton?: boolean;
  showResetButton?: boolean;
  defaultPageSize?: number;
  showTotal?: GetProp<PaginationProps, "showTotal">;
  showSizeChanger?: GetProp<PaginationProps, "showSizeChanger">;
  showQuickJumper?: GetProp<PaginationProps, "showQuickJumper">;
  fetchData: (params: any) => Promise<Result>;
  exportFn?: () => Promise<any>;
  filters: { type: FILTER_ITEM_TYPE; [key: string]: any }[];
}
