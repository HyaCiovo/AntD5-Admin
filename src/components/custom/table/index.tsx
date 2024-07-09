import { filterObjects } from "@/utils";
import { useAntdTable } from "ahooks";
import { Table as AntdTable, Button, Col, ConfigProvider, Form, Input, Row } from "antd";
import { MyTableProps } from "./type";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const filters: any[] = [
  { key: "id", label: "ID", type: "input" },
  { key: "name", label: "姓名", type: "input" },
  { key: "email", label: "邮箱", type: "input" },
  { key: "phone", label: "手机号码", type: "input" },
  { key: "gender", label: "性别", type: "input" },
]

const Table = (props: MyTableProps) => {
  const { fetchData, exportFn, showResetButton = true, showSearchButton = true } = props;
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(true);

  const getTableData = async (query: any, formData?: object) => {
    const params = filterObjects({ ...query, ...formData })
    console.log("🚀 ~ getTableData ~ params:", params)
    return await fetchData(params).then(res => ({
      total: res.info.results,
      list: res.results,
    }))
  }

  const { tableProps, search, params } =
    useAntdTable<{ total: number, list: any }, any>(getTableData, {
      form,
      defaultPageSize: 5
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
        <Row gutter={16} className={`w-4/5 ${collapsed && 'h-20'}`} >
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
          {filters.length > 4 && <Button type="link" className="p-0 ml-4" onClick={()=>setCollapsed(!collapsed)}>
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
          pageSize: 10,
          showSizeChanger: true,
          // showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          // onChange(page, pageSize) {
          //   console.log('page', page, pageSize)
          //   getTableData({ page, pageSize })
          // },
        }}
      />
    </ConfigProvider >
  );
}

export default Table;