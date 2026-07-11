import "../project.css";

const projects = [
  {slug:"ai-visual-lab",number:"01",title:"AI 创意视觉探索",type:"AI 视觉",year:"原创概念项目",intro:"以生成式 AI 辅助概念发散与视觉实验，再通过设计判断、图像精修和版式整合，将生成结果转化为可控且完整的视觉表达。",cover:"/projects/ai-visual-exploration.png",image:"/projects/ai-visual-exploration.png",role:"概念设定 / AI 生成 / 图像精修 / 版式设计",process:"方向研究、提示词测试、图像筛选与视觉整合",result:"原创个人项目，展示 AI 与设计流程的结合方式"},
  {slug:"future-brand-system",number:"02",title:"品牌视觉系统设计",type:"品牌设计",year:"原创概念项目",intro:"从品牌定位和实际应用场景出发，建立标志、字体、色彩、图形与版式之间的统一关系，使品牌在不同触点中保持清晰一致。",cover:"/projects/brand-visual-system.png",image:"/projects/brand-visual-system.png",role:"视觉识别 / 版式系统 / 品牌延展",process:"定位梳理、视觉方向、系统设计与应用验证",result:"原创虚拟品牌项目，展示完整品牌视觉能力"},
  {slug:"digital-narrative-space",number:"03",title:"数字传播视觉设计",type:"视觉设计",year:"原创概念项目",intro:"围绕数字媒介中的阅读节奏和信息层级，组织图像、文字与动态关系，为网页、社交媒体及线上传播场景建立连贯体验。",cover:"/projects/digital-communication-system.png",image:"/projects/digital-communication-system.png",role:"视觉设计 / 信息编排 / 页面表现",process:"内容梳理、视觉概念、页面设计与适配",result:"原创数字传播项目，展示跨屏视觉系统能力"},
  {slug:"cultural-poster-series",number:"04",title:"城市记忆海报计划",type:"海报设计",year:"原创概念项目",intro:"以城市、时间与记忆为线索，通过摄影拼贴、几何结构和强烈色彩建立一套具有连续叙事的文化展览视觉。",cover:"/projects/cultural-poster-series.png",image:"/projects/cultural-poster-series.png",role:"概念策划 / 海报设计 / 系列延展",process:"主题提炼、图像实验、版式系统与场景展示",result:"原创文化视觉项目，展示系列海报与空间应用能力"},
  {slug:"tea-packaging-system",number:"05",title:"当代茶品牌包装",type:"包装设计",year:"原创概念项目",intro:"将传统茶文化中的自然、留白与礼序转化为当代包装语言，在材料触感、结构层级和品牌识别之间取得平衡。",cover:"/projects/tea-packaging-system.png",image:"/projects/tea-packaging-system.png",role:"品牌概念 / 包装视觉 / 材质与结构",process:"品类研究、概念定位、包装系统与礼赠场景",result:"原创虚拟茶品牌，展示包装与品牌延展能力"},
  {slug:"motion-identity",number:"06",title:"生成式动态识别",type:"动态视觉",year:"原创概念项目",intro:"以金属形态和粒子轨迹建立可持续变化的动态识别核心，探索静态标志在时间与空间中的生成逻辑。",cover:"/projects/motion-identity.png",image:"/projects/motion-identity.png",role:"动态概念 / 生成视觉 / 关键帧设计",process:"形态研究、运动规则、材质测试与关键帧编排",result:"原创动态概念项目，展示生成式视觉与动态方向能力"}
];

const descriptions:Record<string,{title:string;first:string;second:string}>={
  "ai-visual-lab":{title:"让不可预测的生成，形成可控制的视觉语言。",first:"项目从透明、流动、精密三个关键词出发，通过多轮提示词与材质测试寻找玻璃、液体和金属之间的平衡。",second:"生成结果经过构图筛选、细节修复和统一调色，最终形成适合数字封面与动态延展的图像体系。"},
  "future-brand-system":{title:"用最少的元素，建立稳定的品牌识别。",first:"视觉符号由圆、三角与方形组成，并进一步延展为版式网格和信息图形。",second:"黑白主色保证长期适用性，钴蓝作为强调色形成克制而鲜明的品牌印象。"},
  "digital-narrative-space":{title:"让同一份内容，在不同屏幕上保持节奏。",first:"以桌面网页为信息主体，再将核心图像与色块拆解为适合移动端和社交媒体的内容模块。",second:"统一的图像裁切和色彩规则，让不同尺寸仍然拥有清晰的视觉连续性。"},
  "cultural-poster-series":{title:"把城市片段，重新组织成可阅读的记忆。",first:"系列选取建筑轮廓、水面与行走的人作为线索，以黑白摄影和粗粝纹理保留城市记忆的不完整感。",second:"红色纵向结构既是视觉锚点也是时间轴，圆形笔触连接传统文化与当代图形表达。"},
  "tea-packaging-system":{title:"从一片茶叶出发，建立自然且当代的包装体验。",first:"标志提取茶芽的生长形态，并将叶片分解成可重复使用的图形单元。",second:"米白纤维纸传递手工温度，深绿色建立品类识别，金属茶罐强化礼赠场景的品质感。"},
  "motion-identity":{title:"让识别系统不止有形状，也拥有时间。",first:"动态核心由三条金属带相互穿插形成，旋转、聚合和释放构成可重复的运动语法。",second:"粒子轨迹记录形态变化路径，紫蓝色边缘光强化空间深度，使系统适合片头与数字界面。"}
};

