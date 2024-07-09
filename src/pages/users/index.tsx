import { fetchUsers } from "@/apis/user";
import Table from "@/components/custom/table";

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
const Component = () => {

  return <Table
    columns={columns}
    rowKey={(record: any) => record.email}
    fetchData={fetchUsers} />
}

export default Component;