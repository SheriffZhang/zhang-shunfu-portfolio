"use client";

import { useEffect, useState } from "react";
import "./project-reader.css";
import "./project-case-study.css";

const sections = [["overview", "项目概览", ".detail-info"], ["method", "设计方法", ".detail-story"], ["breakdown", "视觉拆解", ".detail-breakdown"], ["next-project", "继续浏览", ".detail-next"]] as const;

export default function ProjectReader() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0);
      const current = [...sections].reverse().find(([, , selector]) => document.querySelector(selector)?.getBoundingClientRect().top! <= 180);
      if (current) setActive(current[0]);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <><div className="detail-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div><aside className="detail-reader" aria-label="项目阅读导航"><span className="detail-reader-kicker">项目阅读</span>{sections.map(([id, label, selector]) => <a className={active === id ? "is-active" : ""} href={`#${id}`} onClick={(event) => { event.preventDefault(); document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} key={id}>{label}</a>)}<button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>回到顶部 ↑</button></aside></>;
}
