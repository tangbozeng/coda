import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  titleEn: string
  date: string
  category: string
  excerpt: string
  excerptEn: string
  content: string
  contentEn: string
  lang: 'zh' | 'en' | 'both'
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title || '',
        titleEn: data.titleEn || data.title || '',
        date: data.date || '',
        category: data.category || 'commentary',
        excerpt: data.excerpt || '',
        excerptEn: data.excerptEn || data.excerpt || '',
        content: '',
        contentEn: '',
        lang: data.lang || 'both',
      } as Post
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const parts = content.split('---EN---')
  const zhContent = parts[0].trim()
  const enContent = parts[1]?.trim() || ''

  const zhHtml = await remark().use(html).process(zhContent)
  const enHtml = await remark().use(html).process(enContent)

  return {
    slug,
    title: data.title || '',
    titleEn: data.titleEn || data.title || '',
    date: data.date || '',
    category: data.category || 'commentary',
    excerpt: data.excerpt || '',
    excerptEn: data.excerptEn || data.excerpt || '',
    content: zhHtml.toString(),
    contentEn: enHtml.toString(),
    lang: data.lang || 'both',
  }
}
