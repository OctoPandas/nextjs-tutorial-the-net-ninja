[Next.js Tutorial for Beginners - YouTube](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw)

## 为 JS 启用 Emmet 提示

在 VS Code 设置 Emmet: Include Languages 中添加 `{"javascript": "javascriptreact"}`。

这样即便是在 `.js` 后缀名的文件中也可以使用 Emmet 补全。

## Next.js 声明式路由

Next.js 约定为 `pages` 目录下的组件创建路由。

对于未被路由匹配到规则，会进入 404 页面。Next.js 内部提供了该页面，也可以在 `pages/404.js` 创建自定义页面。

> 使用路径参数的页面，会统一进入该页面进行处理。如果遇到 404，那么需要自行处理。如果目标是生成静态网站（Next.js 作为 SSG），那么可以通过提供 `getStaticPaths` 来生成所有静态路径，未找到的路径会进入 404 页面。

```jsx
export const getStaticPaths = async () => {
  const ninjias = await fetch('https://jsonplaceholder.typicode.com/users')
                       .then(r => r.json())
  // 生成所有的路径，以便生成静态文件（HTML 和 JSON 等）
  const paths = ninjias.map(ninja => ({
    params: { id: `${ninja.id}` }
  }))
  // 关闭 fallback 则直接进入 404 页面
  return { paths, fallback: false }
}
```

## 编程式路由跳转

为了使用路由器提供的方法，必须使用相关的钩子获得路由器。如在 404 页面 3s 后跳转至首页：

```jsx
import { useRouter } from 'next/router'

const router = useRouter()
useEffect(() => {
  setTimeout(() => router.push('/'), 3000)
}, [])
```

## 创建页面布局

页面的公共部分可以作为统一的模板，不同的页面只需要填写这些插槽即可。为了适应不同的页面，可以创建出不同的布局。

简而言之，就是一个 wrapper。

```jsx
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      { children }
      <Footer />
    </>
  )
}
```

## 数据预获取

为了避免在前端进行 AJAX 操作，需要进行数据的预先获取，并渲染到模板中。组件作为一个模板，接收到 `props` 即可进行渲染输出 HTML。

```jsx
// 声明该函数即可被 Next.js 调用并传入组件中
export const getStaticProps = async () => {
  const ninjas = await fetch(URL_USERS).then(r => r.json())
  return { props: { ninjas } }
}

export default const Ninjas = ({ ninjas }) =>
  ninjas.map(({ name, id }) => <div key="id">{ name }</div>)
```

## 获得路径参数

创建 `[param].js` 文件即可声明基于路径参数的路由组件。

```jsx
// 声明该函数可获得上下文（包含路径参数）
export const getStaticProps = async (context) => {
  const { id } = context.params
  const ninja = await fetch(`${URL_USERS}/${id}`).then(r => r.json())
  // 返回 props 交给组件
  return { props: { ninja } }
}
```

## CSS 模块化

模块化的 CSS 的文件名需满足 `*.module.css`，否则无法开启模块化。

模块化的本质就是为内部的所有类生成唯一的类名，一般可能是 `<module>__<class>_<hash>` 的组成方式。

在 Vue.js 中的 `scope` 属性则是通过生成 `[v-<?>]` 的属性选择器来实现的。

## `Image` 组件

`Image` 组件类似 `<img>` 标签，但是可以实现图片的懒加载，只有当元素进入视口的时候才会加载。但必须指定 `width` 和 `height` 属性，或者 `layout="fill"`。

```jsx
import Image from 'next/image'
~() => <Image src="/logo.png" alt="site logo" width={128} height={64} />
```

## 定义 `<head>` 头部

```jsx
import Head from 'next/head'
```

## 部署到 Vercel

将源代码托管至 GitHub，并在 Vercel 中关联 GitHub 账户。选择对应的仓库，即可一键部署。
