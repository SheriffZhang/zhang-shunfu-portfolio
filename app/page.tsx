"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    slug: "ai-visual-lab",
    group: "AI 视觉",
    index: "01",
    title: "AI 创意视觉探索",
    category: "AI 视觉 · 概念项目",
    summary: "用提示词、材质实验和后期精修，建立一套透明流动的未来感主视觉。",
    image: "/projects/ai-visual-exploration.png",
    className: "project-wide",
  },
  {
    slug: "future-brand-system",
    group: "品牌设计",
    index: "02",
    title: "品牌视觉系统设计",
    category: "品牌主视觉 · 概念提案",
    summary: "以几何标识、冷白空间和钴蓝强调色，建立科技品牌的核心视觉气质。",
    image: "/projects/brand-visual-system.png",
    className: "",
  },
  {
    slug: "digital-narrative-space",
    group: "视觉设计",
    index: "03",
    title: "数字传播视觉设计",
    category: "视觉设计 · 代表方向",
    summary: "围绕网页、移动端与社媒切片，梳理跨屏内容的阅读节奏和视觉层级。",
    image: "/projects/digital-communication-system.png",
    className: "",
  },
  {
    slug: "cultural-poster-series",
    group: "视觉设计",
    index: "04",
    title: "城市记忆海报计划",
    category: "海报设计 · 原创概念项目",
    summary: "以城市影像、粗粝纹理和朱红结构，完成一组具有展览感的系列海报。",
    image: "/projects/cultural-poster-series.png",
    className: "project-wide",
  },
  {
    slug: "tea-packaging-system",
    group: "品牌设计",
    index: "05",
    title: "当代茶品牌包装",
    category: "包装设计 · 原创概念项目",
    summary: "把茶芽、纸张肌理和礼赠场景转化为包装系统，强调自然与品质感。",
    image: "/projects/tea-packaging-system.png",
    className: "",
  },
  {
    slug: "motion-identity",
    group: "AI 视觉",
    index: "06",
    title: "生成式动态识别",
    category: "动态视觉 · 原创概念项目",
    summary: "用金属形态、粒子轨迹和循环规则，探索可运动、可拆分的动态识别语言。",
    image: "/projects/motion-identity.png",
    className: "",
  },
];

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
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const timer = setTimeout(() => {
        const target = getSectionAnchor(id);
        const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
        if (target) window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 24), behavior: "smooth" });
      }, 180);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      if (event.key.toLowerCase() !== "f" || element?.matches("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      const target = document.getElementById("work-anchor");
      const navHeight = document.querySelector(".nav")?.getBoundingClientRect().height ?? 68;
      if (target) {
        window.scrollTo({
          top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 24),
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
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > window.innerHeight * 0.75);
      const marker = window.scrollY + window.innerHeight * 0.36;
      let current = "home";
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
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
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <section className="hero" id="home">
        <video ref={videoRef} className="hero-video cinematic-video" autoPlay muted playsInline preload="auto" style={{ opacity: videoOpacity }}>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-gradient" /><div className="hero-glass glass-orb-one" /><div className="hero-glass glass-orb-two" />
        <nav className="nav shell">
          <a className="cinematic-logo" href="#home" onClick={scrollToSection("home")} aria-label="返回首页">张顺富<sup>®</sup></a>
          <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
            <a className={activeSection === "home" ? "active" : ""} href="#home" onClick={scrollToSection("home")}>首页</a><a className={activeSection === "work" ? "active" : ""} href="#work" onClick={scrollToSection("work")}>作品</a><a className={activeSection === "about" ? "active" : ""} href="#about" onClick={scrollToSection("about")}>关于</a><a className={activeSection === "strengths" ? "active" : ""} href="#strengths" onClick={scrollToSection("strengths")}>能力</a><a className={activeSection === "contact" ? "active" : ""} href="#contact" onClick={scrollToSection("contact")}>联系</a>
          </div>
          <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?"关闭导航菜单":"打开导航菜单"} aria-expanded={menuOpen}><i/><i/></button>
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
            <img src="/zhang-shunfu-portrait.png" alt="张顺富个人形象照" />
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
          <div><strong>01</strong><span>套<br />完整思考</span></div>
          <div><strong>∞</strong><span>持续<br />探索可能</span></div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell"><header className="section-head" id="work-anchor"><span>02 / 精选作品</span><p>精选项目</p></header>
          <div className="work-title"><h2>作品是思考<br />留下的<em>痕迹。</em></h2><div className="work-aside"><p><b>06</b> 组原创概念作品<br />从品牌、视觉到 AI 实验</p><div className="project-controls"><label className="project-search"><span aria-hidden="true">⌕</span><input ref={projectSearchRef} value={projectQuery} onChange={(event)=>setProjectQuery(event.target.value)} placeholder="查找作品" aria-label="查找作品" /><kbd>F</kbd></label><div className="project-filters" role="group" aria-label="项目分类">{["全部","品牌设计","视觉设计","AI 视觉"].map((item)=><button key={item} className={projectFilter===item?"active":""} onClick={()=>updateProjectFilter(item)}>{item}</button>)}</div></div></div></div>
          <div className="project-grid" key={`${projectFilter}-${projectQuery}`}>{visibleProjects.map((p) => <a href={`/projects/${p.slug}`} className={`project ${p.className}`} key={p.index} aria-label={`查看项目：${p.title}`}>
            <div className="project-image"><img src={p.image} alt={p.title} /><span className="view">查看<br />项目 ↗</span></div>
            <div className="project-meta"><span>{p.index}</span><h3>{p.title}</h3><p>{p.category}</p><small>{p.summary}</small></div>
          </a>)}{visibleProjects.length === 0 && <div className="project-empty" role="status"><span>没有找到匹配的作品</span><p>试试更换分类，或使用更简短的关键词。</p><button type="button" onClick={() => { setProjectQuery(""); setProjectFilter("全部"); projectSearchRef.current?.focus(); }}>清除筛选</button></div>}</div>
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
