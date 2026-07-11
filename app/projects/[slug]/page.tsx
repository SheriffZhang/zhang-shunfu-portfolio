import "../project.css";
import Link from "next/link";

const projects = [
  {slug:"ai-visual-lab",number:"01",title:"AI 创意视觉探索",type:"AI 视觉",year:"原创概念项目",intro:"以生成式 AI 作为视觉实验工具，围绕透明材质、液态曲线和微光空间建立主视觉方向，再通过人工筛选、局部重绘和版式整合，让生成结果具备可展示、可延展的完整度。",cover:"/projects/ai-visual-exploration.png",image:"/projects/ai-visual-exploration.png",role:"提示词设计 / AI 图像生成 / 图像精修 / 主视觉编排",process:"建立关键词情绪板，测试多组材质与构图，再筛选稳定画面进行调色、修瑕和标题版式适配。",result:"形成一套适用于数字封面、作品集首屏和动态背景延展的未来感视觉方案。"},
  {slug:"future-brand-system",number:"02",title:"品牌视觉系统设计",type:"品牌主视觉",year:"原创概念项目",intro:"这组作品更接近科技品牌的主视觉提案，而不是完整商业品牌手册。画面以几何标识、冷白空间、钴蓝强调色和克制排版建立识别记忆，重点展示品牌第一印象和延展气质。",cover:"/projects/brand-visual-system.png",image:"/projects/brand-visual-system.png",role:"主视觉方向 / 几何标识 / 色彩关系 / 提案版式",process:"先确定“理性、轻盈、未来感”的视觉关键词，再围绕符号比例、留白关系和强调色使用组织画面。",result:"形成一套适合品牌提案首页、社媒发布图和视觉规范开篇使用的主视觉样本。"},
  {slug:"digital-narrative-space",number:"03",title:"数字传播视觉设计",type:"视觉设计",year:"原创概念项目",intro:"围绕线上传播内容的多屏阅读问题，设计一套从桌面长页到移动卡片、社交媒体切片都能保持识别度的视觉系统，让信息在不同尺寸中依然有清晰节奏。",cover:"/projects/digital-communication-system.png",image:"/projects/digital-communication-system.png",role:"信息层级 / 页面视觉 / 跨屏适配 / 内容模块设计",process:"拆分标题、图像、引导和数据模块，建立可重复使用的版式规则，并验证横屏、竖屏与方图比例。",result:"产出一组数字传播页面与内容模块，展示网页视觉、社媒延展和信息编排能力。"},
  {slug:"cultural-poster-series",number:"04",title:"城市记忆海报计划",type:"海报设计",year:"原创概念项目",intro:"以城市漫游、旧影像和时间痕迹为主题，将摄影碎片、粗粝纹理和纵向红色结构组合成系列海报，营造介于展览视觉和文化传播之间的叙事感。",cover:"/projects/cultural-poster-series.png",image:"/projects/cultural-poster-series.png",role:"主题策划 / 系列海报 / 图像拼贴 / 展览视觉",process:"提炼城市记忆关键词，选择建筑、水面和人物片段进行拼贴，再用统一色彩和纵向结构串联系列。",result:"形成可用于展览主视觉、邀请物料、导视延展和社媒预告的系列化海报方案。"},
  {slug:"tea-packaging-system",number:"05",title:"当代茶品牌包装",type:"包装设计",year:"原创概念项目",intro:"以当代年轻茶饮礼赠为假设场景，将茶芽形态、纤维纸触感、深绿色识别和金属容器组合成包装系统，在自然气质与精致礼序之间建立平衡。",cover:"/projects/tea-packaging-system.png",image:"/projects/tea-packaging-system.png",role:"品牌概念 / 包装视觉 / 图形延展 / 礼盒系统",process:"从茶叶品类和使用场景出发，设计标志图形、包装层级、色彩材质和套装组合关系。",result:"完成盒装、罐装、内袋与礼袋的系统化展示，体现包装视觉与品牌延展能力。"},
  {slug:"motion-identity",number:"06",title:"生成式动态识别",type:"动态视觉",year:"原创概念项目",intro:"探索品牌识别在动态媒介中的表达方式，用金属带、粒子轨迹和边缘光建立可循环变化的视觉核心，让静态符号拥有时间感和运动秩序。",cover:"/projects/motion-identity.png",image:"/projects/motion-identity.png",role:"动态概念 / 形态设计 / 关键帧设定 / 生成视觉",process:"设计基础形态与运动规则，推导聚合、旋转、释放三种状态，并提取关键帧用于视觉展示。",result:"形成适用于片头、转场、循环背景和数字界面的动态识别概念样本。"}
];

