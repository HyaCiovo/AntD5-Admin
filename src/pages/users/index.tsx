import { fetchUsers } from "@/apis/user";
import Table from "@/components/custom/table";
import { Result } from "@/components/custom/table/type";

const columns = [
  {
    title: '姓名',
    dataIndex: ['name', 'last'],
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
];

const filters: any[] = [
  { key: "id", label: "ID", type: "input" },
  { key: "name", label: "姓名", type: "input" },
  { key: "email", label: "邮箱", type: "input" },
  { key: "phone", label: "手机号码", type: "input" },
  { key: "gender", label: "性别", type: "input" },
]

const Component = () => {
  const fetchData = async (params?: any): Promise<Result> => {
    const res = await fetchUsers(params);
    return { list: res.results, total: res.info.results };
  }

  return <Table
    columns={columns}
    filters={filters}
    rowKey={(record: any) => record.email}
    fetchData={fetchData} />
}

export default Component;