const breakdowns:Record<string,{headline:string;mark:string;typeCopy:string;colorCopy:string;systemCopy:string}>={
  "ai-visual-lab":{headline:"材质、光线与空间",mark:"透 · 流",typeCopy:"以透明层叠和曲线运动建立轻盈、连续的空间秩序。",colorCopy:"银白与冰蓝模拟玻璃折射，深灰稳定画面重心。",systemCopy:"从静态主视觉延展到动态封面、空间影像与数字背景。"},
  "future-brand-system":{headline:"符号、网格与识别",mark:"○ △ □",typeCopy:"几何符号对应开放、方向与秩序，成为系统的核心语法。",colorCopy:"黑白建立理性基底，钴蓝只用于关键信息。",systemCopy:"符号比例和网格规则应用于名片、手册与数字界面。"},
  "digital-narrative-space":{headline:"跨屏、节奏与信息",mark:"屏 · 流",typeCopy:"以编号、图像裁切和模块化卡片组织跨屏阅读顺序。",colorCopy:"高饱和蓝提供数字感，珊瑚红用于内容转场。",systemCopy:"同一内容模块可在桌面、移动端与社交媒体中重组。"},
  "cultural-poster-series":{headline:"城市、时间与记忆",mark:"城 · 迹",typeCopy:"纵向结构连接海报，摄影碎片保留城市记忆的模糊感。",colorCopy:"米白与黑色形成历史质感，朱红贯穿整个系列。",systemCopy:"主视觉延展至海报、邀请函、导视与展览空间。"},
  "tea-packaging-system":{headline:"自然、材质与礼序",mark:"叶 · 礼",typeCopy:"茶芽被抽象为品牌符号，波纹表达山地与水汽。",colorCopy:"纤维米白体现自然触感，森林绿建立品类识别。",systemCopy:"盒装、罐装、内袋与礼袋形成完整产品家族。"},
  "motion-identity":{headline:"形态、运动与时间",mark:"聚 · 释",typeCopy:"金属带通过旋转、聚合与释放形成循环运动语法。",colorCopy:"黑色空间突出轮廓，紫蓝边缘光记录运动轨迹。",systemCopy:"动态核心可拆分为片头、转场、循环背景和关键帧。"}
};

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const index=Math.max(0,projects.findIndex(p=>p.slug===slug)); const project=projects[index]; const description=descriptions[project.slug]; const breakdown=breakdowns[project.slug];
  const prev=projects[(index-1+projects.length)%projects.length],next=projects[(index+1)%projects.length];
  return <main className="detail">
    <nav className="detail-nav"><a href="/#work">← 返回作品集</a><a className="detail-logo" href="/">张顺富<sup>®</sup></a><a href="mailto:sheriff001@foxmail.com" aria-label="发送合作邮件给张顺富">联系合作 ↗</a></nav>
    <header className="detail-hero"><div className="detail-label"><span>项目 {project.number}</span><span>{project.type} · {project.year}</span></div><h1>{project.title}</h1><p>{project.intro}</p></header>
    <figure className="detail-cover"><img src={project.cover} alt={project.title}/></figure>
    <section className="detail-info"><div><small>涉及能力</small><p>{project.role}</p></div><div><small>设计过程</small><p>{project.process}</p></div><div><small>内容说明</small><p>{project.result}</p></div></section>
    <section className="detail-story"><span>设计方法</span><div><h2>{description.title}</h2><p>{description.first}</p><p>{description.second}</p></div></section>
    <section className={`detail-breakdown breakdown-${project.number}`}><div className="breakdown-title"><span>视觉拆解</span><h2>{breakdown.headline}</h2></div><div className="breakdown-board"><div className="breakdown-type"><small>视觉构成</small><strong>{breakdown.mark}</strong><p>{breakdown.typeCopy}</p></div><div className="breakdown-color"><small>色彩关系</small><div><i/><i/><i/><i/></div><p>{breakdown.colorCopy}</p></div><div className="breakdown-system"><small>系统与延展</small><b>01</b><b>02</b><b>03</b><p>{breakdown.systemCopy}</p></div></div></section>
    <section className="detail-next"><p>继续浏览</p><div><a href={`/projects/${prev.slug}`}>← {prev.title}</a><a href={`/projects/${next.slug}`}>{next.title} →</a></div></section>
    <footer className="detail-footer"><h2>让我们一起创造<br/><em>有意义的作品。</em></h2><a href="mailto:sheriff001@foxmail.com">SHERIFF001@FOXMAIL.COM ↗</a><p>© 2025 张顺富 · 视觉 / AI / 品牌设计师</p></footer>
  </main>
}
