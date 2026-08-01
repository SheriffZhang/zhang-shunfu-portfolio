"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const projects = [
  {slug:"fluid-signal",group:"AI 视觉",index:"01",title:"FLUID SIGNAL",category:"AI 视觉传播 · 自主命题作品",summary:"将液态玻璃生成语言整理为适用于大屏、社交媒体和网页的传播系统。",image:"/case-studies/fluid-signal-applications.png",className:"project-wide"},
  {slug:"lumen-brand-system",group:"品牌设计",index:"02",title:"LUMEN",category:"未来品牌系统 · 自主命题作品",summary:"以“光是信息的入口”为概念，建立标识、版式、材质与数字触点。",image:"/case-studies/lumen-applications.png",className:""},
  {slug:"yemu-tea-packaging",group:"品牌设计",index:"03",title:"YEMU",category:"当代茶礼包装 · 自主命题作品",summary:"面向年轻礼赠场景，建立礼盒、茶罐、独立袋和手提袋的包装家族。",image:"/case-studies/yemu-packaging-applications.png",className:""},
  {slug:"ai-visual-lab",group:"AI 视觉",index:"04",title:"AI 创意视觉探索",category:"生成式视觉 · 材质实验",summary:"围绕透明、流动与折射进行生成实验，形成一组未来感数字主视觉。",image:"/projects/ai-visual-exploration.png",className:"project-wide"},
  {slug:"future-brand-system",group:"品牌设计",index:"05",title:"品牌视觉系统设计",category:"品牌主视觉 · 几何系统",summary:"以几何标识、冷白空间和钴蓝强调色建立克制、理性的视觉秩序。",image:"/projects/brand-visual-system.png",className:""},
  {slug:"digital-narrative-space",group:"视觉设计",index:"06",title:"数字传播视觉设计",category:"跨屏视觉 · 信息编排",summary:"围绕网页、移动端与社媒切片，梳理跨屏内容的阅读节奏和视觉层级。",image:"/projects/digital-communication-system.png",className:""},
  {slug:"cultural-poster-series",group:"视觉设计",index:"07",title:"城市记忆海报计划",category:"系列海报 · 城市叙事",summary:"以城市影像、粗粝纹理和朱红结构，完成一组具有展览感的系列海报。",image:"/projects/cultural-poster-series.png",className:"project-wide"},
  {slug:"tea-packaging-system",group:"品牌设计",index:"08",title:"自然茶品牌包装",category:"包装视觉 · 自然材质",summary:"从茶芽、纸张肌理和礼赠场景出发，构建自然克制的包装视觉方向。",image:"/projects/tea-packaging-system.png",className:""},
  {slug:"motion-identity",group:"AI 视觉",index:"09",title:"生成式动态识别",category:"动态视觉 · 形态实验",summary:"用金属形态、粒子轨迹和循环规则，探索可运动、可拆分的动态识别语言。",image:"/projects/motion-identity.png",className:""},
];

const projectFilters = ["全部", "品牌设计", "视觉设计", "AI 视觉"];
const navigationItems = [
  { id: "home", label: "首页" },
  { id: "about", label: "关于" },
  { id: "work", label: "作品" },
  { id: "strengths", label: "能力" },
  { id: "contact", label: "联系" },
] as const;
const projectCounts = new Map(projectFilters.map((filter) => [
  filter,
  filter === "全部" ? projects.length : projects.filter((project) => project.group === filter).length,
]));

