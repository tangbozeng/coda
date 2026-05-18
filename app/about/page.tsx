export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: 'sans-serif' }}>关于 Coda</h1>

      <div className="prose mb-10">
        <p>
          Coda 是一份每周时事评论刊物，聚焦中国、新加坡与欧洲三个信息圈的交汇地带。
        </p>
        <p>
          大多数时事媒体只活在一个信息圈里。Coda 的工作，是把三个圈子各自说了什么、又沉默了什么，放在同一个页面上让读者判断。
        </p>
        <p>
          没有广告，没有算法推荐。每周一期，编辑判断优先。
        </p>
      </div>

      <hr style={{ borderColor: 'var(--border)', margin: '2rem 0' }} />

      <div className="prose">
        <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'sans-serif' }}>English</p>
        <p>
          Coda is a weekly commentary publication focused on the intersection of three information spheres: China, Singapore, and Europe.
        </p>
        <p>
          Most news commentary lives inside a single bubble. Coda's work is to place what each sphere is saying — and not saying — on the same page, and let the reader decide.
        </p>
        <p>
          No ads, no algorithmic feed. One issue per week, editorial judgment first.
        </p>
      </div>
    </div>
  )
}
