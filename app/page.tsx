import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

const categoryLabels: Record<string, { zh: string; en: string }> = {
  commentary: { zh: '时评', en: 'Commentary' },
  meta: { zh: '关于', en: 'Meta' },
  academia: { zh: '学界', en: 'Academia' },
  geopolitics: { zh: '地缘', en: 'Geopolitics' },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-3" style={{ fontFamily: 'sans-serif' }}>Coda</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'sans-serif', fontSize: '0.95rem' }}>
          独立视角，解读中国与世界的交叉地带。
          <br />
          <span className="text-sm">Independent commentary on China, power, and the world.</span>
        </p>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>暂无文章。</p>
      ) : (
        <div className="space-y-10">
          {posts.map(post => {
            const cat = categoryLabels[post.category] || { zh: post.category, en: post.category }
            return (
              <article key={post.slug} className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3 mb-2" style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{cat.zh} / {cat.en}</span>
                </div>
                <h2 className="text-xl font-semibold mb-1" style={{ fontFamily: 'sans-serif' }}>
                  <Link href={`/posts/${post.slug}`} style={{ color: 'var(--fg)', textDecoration: 'none' }} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.titleEn !== post.title && (
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)', fontFamily: 'sans-serif' }}>
                    {post.titleEn}
                  </p>
                )}
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{post.excerpt}</p>
                <Link href={`/posts/${post.slug}`} className="text-sm mt-3 inline-block" style={{ fontFamily: 'sans-serif', color: 'var(--fg)' }}>
                  阅读全文 →
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
