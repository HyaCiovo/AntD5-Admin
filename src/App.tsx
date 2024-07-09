
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ConfigProvider } from 'antd'
import AntdTheme from 'config/theme/antd-theme'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import '@/styles/global.less'

const App = () => {
  dayjs.locale('zh-cn')
  return (
    <ConfigProvider locale={zhCN} theme={AntdTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
