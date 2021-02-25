import Link from 'next/link'
import Image from 'next/image'

// 尽可能使用语义化 HTML 元素
const Navbar = () => {
  return (
    <nav>
      {/* 为了保证该元素在最左侧，在 flex 的前提下设置 `margin-right: auto` */}
      <div className="logo">
        {/* `Image` 组件的宽高须同时指定或设置为 fill 布局
            带有懒加载功能 */}
        <Image src="/logo.png" alt="site logo" width={128} height={77} />
      </div>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/ninjas">Ninja Listing</Link>
    </nav>
  )
}

export default Navbar
