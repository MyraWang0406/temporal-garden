const misconceptionList = [
  '只关注结果，不看变化过程。',
  '看到数值大就判断增长快，没有观察后几天是否突然拉开。',
  '会记住一个例子，但换到新场景后不会迁移。',
];

const badCases = [
  {
    title: '案例 A：一直加大初始值',
    behavior: '用户连续 3 次只调高起点，几乎不比较线性增长和指数增长的后期差异。',
    diagnosis: '系统判断：更关注“开始时有多少”，没有建立“增长方式会改变后期节奏”的认识。',
    advice: '改进建议：引导用户对比两次后 5～7 天的曲线，重点观察后期谁拉开得更快。',
  },
  {
    title: '案例 B：一旦失败就继续调大',
    behavior: '用户在溢出后继续把参数调大，认为数值更大就更接近目标。',
    diagnosis: '系统判断：存在“数值越大越好”的直觉偏差，没有把“刚好”作为目标。',
    advice: '改进建议：增加一次“刚好多一点 / 刚好少一点 / 刚好合适”的反思提示。',
  },
  {
    title: '案例 C：主关会做，迁移关失效',
    behavior: '用户能完成蔷薇花墙，但进入郁金香花海后重新回到试错式乱调。',
    diagnosis: '系统判断：记住了具体例子，但还没有真正迁移到新的场景。',
    advice: '改进建议：在迁移前增加一句方法回顾，提醒先判断增长节奏，再决定改哪类参数。',
  },
];

const metrics = [
  { label: '提示前完成率', value: '42%', note: '未获得提示时，用户更容易卡在“只改大数值”的策略中。' },
  { label: '提示后完成率', value: '68%', note: '加入轻量提示后，更多用户开始比较过程而不是只盯最终结果。' },
  { label: '二次纠正率', value: '57%', note: '首次失败后，超过一半用户会调整方法，而不只是继续放大参数。' },
  { label: '迁移题通过率', value: '49%', note: '说明方法迁移仍有提升空间，是下一阶段优化重点。' },
];

const roadmap = ['增加更多训练世界，覆盖更多增长与变化主题。', '增加 AI 追问，让系统在失败后提出更贴近错因的下一问。', '增加长期学习档案，帮助家长看见孩子跨主题的变化轨迹。'];

export default function EvaluationPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <h1>评测与 Bad Case</h1>
        <p>
          这一页使用静态 mock 数据展示作品站中的评测视角：我们不只展示“能玩”，也展示“哪里会卡住、提示是否有帮助、下一步怎么迭代”。
        </p>
      </section>

      <div className="evaluation-layout">
        <section className="evaluation-section">
          <h2>常见误解分类</h2>
          <ul className="evaluation-list">
            {misconceptionList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="evaluation-section">
          <h2>失败案例示例</h2>
          <div className="case-grid">
            {badCases.map((item) => (
              <article key={item.title} className="case-card">
                <h3>{item.title}</h3>
                <p>
                  <strong>用户行为描述：</strong>
                  {item.behavior}
                </p>
                <p>
                  <strong>系统判断错因：</strong>
                  {item.diagnosis}
                </p>
                <p>
                  <strong>对应改进建议：</strong>
                  {item.advice}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="evaluation-section">
          <h2>提示有效性</h2>
          <div className="metric-grid">
            {metrics.map((item) => (
              <article key={item.label} className="metric-card">
                <strong>{item.label}</strong>
                <div className="metric-value">{item.value}</div>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="evaluation-section">
          <h2>后续迭代方向</h2>
          <ul className="evaluation-list">
            {roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