const descriptions:Record<string,{title:string;first:string;second:string}>={
  "ai-visual-lab":{title:"让不可预测的生成，形成可控制的视觉语言。",first:"项目从透明、流动、精密三个关键词出发，通过多轮提示词与材质测试寻找玻璃、液体和金属之间的平衡。",second:"生成结果经过构图筛选、细节修复和统一调色，最终形成适合数字封面与动态延展的图像体系。"},
  "future-brand-system":{title:"先建立品牌气质，再让系统从主视觉中生长。",first:"作品从一个简洁几何标识出发，用大面积留白和细线结构控制画面呼吸感，让品牌看起来更理性、轻盈。",second:"钴蓝不作为大面积铺色，而是作为信息锚点出现，用来强化科技感和记忆点。"},
  "digital-narrative-space":{title:"让同一份内容，在不同屏幕上保持节奏。",first:"以桌面网页为信息主体，再将核心图像与色块拆解为适合移动端和社交媒体的内容模块。",second:"统一的图像裁切和色彩规则，让不同尺寸仍然拥有清晰的视觉连续性。"},
  "cultural-poster-series":{title:"把城市片段，重新组织成可阅读的记忆。",first:"系列选取建筑轮廓、水面与行走的人作为线索，以黑白摄影和粗粝纹理保留城市记忆的不完整感。",second:"红色纵向结构既是视觉锚点也是时间轴，圆形笔触连接传统文化与当代图形表达。"},
  "tea-packaging-system":{title:"从一片茶叶出发，建立自然且当代的包装体验。",first:"标志提取茶芽的生长形态，并将叶片分解成可重复使用的图形单元。",second:"米白纤维纸传递手工温度，深绿色建立品类识别，金属茶罐强化礼赠场景的品质感。"},
  "motion-identity":{title:"让识别系统不止有形状，也拥有时间。",first:"动态核心由三条金属带相互穿插形成，旋转、聚合和释放构成可重复的运动语法。",second:"粒子轨迹记录形态变化路径，紫蓝色边缘光强化空间深度，使系统适合片头与数字界面。"}
};

const breakdowns:Record<string,{headline:string;mark:string;typeCopy:string;colorCopy:string;systemCopy:string}>={
  "ai-visual-lab":{headline:"材质、光线与空间",mark:"透 · 流",typeCopy:"以透明层叠和曲线运动建立轻盈、连续的空间秩序。",colorCopy:"银白与冰蓝模拟玻璃折射，深灰稳定画面重心。",systemCopy:"从静态主视觉延展到动态封面、空间影像与数字背景。"},
  "future-brand-system":{headline:"标识、留白与强调色",mark:"轻 · 序",typeCopy:"以几何标识和细线框架建立视觉秩序，避免画面过度装饰。",colorCopy:"以冷白和雾银作为画面主体，墨黑承载标题信息，钴蓝只保留在关键识别点。",systemCopy:"主视觉可延展到提案封面、品牌海报、社媒图和基础物料。"},
  "digital-narrative-space":{headline:"跨屏、节奏与信息",mark:"屏 · 流",typeCopy:"以编号、图像裁切和模块化卡片组织跨屏阅读顺序。",colorCopy:"高饱和蓝提供数字感，珊瑚红用于内容转场。",systemCopy:"同一内容模块可在桌面、移动端与社交媒体中重组。"},
  "cultural-poster-series":{headline:"城市、时间与记忆",mark:"城 · 迹",typeCopy:"纵向结构连接海报，摄影碎片保留城市记忆的模糊感。",colorCopy:"米白与黑色形成历史质感，朱红贯穿整个系列。",systemCopy:"主视觉延展至海报、邀请函、导视与展览空间。"},
  "tea-packaging-system":{headline:"自然、材质与礼序",mark:"叶 · 礼",typeCopy:"茶芽被抽象为品牌符号，波纹表达山地与水汽。",colorCopy:"纤维米白体现自然触感，森林绿建立品类识别。",systemCopy:"盒装、罐装、内袋与礼袋形成完整产品家族。"},
  "motion-identity":{headline:"形态、运动与时间",mark:"聚 · 释",typeCopy:"金属带通过旋转、聚合与释放形成循环运动语法。",colorCopy:"黑色空间突出轮廓，紫蓝边缘光记录运动轨迹。",systemCopy:"动态核心可拆分为片头、转场、循环背景和关键帧。"}
};

