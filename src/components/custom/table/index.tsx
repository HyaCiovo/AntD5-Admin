import { filterObjects } from "@/utils";
import { useAntdTable, useSize } from "ahooks";
import { Table, Button, Col, ConfigProvider, Form, Row } from "antd";
import { MyTableProps, Result } from "./type";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Filter from "./filter";

const TableWithFilters = (props: MyTableProps) => {
  const {
    fetchData,
    exportFn,
    filters,
    showResetButton = true,
    showSearchButton = true,
    defaultPageSize = 10,
    showTotal = (total) => `Total ${total}`,
    showQuickJumper = false,
    showSizeChanger = true,
  } = props;

  const [form] = Form.useForm();
  const [showCollapsed, setShowCollapsed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const size = useSize(document.querySelector("#filters"));

  // 根据size和showCollapsed的状态，决定是否需要设置为折叠状态
  useEffect(() => {
    // 如果size不存在或已显示为折叠状态，则不进行后续逻辑
    if (!size || showCollapsed) return;
    // 如果size的高度大于120，则将显示状态和实际折叠状态都设置为true
    if (size?.height > 120) {
      setShowCollapsed(true);
      setCollapsed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const getTableData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData?: object
  ): Promise<Result> => {
    const params = filterObjects({ current, pageSize, ...formData });
    // console.log("🚀 ~ getTableData ~ params:", params)
    return await fetchData(params);
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize,
  });

  const { submit, reset } = search;
  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
  };

  const Span: Record<string, number> = {
    RangePicker: 10,
    Hidden: 0,
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: { verticalLabelPadding: "0 0 4px" },
        },
      }}
    >
      <Form
        {...layout}
        layout="vertical"
        form={form}
        className="flex justify-between items-start"
      >
        <Row
          gutter={16}
          id="filters"
          className={`w-[74%] ${collapsed && "h-20 overflow-hidden"}`}
        >
          {filters.map((item) => (
            <Col
              span={item.span || Span[item.type] || 6}
              key={item.name}
              hidden={item.type === "Hidden"}
            >
              {item.type === "Hidden" && <Filter.HiddenFilter {...item} />}
              {item.type === "Input" && <Filter.InputFilter {...item} />}
              {item.type === "Select" && <Filter.SelectFilter {...item} />}
              {item.type === "TreeSelect" && <Filter.TreeFilter {...item} />}
              {item.type === "DatePicker" && <Filter.DateFilter {...item} />}
              {item.type === "RangePicker" && <Filter.RangeFilter {...item} />}
              {item.type === "Custom" && <Filter.CustomFilter {...item} />}
            </Col>
          ))}
        </Row>
        <Row
          justify="end"
          align="middle"
          gutter={[8, 8]}
          className="mt-[26px] pl-2 text-nowrap"
        >
          {showSearchButton && (
            <Col>
              <Button type="primary" onClick={submit}>
                SEARCH
              </Button>
            </Col>
          )}
          {showResetButton && (
            <Col>
              <Button onClick={reset}>RESET</Button>
            </Col>
          )}
          {exportFn && (
            <Col>
              <Button onClick={exportFn}>EXPORT</Button>
            </Col>
          )}
          {showCollapsed && (
            <Col>
              <Button
                type="link"
                className="px-0"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? "Expand" : "Collapse"}
                <DownOutlined
                  className={`${collapsed ? "rotate-0" : "rotate-180"}`}
                />
              </Button>
            </Col>
          )}
        </Row>
      </Form>
      <Table
        {...props}
        {...tableProps}
        className="border-t-border border-t border-t-solid"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger,
          showQuickJumper,
          showTotal,
        }}
      />
    </ConfigProvider>
  );
};

export default TableWithFilters;
