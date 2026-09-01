import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundMusic from "./components/BackgroundMusic";
import MobileBackButton from "./components/MobileBackButton";
import bgVideo from "./assets/Resume.mp4";
import bgMusic from "./assets/Resume.mp3";
import {
  PROJECTS_URL,
  SKILLS_DATA,
} from "./data/portfolioData";
import { usePersonaSfx } from "./lib/usePersonaSfx";
import { useSafeBackNavigation } from "./lib/useSafeBackNavigation";
import { useLanguage } from "./context/LanguageContext";

export default function ResumePage({
  mediaMuted = true,
  sfxMuted = true,
}) {
  const { t, language } = useLanguage();
  const { goBack } = useSafeBackNavigation("/");
  const [activeSection, setActiveSection] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const navContainerRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const sectionButtonRefs = useRef([]);
  const rowButtonRefs = useRef([]);
  const { playHover, playConfirm, playBack } = usePersonaSfx({
    muted: sfxMuted,
  });

  const skillRows = useMemo(() => {
    return SKILLS_DATA.map((skill) => ({
      title: skill.title,
      meta: t(`resume.skillMeta.${skill.description}`) || skill.description,
      description:
        t(`resume.skillDetails.${skill.title}`) ||
        `${skill.title} applied in practical ${skill.description.toLowerCase()} workflows.`,
      href: skill.url,
    }));
  }, [t, language]);

  const projectRows = useMemo(() => {
    return PROJECTS_URL.map((project) => ({
      title: project.title,
      meta: t("resume.openLink"),
      description:
        language === "es" && project.title === "Rocola-Del-Diantre"
          ? t("socials.projects.rocola")
          : project.description,
      href: project.liveUrl,
    }));
  }, [t, language]);

  const sections = useMemo(() => {
    return [
      {
        id: "skills",
        title: t("resume.skillsTitle"),
        subtitle: t("resume.skillsSubtitle"),
        rows: skillRows,
      },
      {
        id: "projects",
        title: t("resume.projectsTitle"),
        subtitle: t("resume.projectsSubtitle"),
        rows: projectRows,
      },
    ];
  }, [t, skillRows, projectRows]);

  const section = sections[activeSection] || sections[0];
  const rows = section.rows;
  const selectedRow = rows[activeRow] ?? rows[0];

  const [lastSection, setLastSection] = useState(activeSection);
  if (lastSection !== activeSection) {
    setLastSection(activeSection);
    setActiveRow(0);
  }

  useEffect(() => {
    const target = sectionButtonRefs.current[activeSection];
    if (!target || !navContainerRef.current) return;
    target.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeSection]);

  useEffect(() => {
    const target = rowButtonRefs.current[activeRow];
    if (!target || !rowsContainerRef.current) return;
    target.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeSection, activeRow]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (e.key === "ArrowUp" || key === "w" || key === "z") {
        playHover();
        setActiveSection((value) => Math.max(0, value - 1));
      }

      if (e.key === "ArrowDown" || key === "s") {
        playHover();
        setActiveSection((value) => Math.min(sections.length - 1, value + 1));
      }

      if (e.key === "ArrowLeft" || key === "a" || key === "q") {
        playHover();
        setActiveRow((value) => Math.max(0, value - 1));
      }

      if (e.key === "ArrowRight" || key === "d") {
        playHover();
        setActiveRow((value) => Math.min(rows.length - 1, value + 1));
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (selectedRow?.href) {
          playConfirm();
          window.open(selectedRow.href, "_blank");
        }
      }

      if (e.key === "Escape" || e.key === "Backspace") {
        playBack();
        goBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack, playConfirm, playHover, playBack, rows.length, selectedRow, sections.length]);

  const helperText = useMemo(() => {
    if (section.id === "projects") {
      return t("resume.helperProjects");
    }
    return t("resume.helperSkills");
  }, [section.id, t]);

  return (
    <div id="menu-screen" className="resume-root">
      <BackgroundVideo src={bgVideo} muted={mediaMuted} />
      <BackgroundMusic src={bgMusic} muted={mediaMuted} />
      <MobileBackButton onBeforeBack={playBack} label={t("aboutMe.back")} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-root {
          position: relative;
          min-height: 100vh;
          height: 100dvh;
        }

        .resume-shell {
          position: relative;
          z-index: 10;
          min-height: 100%;
          padding: clamp(18px, 3vw, 36px);
          display: grid;
          grid-template-columns: minmax(290px, 400px) minmax(520px, 1fr);
          gap: clamp(16px, 2vw, 28px);
          align-items: start;
        }

        .resume-nav {
          max-height: calc(100vh - clamp(36px, 6vw, 72px));
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 8px;
        }

        .resume-nav::-webkit-scrollbar,
        .resume-rows::-webkit-scrollbar,
        .resume-panel::-webkit-scrollbar {
          width: 10px;
        }

        .resume-nav::-webkit-scrollbar-thumb,
        .resume-rows::-webkit-scrollbar-thumb,
        .resume-panel::-webkit-scrollbar-thumb {
          background: rgba(143, 245, 255, 0.72);
          border-radius: 12px;
        }

        .resume-nav-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(52px, 7vw, 84px);
          line-height: 0.9;
          letter-spacing: 2px;
          color: #f4fbff;
          margin: 0 0 12px 0;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.28);
        }

        .resume-nav-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .resume-nav-card {
          width: 100%;
          border: 0;
          text-align: left;
          cursor: pointer;
          background: linear-gradient(135deg, rgba(15, 24, 96, 0.5), rgba(10, 16, 70, 0.53));
          color: #e9fbff;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          padding: 14px 16px;
          box-shadow: 0 8px 0 rgba(7, 12, 52, 0.78);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .resume-nav-card:hover {
          transform: translateX(4px);
        }

        .resume-nav-card.active {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(223, 246, 255, 0.98));
          color: #02133f;
          box-shadow: 12px 10px 0 #d63232, 0 0 0 3px rgba(255, 255, 255, 0.9);
          transform: translateX(8px) scale(1.01);
        }

        .resume-nav-card-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 3vw, 42px);
          line-height: 1;
          letter-spacing: 0.8px;
          white-space: normal;
          word-break: break-word;
        }

        .resume-nav-card-subtitle {
          margin-top: 7px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 21px;
          letter-spacing: 1px;
          opacity: 0.92;
        }

        .resume-panel {
          max-height: calc(100vh - clamp(36px, 6vw, 72px));
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(180deg, rgba(14, 25, 100, 0.62), rgba(8, 16, 68, 0.62));
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 240, 255, 0.2), 14px 14px 0 rgba(2, 7, 36, 0.6);
          padding: 18px;
        }

        .resume-panel-head {
          background: linear-gradient(90deg, #8ef5ff 0%, #d5fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          padding: 14px 16px;
          color: #04153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }

        .resume-panel-title {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(34px, 4vw, 48px);
          line-height: 0.95;
          letter-spacing: 0.8px;
          white-space: normal;
        }

        .resume-panel-subtitle {
          margin: 8px 0 0 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
        }

        .resume-rows {
          margin-top: 14px;
          max-height: 46vh;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .resume-row {
          border: 0;
          width: 100%;
          text-align: left;
          background: rgba(8, 18, 72, 0.51);
          color: #ecfbff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.2);
          padding: 10px 12px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        }

        .resume-row:hover {
          transform: translateX(3px);
          background: rgba(13, 27, 98, 1);
        }

        .resume-row.focused {
          transform: translateX(6px);
          background: rgba(28, 53, 156, 1);
          box-shadow: inset 0 0 0 2px rgba(157, 246, 255, 0.95), 0 0 18px rgba(157, 246, 255, 0.3);
        }

        .resume-row-main {
          min-width: 0;
        }

        .resume-row-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(22px, 2.3vw, 30px);
          line-height: 1.05;
          letter-spacing: 0.3px;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .resume-row-meta {
          margin-top: 6px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.8px;
          opacity: 0.92;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .resume-row-cta {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 0.9px;
          padding: 6px 10px;
          background: #8df6ff;
          color: #00103a;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          white-space: nowrap;
        }

        .resume-detail {
          margin-top: 14px;
          background: rgba(5, 13, 57, 0.98);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.18);
          padding: 16px;
        }

        .resume-detail-title {
          margin: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1.4px;
          color: #95f6ff;
        }

        .resume-detail-text {
          margin-top: 10px;
          font-family: 'Anton', sans-serif;
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.25;
          color: #edfaff;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .resume-helper {
          margin-top: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: rgba(206, 250, 255, 0.9);
        }

        @media (max-width: 1180px) {
          .resume-shell {
            grid-template-columns: 1fr;
            padding-bottom: 16px;
          }

          .resume-nav,
          .resume-panel {
            max-height: none;
          }

          .resume-rows {
            max-height: 50vh;
          }
        }

        @media (max-width: 760px) {
          .resume-shell {
            padding: 86px 12px 12px 12px;
            gap: 12px;
          }

          .resume-nav-title {
            font-size: 56px;
          }

          .resume-nav-card {
            padding: 12px 12px;
            clip-path: polygon(0 0, 98% 0, 100% 100%, 2% 100%);
          }

          .resume-nav-card.active {
            transform: translateX(4px) scale(1.005);
            box-shadow: 8px 8px 0 #d63232, 0 0 0 2px rgba(255, 255, 255, 0.9);
          }

          .resume-nav-card-title {
            font-size: 30px;
          }

          .resume-nav-card-subtitle {
            font-size: 19px;
          }

          .resume-panel {
            padding: 12px;
            max-height: none;
          }

          .resume-panel-head {
            padding: 10px 12px;
          }

          .resume-panel-title {
            font-size: 36px;
          }

          .resume-panel-subtitle {
            font-size: 20px;
          }

          .resume-rows {
            margin-top: 10px;
            max-height: 42vh;
            gap: 8px;
            padding-right: 4px;
          }

          .resume-row {
            padding: 10px;
            gap: 8px;
            min-height: 60px;
          }

          .resume-row-title {
            font-size: 24px;
          }

          .resume-row-meta {
            font-size: 18px;
          }

          .resume-row-cta {
            font-size: 14px;
            padding: 5px 8px;
          }

          .resume-detail {
            margin-top: 10px;
            padding: 12px;
          }

          .resume-detail-title {
            font-size: 24px;
          }

          .resume-detail-text {
            font-size: 18px;
          }

          .resume-helper {
            font-size: 18px;
          }
        }

        @media (max-height: 760px) {
          .resume-shell {
            padding-top: 78px;
            gap: 10px;
          }

          .resume-nav-title {
            font-size: 48px;
          }

          .resume-nav-card {
            padding: 10px 12px;
          }

          .resume-nav-card-title {
            font-size: 26px;
          }

          .resume-panel {
            padding: 10px;
          }

          .resume-panel-title {
            font-size: 30px;
          }

          .resume-panel-subtitle {
            font-size: 18px;
          }

          .resume-rows {
            max-height: 36vh;
          }
        }
      `}</style>

      <div className="resume-shell">
        <aside
          className="resume-nav"
          aria-label="Resume sections"
          ref={navContainerRef}>
          <h2 className="resume-nav-title">{t("resume.navTitle")}</h2>
          <div className="resume-nav-list">
            {sections.map((item, index) => (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  sectionButtonRefs.current[index] = el;
                }}
                className={`resume-nav-card${activeSection === index ? " active" : ""}`}
                onMouseEnter={() => {
                  playHover();
                  setActiveSection(index);
                }}
                onClick={() => {
                  playConfirm();
                  setActiveSection(index);
                }}>
                <div className="resume-nav-card-title">{item.title}</div>
                <div className="resume-nav-card-subtitle">{item.subtitle}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="resume-panel" aria-live="polite">
          <header className="resume-panel-head">
            <h3 className="resume-panel-title">{section.title}</h3>
            <p className="resume-panel-subtitle">{section.subtitle}</p>
          </header>

          <div className="resume-rows" ref={rowsContainerRef}>
            {rows.map((row, index) => (
              <button
                key={`${section.id}-${row.title}-${index}`}
                type="button"
                ref={(el) => {
                  rowButtonRefs.current[index] = el;
                }}
                className={`resume-row${activeRow === index ? " focused" : ""}`}
                onMouseEnter={() => {
                  playHover();
                  setActiveRow(index);
                }}
                onClick={() => {
                  setActiveRow(index);
                  if (row.href) {
                    playConfirm();
                    window.open(row.href, "_blank");
                  }
                }}>
                <div className="resume-row-main">
                  <div className="resume-row-title">{row.title}</div>
                  <div className="resume-row-meta">{row.meta}</div>
                </div>
                {row.href ? <span className="resume-row-cta">{t("resume.open")}</span> : null}
              </button>
            ))}
          </div>

          <article className="resume-detail">
            <h4 className="resume-detail-title">{t("resume.detailsTitle")}</h4>
            <p className="resume-detail-text">
              {selectedRow?.description || "No details available."}
            </p>
          </article>

          <p className="resume-helper">{helperText}</p>
        </section>
      </div>
    </div>
  );
}

