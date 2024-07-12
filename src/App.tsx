import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { ConfigProvider, message, App } from "antd";
import AntdTheme from "config/theme/antd-theme";
// import zhCN from 'antd/locale/zh_CN'
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "@/styles/global.less";

const MyPage = () => {
  dayjs.locale("zh-cn");
  return (
    <ConfigProvider theme={AntdTheme}>
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  );
};

export default MyPage;
