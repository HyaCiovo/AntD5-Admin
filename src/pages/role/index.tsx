import { fetchUsers } from "@/apis/user-manage";
import TableWithFilters from "@/components/custom/table";
import { Result } from "@/components/custom/table/type";
import { useHeaderBtns } from "@/hooks/useRenderBtns";
import { BtnProps } from "@/stores/layout";
import { ExportOutlined, UserAddOutlined } from "@ant-design/icons";
import { Badge, Input } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: ["name", "last"],
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
];

const filters = [
  { name: "Hidden", type: "Hidden", initialValue: "121212" },
  { name: "Input", label: "Input", type: "Input" },
  {
    name: "Select",
    label: "Select",
    type: "Select",
    initialValue: "all",
    options: [
      { value: "all", label: "All" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "TreeSelect",
    label: "TreeSelect",
    type: "TreeSelect",
    treeData: [
      {
        title: "Light",
        value: "light",
        children: [{ title: "Bamboo", value: "bamboo" }],
      },
    ],
  },
  {
    name: "DatePicker",
    label: "DatePicker",
    type: "DatePicker",
    format: "YYYY-MM-DD",
  },
  {
    name: "RangePicker",
    label: "RangePicker",
    type: "RangePicker",
    format: "YYYY-MM-DD",
  },
  {
    name: "Custom",
    label: "Custom",
    type: "Custom",
    span: 10,
    element: (props: any) => <Input onChange={props.onChange} value={props.value} />,
  },
  {
    name: "TabsFilter",
    label: "TabsFilter",
    // className: "mt-8",
    type: "Tabs",
    initialValue: "male",
    options: [
      {
        value: "all",
        label: "All",
      },
      {
        value: "male",
        label: <>Male<Badge className="ml-2" count={10} /></>,
      },
      {
        value: "female",
        label: "Female",
      },
    ]
  }
];

const Component = () => {
  const headerBtns: BtnProps[] = [
    {
      key: "add",
      children: "ADD",
      type: "primary",
      url: "/role/add",
      icon: <UserAddOutlined />,
    },
    {
      key: "export",
      children: "EXPORT ALL",
      onClick: () => {
        console.log("export all");
      },
      icon: <ExportOutlined />,
    },
  ];

  useHeaderBtns(headerBtns);

  const fetchData = async (params?: any): Promise<Result> => {
    const res = await fetchUsers(params);
    // return { list: res.results, total: res.info.results };
    return new Promise((resolve) => {
      // setTimeout(() => {
      resolve({ list: res.results, total: res.info.results });
      // }, 1500);
    });
  };

  return (
    <TableWithFilters
      columns={columns}
      filters={filters}
      rowKey={(record: any) => record.email}
      fetchData={fetchData}
    // exportFn={async() => {}}
    />
  );
};

export default Component;
