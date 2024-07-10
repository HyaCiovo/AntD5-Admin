import { fetchUsers } from "@/apis/user";
import TableWithFilters from "@/components/custom/table";
import { Result } from "@/components/custom/table/type";
import { useHeaderBtns } from "@/hooks/useRenderBtns";
import { BtnProps } from "@/stores/header-btns";

const columns = [
  {
    title: "姓名",
    dataIndex: ["name", "last"],
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "手机号码",
    dataIndex: "phone",
  },
  {
    title: "性别",
    dataIndex: "gender",
    render: (text: string) => {
      return text === "male" ? "男" : "女";
    },
  },
];

const filters = [
  { name: "id", label: "ID", type: "Input" },
  {
    name: "gender",
    label: "性别",
    type: "Select",
    initialValue: "",
    options: [
      { value: "", label: "全部" },
      { value: "male", label: "男" },
      { value: "female", label: "女" },
    ],
  },
  { name: "name", label: "姓名", type: "Input" },
  { name: "email", label: "邮箱", type: "Input" },
  { name: "phone", label: "手机号码", type: "Input" },
  {
    name: "birthdate",
    label: "出生日期",
    type: "RangePicker",
    format: "YYYY-MM-DD",
  },
];

const Component = () => {
  const headerBtns: BtnProps[] = [
    {
      key: "add",
      children: "添加",
      type: "primary",
      onClick: () => {
        console.log("add");
      },
    },
    {
      key: "export",
      children: "导出全部",
      onClick: () => {
        console.log("export all");
      },
    },
  ];

  useHeaderBtns(headerBtns);

  const fetchData = async (params?: any): Promise<Result> => {
    const res = await fetchUsers(params);
    return { list: res.results, total: res.info.results };
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
