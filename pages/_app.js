import Layout from '../components/Layout'
import '../styles/globals.css'

// 该组件是作为入口组件，相关路由匹配的组件会直接映射到这里
// 如访问 `/ninjas`，那么 `Component` 为 `Ninjas` 组件
function MyApp({ Component, pageProps }) {
  return (
    // 为了给页面添加统一的头部和底部，使用布局
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
