import { filterObjects } from "@/utils";
import { useAntdTable } from "ahooks";
import { Table as AntdTable, Button, Col, ConfigProvider, Form, Input, Row } from "antd";
import { MyTableProps, Result } from "./type";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const Table = (props: MyTableProps) => {
  const {
    fetchData,
    exportFn,
    filters,
    showResetButton = true,
    showSearchButton = true,
    defaultPageSize = 10,
    showTotal = (total) => `共 ${total} 条`,
    showQuickJumper = true,
    showSizeChanger = true,
  } = props;

  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(true);

  const getTableData = async (
    { current, pageSize }: { current: number, pageSize: number },
    formData?: object): Promise<Result> => {
    const params = filterObjects({ current, pageSize, ...formData })
    console.log("🚀 ~ getTableData ~ params:", params)
    return await fetchData(params)
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize
  });

  const { submit, reset } = search;
  const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
  };

  return (
    <ConfigProvider theme={{
      components: {
        Form: { verticalLabelPadding: '0 0 4px' }
      }
    }}>
      <Form {...layout} layout="vertical" form={form} className="flex justify-between items-start">
        <Row gutter={16} className={`w-[78%] ${collapsed && 'h-20 overflow-hidden'}`} >
          {filters.map((item) => (
            <Col span={6} key={item.key}>
              <Form.Item label={item.label} name={item.key}>
                {item.type === "input" &&
                  <Input placeholder={item?.placeholder || `请输入${item.label}`} />}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Row justify="end" align="middle" className="mt-[26px]">
          {showSearchButton && <Button type="primary" onClick={submit}>
            查询
          </Button>}
          {showResetButton && <Button onClick={reset} className="ml-4">
            重置
          </Button>}
          {exportFn && <Button className="ml-4" onClick={exportFn}>
            导出
          </Button>}
          {filters.length > 4 && <Button type="link" className="p-0 ml-4" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '展开' : '收起'}
            <DownOutlined className={`${collapsed ? 'rotate-0' : 'rotate-180'}`} />
          </Button>}
        </Row>
      </Form>
      <AntdTable
        {...props}
        {...tableProps}
        className="border-t-border border-t border-t-solid"
        pagination={{
          pageSize: defaultPageSize,
          showSizeChanger,
          showQuickJumper,
          showTotal,
        }}
      />
    </ConfigProvider >
  );
}

export default Table;