const breakdownExtensions:Record<string,{items:[string,string,string]}>={
  "ai-visual-lab":{items:["主视觉","动态封面","数字背景"]},
  "future-brand-system":{items:["提案封面","品牌海报","社媒主图"]},
  "digital-narrative-space":{items:["桌面长页","移动卡片","社媒切片"]},
  "cultural-poster-series":{items:["系列海报","展览导视","空间物料"]},
  "tea-packaging-system":{items:["盒装系统","罐装系统","礼赠延展"]},
  "motion-identity":{items:["片头识别","转场规则","循环背景"]}
};

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const index=Math.max(0,projects.findIndex(p=>p.slug===slug)); const project=projects[index]; const description=descriptions[project.slug]; const breakdown=breakdowns[project.slug]; const extension=breakdownExtensions[project.slug];
  const prev=projects[(index-1+projects.length)%projects.length],next=projects[(index+1)%projects.length];
  return <main className="detail">
    <nav className="detail-nav"><Link href="/#work">← 返回作品集</Link><Link className="detail-logo" href="/">张顺富<sup>®</sup></Link><a href="mailto:sheriff001@foxmail.com" aria-label="发送合作邮件给张顺富">联系合作 ↗</a></nav>
    <header className="detail-hero"><div className="detail-label"><span>项目 {project.number}</span><span>{project.type} · {project.year}</span></div><h1>{project.title}</h1><p>{project.intro}</p></header>
    <figure className="detail-cover"><img src={project.cover} alt={project.title}/></figure>
    <section className="detail-info"><div><small>涉及能力</small><p>{project.role}</p></div><div><small>设计过程</small><p>{project.process}</p></div><div><small>内容说明</small><p>{project.result}</p></div></section>
    <section className="detail-story"><span>设计方法</span><div><h2>{description.title}</h2><p>{description.first}</p><p>{description.second}</p></div></section>
    <section className={`detail-breakdown breakdown-${project.number}`}><div className="breakdown-title"><span>视觉拆解</span><h2>{breakdown.headline}</h2></div><div className="breakdown-board"><div className="breakdown-type"><small>视觉构成</small><strong>{breakdown.mark}</strong><p>{breakdown.typeCopy}</p></div><div className="breakdown-color"><small>色彩关系</small><div><i/><i/><i/><i/></div><p>{breakdown.colorCopy}</p></div><div className="breakdown-system"><small>系统与延展</small>{extension.items.map((item,itemIndex)=><b key={item}>{String(itemIndex+1).padStart(2,"0")}<em>{item}</em></b>)}<p>{breakdown.systemCopy}</p></div></div></section>
    <section className="detail-next"><p>继续浏览</p><div><Link href={`/projects/${prev.slug}`}>← {prev.title}</Link><Link href={`/projects/${next.slug}`}>{next.title} →</Link></div></section>
    <footer className="detail-footer"><h2>让我们一起创造<br/><em>有意义的作品。</em></h2><a href="mailto:sheriff001@foxmail.com">SHERIFF001@FOXMAIL.COM ↗</a><p>© 2026 张顺富 · 视觉 / AI / 品牌设计师</p></footer>
  </main>
}
