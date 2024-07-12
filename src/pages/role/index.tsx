import { fetchUsers } from "@/apis/user";
import TableWithFilters from "@/components/custom/table";
import { Result } from "@/components/custom/table/type";
import { useHeaderBtns } from "@/hooks/useRenderBtns";
import { BtnProps } from "@/stores/layout";
import { ExportOutlined, UserAddOutlined } from "@ant-design/icons";

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
  { name: "id", label: "ID", type: "Input" },
  {
    name: "gender",
    label: "Gender",
    type: "Select",
    initialValue: "",
    options: [
      { value: "", label: "All" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "birthdate",
    label: "Birth",
    type: "RangePicker",
    format: "YYYY-MM-DD",
  },
  { name: "name", label: "Name", type: "Input" },
  // { name: "email", label: "Email", type: "Input" },
  // { name: "phone", label: "Phone", type: "Input" },
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
    />
  );
};

export default Component;