const strengths = [
  ["01", "视觉设计", "围绕信息层级、版式、色彩和图像建立清晰且有辨识度的视觉表达。", "视觉表达", "版式设计|海报设计|图像处理|数字视觉"],
  ["02", "AI 辅助创意", "使用生成式 AI 进行概念发散、风格探索与视觉素材制作，并通过设计判断完成筛选和整合。", "智能创意", "概念生成|提示词设计|风格探索|后期精修"],
  ["03", "品牌视觉", "从品牌定位与使用场景出发，设计标志、字体、色彩及延展应用，保持多触点一致性。", "品牌系统", "视觉识别|色彩字体|品牌规范|物料延展"],
  ["04", "项目落地", "将设计概念转化为可使用的页面、海报和品牌物料，兼顾视觉质量与实际交付。", "设计交付", "需求梳理|方案提案|多端适配|文件交付"],
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [projectFilter, setProjectFilter] = useState("全部");
  const [projectQuery, setProjectQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const projectSearchRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationIntentRef = useRef<{ id: string; top: number; until: number } | null>(null);
  const getSectionAnchor = (id: string) => {
    if (id === "work") return document.getElementById("work-anchor");
    if (id === "contact") return document.querySelector("#contact .footer-inner > .kicker") ?? document.getElementById("contact");
    if (id === "about" || id === "strengths") return document.querySelector(`#${id} > .section-head`) ?? document.getElementById(id);
    return document.getElementById(id);
  };
  const scrollToSection = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = getSectionAnchor(id);
    if (!target) return;
    const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
    const offset = id === "home" ? 0 : navHeight + 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    navigationIntentRef.current = { id, top: Math.max(0, top), until: Date.now() + 1600 };
    setActiveSection(id);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: Math.max(0, top), behavior });
    setMenuOpen(false);
  };
  const updateProjectFilter = (nextFilter: string) => {
    if (nextFilter === projectFilter) return;
    const commit = () => setProjectFilter(nextFilter);
    const documentWithTransition = document as Document & { startViewTransition?: (callback: () => void) => void };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && documentWithTransition.startViewTransition) documentWithTransition.startViewTransition(commit);
    else commit();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let frame = 0;
    let restartTimer: ReturnType<typeof setTimeout> | undefined;
    const monitor = () => {
      const { currentTime, duration } = video;
      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < 0.5) setVideoOpacity(Math.max(0, currentTime / 0.5));
        else if (duration - currentTime < 0.5) setVideoOpacity(Math.max(0, (duration - currentTime) / 0.5));
        else setVideoOpacity(1);
      }
      frame = requestAnimationFrame(monitor);
    };
    const restart = () => {
      setVideoOpacity(0);
      restartTimer = setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };
    video.addEventListener("ended", restart);
    void video.play().catch(() => undefined);
    frame = requestAnimationFrame(monitor);
    return () => {
      cancelAnimationFrame(frame);
      if (restartTimer) clearTimeout(restartTimer);
      video.removeEventListener("ended", restart);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const isCompact = window.matchMedia("(max-width: 900px)").matches;
    if (isCompact) document.body.style.overflow = "hidden";
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && !document.querySelector(".nav")?.contains(target)) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    window.addEventListener("pointerdown", closeOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeMenu);
      window.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const timer = setTimeout(() => {
        const target = getSectionAnchor(id);
        const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
        if (target) {
          const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 24);
          navigationIntentRef.current = { id, top, until: Date.now() + 1600 };
          setActiveSection(id);
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 180);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const restoreSectionFromHistory = () => {
      const id = window.location.hash.slice(1) || "home";
      if (!navigationItems.some((item) => item.id === id)) return;
      const target = getSectionAnchor(id);
      if (!target) return;
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
      const offset = id === "home" ? 0 : navHeight + 24;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      navigationIntentRef.current = { id, top, until: Date.now() + 2200 };
      setActiveSection(id);
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setMenuOpen(false);
    };
    window.addEventListener("popstate", restoreSectionFromHistory);
    window.addEventListener("hashchange", restoreSectionFromHistory);
    return () => {
      window.removeEventListener("popstate", restoreSectionFromHistory);
      window.removeEventListener("hashchange", restoreSectionFromHistory);
    };
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      if (event.key.toLowerCase() !== "f" || element?.matches("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      const target = document.getElementById("work-anchor");
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
      if (target) {
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 24);
        navigationIntentRef.current = { id: "work", top, until: Date.now() + 1600 };
        setActiveSection("work");
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
      window.setTimeout(() => projectSearchRef.current?.focus(), 520);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".journey-nav, .journey-hero, .project-search, .mail-link"));
    const reset = (element: HTMLElement) => {
      element.style.setProperty("--spell-x", "0px");
      element.style.setProperty("--spell-y", "0px");
    };
    const handlers = elements.map((element) => {
      const move = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width - 0.5) * 10;
        const y = ((event.clientY - box.top) / box.height - 0.5) * 8;
        element.style.setProperty("--spell-x", `${x.toFixed(1)}px`);
        element.style.setProperty("--spell-y", `${y.toFixed(1)}px`);
      };
      const leave = () => reset(element);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return { element, move, leave };
    });
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project"));
    const cardHandlers = projectCards.map((card) => {
      const move = (event: PointerEvent) => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--card-x", `${((event.clientX - box.left) / box.width * 100).toFixed(1)}%`);
        card.style.setProperty("--card-y", `${((event.clientY - box.top) / box.height * 100).toFixed(1)}%`);
      };
      card.addEventListener("pointermove", move);
      return { card, move };
    });
    return () => {
      handlers.forEach(({ element, move, leave }) => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        reset(element);
      });
      cardHandlers.forEach(({ card, move }) => card.removeEventListener("pointermove", move));
    };
  }, [projectFilter, projectQuery]);

  useEffect(() => {
    const ids = ["home", "about", "work", "strengths", "contact"];
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > window.innerHeight * 0.75);
      const intent = navigationIntentRef.current;
      if (intent) {
        if (Math.abs(window.scrollY - intent.top) < 8) {
          setActiveSection(intent.id);
          navigationIntentRef.current = null;
          return;
        }
        if (Date.now() <= intent.until) {
          setActiveSection(intent.id);
          return;
        }
        navigationIntentRef.current = null;
      }
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
      const readingLine = Math.min(320, Math.max(navHeight + 48, window.innerHeight * 0.34));
      const marker = window.scrollY + readingLine;
      let current = "home";
      ids.forEach((id) => {
        const anchor = getSectionAnchor(id);
        if (anchor && anchor.getBoundingClientRect().top + window.scrollY <= marker) current = id;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) current = "contact";
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const move = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    const onScroll = () => root.classList.toggle("is-scrolled", window.scrollY > 40);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.12 });
    document.querySelectorAll(".section-head,.about-grid,.stats,.work-title,.project,.strength-intro,.strength-grid").forEach((el) => {
      el.classList.add("reveal"); observer.observe(el);
    });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const visibleProjects = projects.filter((project) => (
    (projectFilter === "全部" || project.group === projectFilter)
    && [project.title, project.category, project.summary].join(" ").toLowerCase().includes(projectQuery.trim().toLowerCase())
  ));

  return (
    <main id="main-content">
      <a className="skip-link" href="#about">跳到关于我</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <section className="hero" id="home">
        <video ref={videoRef} className="hero-video cinematic-video" autoPlay muted playsInline preload="auto" style={{ opacity: videoOpacity }}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-gradient" /><div className="hero-glass glass-orb-one" /><div className="hero-glass glass-orb-two" />
        <nav className="nav shell" aria-label="主导航">
          <a className="cinematic-logo" href="#home" onClick={scrollToSection("home")} aria-label="返回首页">张顺富<sup>®</sup></a>
          <div className={`nav-links ${menuOpen ? "menu-open" : ""}`} id="primary-navigation">
            {navigationItems.map((item) => <a key={item.id} className={activeSection === item.id ? "active" : ""} aria-current={activeSection === item.id ? "page" : undefined} href={`#${item.id}`} onClick={scrollToSection(item.id)}>{item.label}</a>)}
          </div>
          <button ref={menuButtonRef} className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?"关闭导航菜单":"打开导航菜单"} aria-expanded={menuOpen} aria-controls="primary-navigation"><i/><i/></button>
          <a className="journey-nav" href="#work" onClick={scrollToSection("work")}>开启探索</a>
        </nav>
        <div className="cinematic-hero shell">
          <h1 className="animate-fade-rise">越过<em>喧嚣，</em>我们创造<br /><em>恒久的价值。</em></h1>
          <p className="animate-fade-rise-delay">为敏锐的思想、无畏的创造者与真诚的灵魂构建设计体验。在纷繁世界中，以清晰的视觉与流畅的体验，让创意自然发生。</p>
          <a className="journey-hero animate-fade-rise-delay-2" href="#work" onClick={scrollToSection("work")}>开启探索</a>
        </div>
      </section>

      <section className="about section shell" id="about">
        <header className="section-head"><span>01 / 关于</span><p>关于我</p></header>
        <div className="about-grid">
          <div className="portrait-wrap">
            <img src="/zhang-shunfu-portrait.png" alt="张顺富个人形象照" loading="lazy" decoding="async" />
            <div className="portrait-tag">开放合作<br />精选项目 <i /></div>
          </div>
          <div className="about-copy">
            <p className="kicker">你好，我是张顺富。</p>
            <h2>我在理性与感性之间，<br />寻找视觉表达的<br /><em>最佳解法。</em></h2>
            <div className="bio-row">
              <p>我是一名专注于品牌与视觉体验的设计师，也是一名 AI 创意实践者。我相信好的设计应当清晰、有力，并能在不断变化的媒介中保持生命力。</p>
              <p>工作中，我习惯从问题本身出发，将策略、审美与技术连接起来，为品牌创造兼具识别度与未来感的表达。</p>
            </div>
            <div className="contact-list"><a href="tel:+8618281889843" aria-label="拨打张顺富的电话">电话：182 8188 9843</a><a href="mailto:sheriff001@foxmail.com" aria-label="发送邮件给张顺富">邮箱：sheriff001@foxmail.com</a></div>
          </div>
        </div>
        <div className="stats">
          <div><strong>03</strong><span>个<br />专业方向</span></div>
          <div><strong>04</strong><span>步<br />设计流程</span></div>
          <div><strong>09</strong><span>组<br />精选作品</span></div>
          <div><strong>∞</strong><span>持续<br />探索可能</span></div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell"><header className="section-head" id="work-anchor"><span>02 / 精选作品</span><p>精选项目</p></header>
          <div className="work-title"><h2>作品是思考<br />留下的<em>痕迹。</em></h2><div className="work-aside"><p><b>09</b> 组自主命题作品<br />从品牌、视觉到 AI 实验</p><div className="project-controls"><label className="project-search"><span aria-hidden="true">⌕</span><input ref={projectSearchRef} value={projectQuery} onChange={(event)=>setProjectQuery(event.target.value)} placeholder="查找作品" aria-label="查找作品" /><kbd>F</kbd></label><div className="project-filters" role="group" aria-label="项目分类">{projectFilters.map((item)=><button key={item} className={projectFilter===item?"active":""} aria-pressed={projectFilter===item} onClick={()=>updateProjectFilter(item)}><span>{item}</span><small>{String(projectCounts.get(item) ?? 0).padStart(2,"0")}</small></button>)}</div></div><span className="project-count" aria-live="polite">当前显示 {String(visibleProjects.length).padStart(2,"0")} 个作品</span></div></div>
          <div className="project-grid" key={`${projectFilter}-${projectQuery}`}>{visibleProjects.map((p) => <Link href={`/projects/${p.slug}`} className={`project ${p.className}`} key={p.index} aria-label={`查看项目：${p.title}`}>
            <div className="project-image"><i className="frame-corner corner-tl"/><i className="frame-corner corner-tr"/><i className="frame-corner corner-bl"/><i className="frame-corner corner-br"/><img src={p.image} alt={p.title} loading="lazy" decoding="async" /></div>
            <div className="project-meta"><span>{p.index}</span><h3>{p.title}</h3><p>{p.category}</p><small>{p.summary}</small></div>
          </Link>)}{visibleProjects.length === 0 && <div className="project-empty" role="status"><span>没有找到匹配的作品</span><p>试试更换分类，或使用更简短的关键词。</p><button type="button" onClick={() => { setProjectQuery(""); setProjectFilter("全部"); projectSearchRef.current?.focus(); }}>清除筛选</button></div>}</div>
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <header className="section-head"><span>03 / 专业能力</span><p>个人优势</p></header>
        <div className="strength-intro"><h2>用设计创造<br /><em>有价值的连接。</em></h2><p>跨越策略、视觉与新技术，<br />建立从洞察到落地的完整能力。</p></div>
        <div className="strength-grid">{strengths.map((s) => <article key={s[0]}><span>{s[0]}</span><div className="orb" /><small className="cap-type">{s[3]}</small><h3>{s[1]}</h3><p>{s[2]}</p><div className="cap-tags">{s[4].split("|").map(tag=><b key={tag}>{tag}</b>)}</div></article>)}</div>
        <div className="capability-detail">
          <div className="capability-tools"><span>常用工具与方法</span><div><b>Adobe Photoshop</b><b>Adobe Illustrator</b><b>Figma</b><b>生成式 AI</b><b>视觉研究</b><b>情绪板</b><b>设计规范</b></div></div>
          <div className="design-process"><div className="process-heading"><span>工作流程</span><h3>让创意有依据，<br/>让设计能落地。</h3></div><ol><li><i>01</i><b>理解问题</b><p>明确目标、受众、内容和应用场景。</p></li><li><i>02</i><b>建立方向</b><p>通过研究与视觉实验确定设计语言。</p></li><li><i>03</i><b>系统设计</b><p>统一版式、图像、色彩与多触点规则。</p></li><li><i>04</i><b>验证交付</b><p>检查实际使用效果并完成规范化交付。</p></li></ol></div>
        </div>
      </section>

      <footer className="footer" id="contact"><div className="footer-noise" /><div className="shell footer-inner">
        <p className="kicker light">让我们一起创造有意义的作品。</p>
        <h2>有想法？<br /><em>一起聊聊。</em></h2>
        <a className="mail-link" href="mailto:sheriff001@foxmail.com" aria-label="发送邮件给张顺富"><span className="contact-card-kicker">合作联系</span><span className="contact-phone">182 8188 9843</span><span className="contact-services">品牌视觉 · AI 创意 · 项目合作</span><span className="contact-email">SHERIFF001@FOXMAIL.COM</span><span className="contact-arrow">↗</span></a>
        <div className="footer-base"><div className="logo invert"><span>ZS</span><i /></div><p>张顺富<br />视觉 / AI / 品牌设计师</p><p><a href="tel:+8618281889843" aria-label="拨打张顺富的电话">182 8188 9843</a><br />中国 · 成都</p><p className="right">© 2026 保留所有权利<br />以好奇心驱动设计</p></div>
      </div></footer>
      <button className={`back-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="返回顶部"><span>↑</span><small>顶部</small></button>
    </main>
  );
}
