"use client";

import { useEffect, useState } from "react";
import "./project-reader.css";
import "./project-case-study.css";

const sections = [["overview", "作品概览"], ["method", "设计方法"], ["breakdown", "视觉系统"], ["next-project", "继续浏览"]] as const;

export default function ProjectReader() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0);
      const current = [...sections].reverse().find(([id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 180);
      if (current) setActive(current[0]);
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", scheduleUpdate); };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".detail-story, .breakdown-title, .breakdown-board, .detail-next-card"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-detail-visible");
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -8%" });
    targets.forEach((target) => { target.classList.add("detail-reveal"); observer.observe(target); });
    return () => observer.disconnect();
  }, []);
  const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  return <><div className="detail-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div><aside className="detail-reader" aria-label="作品阅读导航"><span className="detail-reader-kicker">阅读进度 · {Math.round(progress)}%</span>{sections.map(([id, label]) => <a className={active === id ? "is-active" : ""} aria-current={active === id ? "location" : undefined} href={`#${id}`} onClick={(event) => { event.preventDefault(); window.history.replaceState(null,"",`#${id}`); document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" }); }} key={id}>{label}</a>)}<button type="button" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}>回到顶部 ↑</button></aside></>;
}
