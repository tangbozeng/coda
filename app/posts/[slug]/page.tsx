import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div>
      <Link href="/" className="text-sm mb-8 inline-block" style={{ fontFamily: 'sans-serif', color: 'var(--muted)', textDecoration: 'none' }}>
        ← 返回
      </Link>

      <article>
        <header className="mb-10">
          <div className="text-sm mb-3" style={{ fontFamily: 'sans-serif', color: 'var(--muted)' }}>
            {formatDate(post.date)}
          </div>
          <h1 className="text-2xl font-semibold mb-2 leading-snug" style={{ fontFamily: 'sans-serif' }}>
            {post.title}
          </h1>
          {post.titleEn !== post.title && (
            <p className="text-base" style={{ color: 'var(--muted)', fontFamily: 'sans-serif' }}>
              {post.titleEn}
            </p>
          )}
        </header>

        {post.content && (
          <section className="prose mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}

        {post.contentEn && (
          <>
            <hr style={{ borderColor: 'var(--border)', margin: '2.5rem 0' }} />
            <div className="text-xs mb-6" style={{ fontFamily: 'sans-serif', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              English
            </div>
            <section className="prose" dangerouslySetInnerHTML={{ __html: post.contentEn }} />
          </>
        )}
      </article>
    </div>
  )
}
