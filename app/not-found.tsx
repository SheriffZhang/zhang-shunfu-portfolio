import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <nav className="not-found-nav" aria-label="错误页面导航">
        <Link href="/" className="cinematic-logo">张顺富<sup>®</sup></Link>
        <Link href="/#work">返回作品</Link>
      </nav>
      <section>
        <span>404 / 页面未找到</span>
        <h1>这里没有作品，<br /><em>但探索可以继续。</em></h1>
        <p>当前地址可能已经改变，或者项目暂未公开。</p>
        <div>
          <Link href="/#work">浏览精选作品</Link>
          <a href="mailto:sheriff001@foxmail.com">联系张顺富</a>
        </div>
      </section>
    </main>
  );
}
