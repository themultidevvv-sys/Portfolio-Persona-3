import { useState, useEffect, useRef, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion as Motion } from "framer-motion";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main3.optimized.mp4";
import bgMusic from "./assets/Social.mp3";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundMusic from "./components/BackgroundMusic";
import MobileBackButton from "./components/MobileBackButton";
import { PROJECTS_DATA, SOCIAL_LINKS } from "./data/portfolioData";
import { usePersonaSfx } from "./lib/usePersonaSfx";
import { useSafeBackNavigation } from "./lib/useSafeBackNavigation";
import { useLanguage } from "./context/LanguageContext";

const FEATURES = { newBadge: false };

function normalizeTarget(target) {
  return /^(https?:\/\/|mailto:)/.test(target) ? target : `https://${target}`;
}

function openLink(target) {
  const href = normalizeTarget(target);
  if (href.startsWith("mailto:")) {
    window.location.href = href;
    return;
  }
  window.open(href, "_blank");
}

const CHARS = [char1, char2, char3];

const ROLES = [
  {
    text: "LEADER",
    color: "#e8c100",
    bg: "rgba(232,193,0,0.12)",
    border: "rgba(232,193,0,0.5)",
  },
  {
    text: "PARTY",
    color: "#4a8fff",
    bg: "rgba(74,143,255,0.12)",
    border: "rgba(74,143,255,0.5)",
  },
  {
    text: "PARTY",
    color: "#4a8fff",
    bg: "rgba(74,143,255,0.12)",
    border: "rgba(74,143,255,0.5)",
  },
];

export default function Socials({ mediaMuted = true, sfxMuted = true }) {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left"); // "left" | "right"
  const [showContact, setShowContact] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const ITEMS = useMemo(() => {
    return [
      {
        id: "profiles",
        label: t("socials.socialProfiles"),
        href: SOCIAL_LINKS[0].href,
        icon: "DEV",
        barIcon: icon1,
        entries: SOCIAL_LINKS,
        counts: SOCIAL_LINKS.map(() => t("socials.open")),
        newBars: [0, 1],
        stats: [
          { tag: t("socials.stats.all"), value: String(SOCIAL_LINKS.length), color: "#9147ff" },
          { tag: t("socials.stats.type"), value: t("socials.stats.social"), color: "#bf94ff" },
        ],
      },
      {
        id: "projects",
        label: t("socials.projectLinks"),
        href: PROJECTS_DATA[0].liveUrl,
        icon: "PRJ",
        barIcon: icon2,
        entries: PROJECTS_DATA.map((item) => ({
          label: item.title === "Check My GitHub" ? t("socials.projects.checkGithub") : item.title,
          href: item.liveUrl,
        })),
        counts: PROJECTS_DATA.map(() => t("socials.open")),
        newBars: [0, 3, 5],
        stats: [
          { tag: t("socials.stats.all"), value: String(PROJECTS_DATA.length), color: "#e1306c" },
          { tag: t("socials.stats.type"), value: t("socials.stats.project"), color: "#f77737" },
        ],
      },
    ].map((item) => ({
      ...item,
      links: item.entries.map((entry) => entry.href),
      bars: item.entries.length,
    }));
  }, [t, language]);

  const emailHref = SOCIAL_LINKS.find((item) => item.label === "Email")?.href;
  const emailAddress = emailHref?.split("to=")[1] || "themultidevvv@gmail.com";

  const handleOpenItem = (target, label) => {
    if (label === "Email") {
      setShowContact(true);
      return;
    }
    openLink(target);
  };
  const { goBack } = useSafeBackNavigation("/");
  const { playHover, playConfirm, playBack, playInvalid } = usePersonaSfx({
    muted: sfxMuted,
  });
  const infoRowRefs = useRef([]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const [lastActive, setLastActive] = useState(active);
  if (lastActive !== active) {
    setLastActive(active);
    setActiveInfoBar(0);
  }

  useEffect(() => {
    infoRowRefs.current = [];
  }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      const barCount = ITEMS[active].bars;

      if (showContact) {
        if (e.key === "Escape" || e.key === "Backspace") {
          setSent(false);
          setSending(false);
          setShowContact(false);
        }
        return;
      }

      if (focus === "left") {
        if (e.key === "ArrowUp" || key === "w" || key === "z") {
          playHover();
          setActive((i) => Math.max(0, i - 1));
          setActiveInfoBar(0);
        }
        if (e.key === "ArrowDown" || key === "s") {
          playHover();
          setActive((i) => Math.min(ITEMS.length - 1, i + 1));
          setActiveInfoBar(0);
        }
        if (e.key === "ArrowRight" || key === "d") {
          playHover();
          setFocus("right");
          setActiveInfoBar(0);
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playHover();
          setFocus("right");
          setActiveInfoBar(0);
        }
      } else {
        if (e.key === "ArrowUp" || key === "w" || key === "z") {
          playHover();
          setActiveInfoBar((i) => Math.max(0, i - 1));
        }
        if (e.key === "ArrowDown" || key === "s") {
          playHover();
          setActiveInfoBar((i) => Math.min(barCount - 1, i + 1));
        }
        if (e.key === "ArrowLeft" || key === "a" || key === "q") {
          playHover();
          setFocus("left");
        }
        if (e.key === "ArrowRight" || key === "d") {
          playInvalid();
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!ITEMS[active].links[activeInfoBar]) {
            playInvalid();
            return;
          }
          playConfirm();
          const target = ITEMS[active].links[activeInfoBar];
          const label = ITEMS[active].entries[activeInfoBar]?.label;
          handleOpenItem(target, label);
        }
      }
      if (
        ((e.key === "ArrowLeft" || key === "a" || key === "q") &&
          focus === "left") ||
        e.key === "Escape" ||
        e.key === "Backspace"
      ) {
        playBack();
        goBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    active,
    goBack,
    focus,
    activeInfoBar,
    playHover,
    playConfirm,
    playBack,
    playInvalid,
    showContact,
    ITEMS,
  ]);

  useEffect(() => {
    if (focus !== "right") return;
    const row = infoRowRefs.current[activeInfoBar];
    if (!row) return;
    row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [focus, activeInfoBar, active]);

  return (
    <div id="menu-screen">
      <BackgroundVideo src={bgVideo} muted={true} />
      <BackgroundMusic src={bgMusic} muted={mediaMuted} />
      <MobileBackButton onBeforeBack={playBack} label={t("aboutMe.back")} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 16px;
          padding-left: clamp(10px, 2vw, 22px);
          padding-right: clamp(280px, 30vw, 520px);
          padding-top: 72px;
          padding-bottom: 132px;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: min(100%, clamp(820px, 76vw, 1080px));
          height: 116px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          margin-bottom: 8px;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 160px; }
        .sc-bar-outer.active .sc-bar-red { height: 160px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: min(100%, clamp(820px, 76vw, 1080px));
          height: 116px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          padding: 0 18px 0 18px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 52px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 12px 0 4px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          gap: 3px;
          padding-left: clamp(36px, 4vw, 64px);
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-width: 0;
          justify-content: flex-start;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          width: 40px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          line-height: 1;
          color: rgba(255,255,255,0.98);
          text-shadow: 0 1px 6px rgba(0,0,0,0.42);
          transition: color 0.2s ease;
          user-select: none;
          white-space: nowrap;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* lb/rb nav row */
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: 12px;
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 10px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 72px;
          height: 100%;
          width: auto;
          max-width: 138px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 1;
          opacity: 0.78;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* right-side nav bar */
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 55;
          background: rgba(8, 14, 42, 0.82);
          padding: 4px 12px;
          border-radius: 8px;
          box-shadow: inset 0 0 0 1px rgba(145,245,255,0.3);
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #e9fbff;
          text-shadow: 0 1px 0 rgba(0,0,0,0.55);
          padding: 0 8px;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-mobile-cats {
          display: none;
        }

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-panel {
          position: fixed;
          top: 128px;
          bottom: 132px;
          right: 16px;
          width: min(36vw, 560px);
          max-height: none;
          overflow-y: auto;
          overflow-x: visible;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          z-index: 51;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 10px 10px 10px 42px;
          clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 14px);
          background: linear-gradient(180deg, rgba(12, 18, 56, 0.25), rgba(5, 9, 28, 0.96));
          box-shadow:
            0 14px 0 rgba(2, 6, 22, 0.92),
            inset 0 0 0 1px rgba(145,245,255,0.34),
            inset 0 -12px 0 rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sc-info-panel::-webkit-scrollbar {
          width: 8px;
        }
        .sc-info-panel::-webkit-scrollbar-thumb {
          background: rgba(145, 246, 255, 0.62);
          border-radius: 10px;
        }

        .sc-info-panel::before {
          content: '';
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          margin: -10px 0 2px;
          background: linear-gradient(90deg, rgba(196, 0, 26, 0.95) 0%, rgba(196, 0, 26, 0.55) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 12px 100%);
          pointer-events: none;
        }

        .sc-info-bar-wrap {
          position: relative;
          width: 100%;
          min-height: 62px;
          background: linear-gradient(180deg, rgba(18, 27, 74, 0.53), rgba(10, 16, 48, 0.53));
          pointer-events: all;
          cursor: pointer;
          z-index: 1;
          padding: 2px;
          clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 10px);
          box-shadow: inset 0 0 0 1px rgba(145,245,255,0.22);
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap:hover {
          background: rgba(10,15,40,0.96);
          padding: 2px;
          clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
          box-shadow: 0 0 16px rgba(123,232,255,0.35);
        }
        .sc-info-bar-wrap.selected {
          background: linear-gradient(180deg, rgba(10, 11, 16, 0.98), rgba(24, 24, 28, 0.98));
          padding: 3px;
          clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
          box-shadow:
            0 0 22px rgba(141,246,255,0.5),
            inset 0 0 0 2px rgba(141,246,255,0.9),
            inset 0 -10px 0 rgba(0, 0, 0, 0.18);
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(6, 11, 32, 0.9);
          display: flex;
          align-items: center;
          overflow: visible;
          border-radius: 4px;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: linear-gradient(180deg, rgba(250, 252, 255, 1), rgba(232, 238, 248, 1));
          border-radius: 6px;
        }
        .sc-info-bar-new {
          position: absolute;
          left: 6px;
          top: -12px;
          height: 24px;
          width: auto;
          pointer-events: none;
          z-index: 5;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.45));
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 23px;
          letter-spacing: 1px;
          line-height: 1.2;
          color: #ecfbff;
          padding: 0 10px;
          white-space: normal;
          overflow-wrap: anywhere;
          user-select: none;
          text-shadow: 0 1px 0 rgba(0,0,0,0.45);
        }
        .sc-info-bar-wrap.selected .sc-info-bar-text {
          color: #04133f;
          font-weight: 700;
          text-shadow: none;
        }
        .sc-info-bar-box {
          height: 70%;
          background: linear-gradient(180deg, #0a0a0d 0%, #000 100%);
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 4px;
          margin-right: 4px;
          user-select: none;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #d8f6ff;
          margin-right: 14px;
          flex-shrink: 0;
          user-select: none;
        }
        .sc-info-bar-wrap.selected .sc-info-bar-count {
          color: #111;
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 60;
          background: rgba(4, 8, 28, 0.84);
          padding: 8px 10px;
          border-radius: 10px;
          box-shadow: inset 0 0 0 1px rgba(145,245,255,0.35);
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.92);
          background: rgba(8,12,38,0.7);
          padding: 2px 8px;
          border-radius: 6px;
          box-shadow: inset 0 0 0 1px rgba(145,245,255,0.35);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
          color: #e9fbff;
          background: rgba(145,245,255,0.2);
        }

        @media (max-width: 1200px) {
          .sc-root {
            padding-right: min(30vw, 420px);
          }
          .sc-bar,
          .sc-bar-red {
            width: min(72vw, 1000px);
          }
          .sc-info-panel {
            top: auto;
            bottom: 118px;
            right: 10px;
            width: min(48vw, 620px);
            max-height: 46vh;
          }
        }

        @media (max-width: 900px) {
          .sc-mobile-cats {
            position: fixed;
            top: 78px;
            left: 8px;
            right: 8px;
            z-index: 70;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            pointer-events: all;
          }

          .sc-mobile-cat {
            border: 1px solid rgba(145,245,255,0.45);
            background: linear-gradient(180deg, rgba(12, 20, 62, 0.95), rgba(7, 12, 36, 0.95));
            color: #dff9ff;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 17px;
            letter-spacing: 1px;
            line-height: 1;
            min-height: 44px;
            padding: 10px 8px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
            box-shadow: 0 6px 12px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06);
          }

          .sc-mobile-cat.active {
            background: linear-gradient(180deg, rgba(143,245,255,0.96), rgba(105,223,255,0.96));
            color: #051746;
            box-shadow: 0 8px 14px rgba(0,0,0,0.35), 0 0 0 2px rgba(145,245,255,0.35);
          }

          .sc-root {
            display: none;
          }

          .sc-root {
            left: 0;
            right: 0;
            justify-content: flex-start;
            padding: 90px 10px 126px 10px;
            gap: 10px;
          }
          .sc-bar,
          .sc-bar-red {
            width: min(95vw, 720px);
            height: 68px;
          }
          .sc-bar-outer.active .sc-bar,
          .sc-bar-outer.active .sc-bar-red {
            height: 84px;
          }
          .sc-char {
            left: 64px;
            max-width: 108px;
          }
          .sc-role {
            font-size: 32px;
            padding-right: 10px;
          }
          .sc-label {
            font-size: 24px;
            letter-spacing: 2px;
          }
          .sc-stats {
            padding-right: 8px;
            gap: 6px;
          }

          .sc-main {
            padding-left: clamp(44px, 8vw, 90px);
          }
          .sc-stat-num {
            font-size: 18px;
          }
          .sc-right-nav {
            display: none;
          }
          .sc-info-panel {
            left: 8px;
            right: 8px;
            width: auto;
            top: 132px;
            bottom: 90px;
            padding-left: 14px;
            max-height: none;
          }
          .sc-info-bar-wrap {
            min-height: 64px;
          }
          .sc-info-bar-text {
            font-size: 21px;
          }
          .sc-info-bar-box {
            font-size: 14px;
            padding: 0 8px;
          }
          .sc-info-bar-count {
            font-size: 16px;
          }
          .sc-footer {
            left: 8px;
            right: 8px;
            bottom: 10px;
            align-items: stretch;
            gap: 6px;
          }
          .sc-footer-row {
            justify-content: space-between;
            font-size: 12px;
          }
          .sc-footer-row:nth-child(3),
          .sc-footer-row:nth-child(4) {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .sc-char {
            display: none;
          }
          .sc-main {
            align-items: flex-start;
            padding-left: 0;
          }
          .sc-role {
            font-size: 24px;
            transform: none;
            letter-spacing: -0.5px;
          }
          .sc-bar-content {
            padding: 0 12px;
            gap: 10px;
          }
          .sc-label {
            font-size: 20px;
          }
          .sc-info-panel {
            top: 128px;
            bottom: 82px;
            max-height: none;
            padding-left: 10px;
            gap: 8px;
          }
          .sc-mobile-cats {
            top: 74px;
            gap: 6px;
          }
          .sc-mobile-cat {
            min-height: 42px;
            font-size: 15px;
            padding: 9px 6px;
          }
        }

        @media (max-height: 760px) {
          .sc-mobile-cats {
            top: 70px;
          }

          .sc-info-panel {
            top: 122px;
            bottom: 78px;
          }

          .sc-info-bar-wrap {
            min-height: 56px;
          }

          .sc-info-bar-text {
            font-size: 18px;
          }

          .sc-info-bar-box,
          .sc-info-bar-count {
            font-size: 14px;
          }

          .sc-footer {
            bottom: 6px;
            right: 8px;
            gap: 4px;
            padding: 6px 8px;
          }

          .sc-footer-row {
            font-size: 11px;
            gap: 6px;
          }
        }

        .sc-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(5, 7, 12, 0.72);
          backdrop-filter: blur(3px);
        }

        .sc-modal {
          position: relative;
          width: min(460px, 92vw);
          background: linear-gradient(170deg, rgba(16, 22, 40, 0.97), rgba(8, 11, 22, 0.98));
          color: #e8fbff;
          padding: 30px 28px 26px;
          border-left: 5px solid #c4001a;
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: 14px 16px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(60, 226, 255, 0.18);
          font-family: 'Bebas Neue', sans-serif;
        }

        .sc-modal::after {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 16px; height: 100%;
          background: repeating-linear-gradient(180deg, rgba(255,42,42,0.45) 0 5px, rgba(255,42,42,0) 5px 10px);
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
          pointer-events: none;
        }

        .sc-modal-email {
          font-size: 26px;
          letter-spacing: 1.5px;
          color: #3ce2ff;
          word-break: break-all;
          margin-bottom: 8px;
        }

        .sc-modal-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 17px;
          line-height: 1.35;
          color: rgba(232, 251, 255, 0.85);
          margin-bottom: 18px;
        }

        .sc-modal-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sc-modal-input {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          color: #07133b;
          background: #eaf6f9;
          border: 1px solid rgba(60, 226, 255, 0.4);
          padding: 10px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 7px) 100%, 0 100%);
          outline: none;
        }
        .sc-modal-input:focus {
          border-color: #3ce2ff;
          box-shadow: 0 0 0 2px rgba(60, 226, 255, 0.3);
        }
        .sc-modal-message {
          min-height: 86px;
          resize: vertical;
        }

        .sc-modal-submit {
          align-self: flex-start;
          cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          font-size: 18px;
          color: #fff;
          background: #c4001a;
          border: 0;
          padding: 10px 20px;
          margin-top: 4px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.35);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .sc-modal-submit:hover {
          transform: translateY(-1px);
          background: #e0051f;
        }

        .sc-modal-close {
          position: absolute;
          top: 8px; right: 16px;
          cursor: pointer;
          background: none;
          border: 0;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          line-height: 1;
          opacity: 0.7;
          transition: opacity 0.15s ease;
        }
        .sc-modal-close:hover { opacity: 1; }

        /* sent animation */
        .sc-sent-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          overflow: hidden;
          perspective: 1100px;
          transform-style: preserve-3d;
        }
        .sc-sent-band {
          position: absolute;
          top: -20%;
          height: 140%;
          z-index: 0;
          pointer-events: none;
        }
        .sc-sent-glow {
          position: absolute;
          z-index: 1;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(60, 226, 255, 0.22) 0%, rgba(60, 226, 255, 0) 65%);
          pointer-events: none;
        }
        .sc-sent-card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: min(280px, 80vw);
          padding: 30px 34px 26px;
          background: linear-gradient(170deg, rgba(16, 22, 40, 0.97), rgba(8, 11, 22, 0.98));
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 12px 14px 0 rgba(0, 0, 0, 0.42), inset 0 0 0 1px rgba(60, 226, 255, 0.28);
          border-left: 5px solid #c4001a;
          backface-visibility: hidden;
          font-family: 'Bebas Neue', sans-serif;
        }
        .sc-sent-flag {
          position: absolute;
          top: 12px;
          right: 14px;
          width: 14px;
          height: 14px;
          border: 2px solid #7ff6ff;
          border-radius: 50%;
          background: radial-gradient(circle, #7ff6ff 0%, #53edff 70%, transparent 71%);
          box-shadow: 0 0 10px rgba(83, 237, 255, 0.8);
        }
        .sc-sent-ring {
          position: relative;
          width: 92px;
          height: 92px;
          margin-bottom: 18px;
          border: 3px solid #7ff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 22px rgba(83, 237, 255, 0.55), inset 0 0 14px rgba(83, 237, 255, 0.3);
        }
        .sc-sent-ring::before {
          content: "";
          position: absolute;
          inset: -9px;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: sc-sent-spin 1.2s linear infinite;
        }
        @keyframes sc-sent-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sc-sent-check {
          width: 44px;
          height: 44px;
          display: block;
        }
        .sc-sent-title {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          letter-spacing: 4px;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 4px 4px 0 rgba(196, 0, 26, 0.9);
          margin-bottom: 6px;
        }
        .sc-sent-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px;
          letter-spacing: 1px;
          color: rgba(232, 251, 255, 0.88);
          text-align: center;
          margin-top: 8px;
          word-break: break-word;
        }
        .sc-sent-tag {
          margin-top: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          color: #53edff;
          text-transform: uppercase;
          animation: sc-sent-pulse 1s ease-in-out infinite;
        }
        @keyframes sc-sent-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .sc-sent-cover {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(170deg, rgba(22, 32, 60, 0.99), rgba(10, 14, 30, 0.99));
          border-left: 5px solid #c4001a;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(60, 226, 255, 0.28);
          backface-visibility: hidden;
          transform-origin: left center;
          font-family: 'Bebas Neue', sans-serif;
        }
        .sc-sent-cover-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 3px;
          color: #7ff6ff;
          text-transform: uppercase;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.7);
        }
        .sc-sent-cover-cord {
          position: absolute;
          top: 0;
          width: 3px;
          height: 100%;
          background: rgba(196, 0, 26, 0.7);
          transform: skewX(-16deg);
        }
        .sc-sent-ail {
          position: absolute;
          top: -4px;
          left: 50%;
          width: 44px;
          height: 44px;
          transform: translateX(-50%);
          background: radial-gradient(circle, #7ff6ff 0%, #53edff 55%, transparent 60%);
          border-radius: 50% 50% 8% 8%;
          box-shadow: 0 0 16px rgba(83, 237, 255, 0.7);
        }
        .sc-sent-ail::after {
          content: "EA";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #07133b;
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          font-weight: 700;
        }
        .sc-sent-back {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(4, 8, 28, 0.85);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          font-family: 'Bebas Neue', sans-serif;
        }
        .sc-sent-back-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 3px;
          color: #7ff6ff;
          text-transform: uppercase;
        }
        .sc-sent-back-dots {
          display: flex;
          gap: 7px;
        }
        .sc-sent-back-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c4001a;
          animation: sc-sent-dot 0.7s ease-in-out infinite;
        }
        .sc-sent-back-dots span:nth-child(2) { animation-delay: 0.15s; }
        .sc-sent-back-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes sc-sent-dot {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-5px); opacity: 1; }
        }

        .sc-sent-sweep {
          position: absolute;
          top: -30%;
          height: 160%;
          width: 100%;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(105deg, rgba(83, 237, 255, 0.0) 0%, rgba(83, 237, 255, 0.35) 50%, rgba(83, 237, 255, 0.0) 100%);
          transform: skewX(-20deg);
          animation: sc-sent-sweep 0.9s ease-out forwards;
        }
        @keyframes sc-sent-sweep {
          from { opacity: 0; transform: translateX(-100%) skewX(-20deg); }
          40% { opacity: 1; }
          to { opacity: 0; transform: translateX(160%) skewX(-20deg); }
        }

        .sc-sent-mini {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .sc-sent-mini span {
          position: absolute;
          display: block;
          top: -30%;
          height: 160%;
          transform: skewX(-16deg);
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active !== i) playConfirm();
              else playHover();
              setActive(i);
              setFocus("left");
              setActiveInfoBar(0);
            }}
            onMouseEnter={() => {
              playHover();
              setActive(i);
            }}>
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map((s) => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span
                          className="sc-stat-tag"
                          style={{ color: s.color, borderColor: s.color }}>
                          {s.tag}
                        </span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div
                          className="sc-stat-bar-color"
                          style={{ background: s.color }}
                        />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-mobile-cats" aria-label="Social categories">
          {ITEMS.map((item, i) => (
            <button
              key={`mobile-cat-${item.id}`}
              type="button"
              className={`sc-mobile-cat${active === i ? " active" : ""}`}
              onClick={() => {
                if (active !== i) playConfirm();
                else playHover();
                setActive(i);
                setActiveInfoBar(0);
                setFocus("right");
              }}>
              {item.icon}
            </button>
          ))}
        </div>
      )}

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && (
        <div className="sc-info-panel">
          {Array.from({ length: ITEMS[active].bars }).map((_, i) => (
            <div
              className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
              key={`bar-${active}-${i}`}
              ref={(node) => {
                infoRowRefs.current[i] = node;
              }}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => {
                const target = ITEMS[active].links[i];
                if (!target) {
                  playInvalid();
                  return;
                }
                playConfirm();
                setActiveInfoBar(i);
                setFocus("right");
                handleOpenItem(target, ITEMS[active].entries[i]?.label);
              }}
              onMouseEnter={() => {
                playHover();
                setActiveInfoBar(i);
                setFocus("right");
              }}>
              {FEATURES.newBadge && ITEMS[active].newBars.includes(i) && (
                <img className="sc-info-bar-new" src={newsign} alt="" />
              )}
              <div className="sc-info-bar">
                <img
                  className="sc-info-bar-icon"
                  src={ITEMS[active].barIcon}
                  alt=""
                />
                <span className="sc-info-bar-text">
                  {ITEMS[active].entries[i].label}
                </span>
                <span className="sc-info-bar-box">{t("socials.views")}</span>
                <span className="sc-info-bar-count">
                  {ITEMS[active].counts[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">W/Z/S or ↑↓</span>
          <span>{t("socials.footer.selectCategory")}</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ENTER/SPACE</span>
          <span>{t("socials.footer.moveOrOpen")}</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">A/Q</span>
          <span>{t("socials.footer.back")}</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>{t("socials.footer.back")}</span>
        </div>
      </div>

      <AnimatePresence>
        {showContact && (
          <Motion.div
            className="sc-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowContact(false)}>
            <Motion.div
              className="sc-modal"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              onClick={(e) => e.stopPropagation()}>
              <div className="sc-modal-email">
                Email: {emailAddress}
              </div>
              <div className="sc-modal-sub">
                {t("socials.contactMe")}
              </div>
              <AnimatePresence mode="wait">
                {!sent ? (
                  <Motion.div
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}>
                    <form
                      className="sc-modal-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const templateParams = {
                          name: form.name.value,
                          from_email: form.email.value,
                          message: form.message.value,
                          to_email: emailAddress,
                        };
                        setSending(true);
                        emailjs
                          .send(
                            import.meta.env.VITE_EMAILJS_SERVICE_ID,
                            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                            templateParams,
                            { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
                          )
                          .then(() => {
                            setSending(false);
                            setSent(true);
                            form.reset();
                          })
                          .catch((error) => {
                            console.error(error);
                            setSending(false);
                          });
                      }}>
                      <input
                        className="sc-modal-input"
                        type="text"
                        name="name"
                        placeholder={t("socials.name")}
                        required
                      />
                      <input
                        className="sc-modal-input"
                        type="email"
                        name="email"
                        placeholder={t("socials.email")}
                        required
                      />
                      <textarea
                        className="sc-modal-input sc-modal-message"
                        name="message"
                        placeholder={t("socials.message")}
                        required
                      />
                      <button
                        className="sc-modal-submit"
                        type="submit"
                        disabled={sending}>
                        {sending ? t("socials.sending") : t("socials.send")}
                      </button>
                    </form>
                  </Motion.div>
                ) : (
                  <Motion.div key="sent-anim" className="sc-sent-wrap" style={{ position: "relative" }}>
                    <Motion.div
                      className="sc-sent-mini"
                      style={{ zIndex: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 }}>
                      {["#00184c", "#00dff7", "#ffffff"].map((c, i) => (
                        <span
                          key={i}
                          className="sc-sent-band"
                          style={{
                            background: c,
                            right: `${i * 14}px`,
                            width: `${46 - i * 12}px`,
                            opacity: c === "#ffffff" ? 0.9 : 0.18,
                          }}
                        />
                      ))}
                    </Motion.div>

                    <Motion.div
                      className="sc-sent-glow"
                      style={{ zIndex: 1 }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: [0.4, 1.25, 1] }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                    />

                    <Motion.div
                      className="sc-sent-cover"
                      style={{ zIndex: 4 }}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -84 }}
                      transition={{ delay: 0.5, duration: 0.5, ease: [0.71, 0, 0.62, 1] }}
                      onAnimationComplete={() => {
                        setTimeout(() => {
                          setSent(false);
                          setShowContact(false);
                        }, 1200);
                      }}>
                      <div className="sc-sent-ail" />
                      <div className="sc-sent-back-text" style={{ marginTop: 50 }}>Sending message</div>
                      <div className="sc-sent-back-dots" style={{ marginTop: 6 }}>
                        <span /><span /><span />
                      </div>
                    </Motion.div>

                    <Motion.div
                      className="sc-sent-card"
                      style={{ zIndex: 2 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}>
                      <div className="sc-sent-flag" />
                      <div className="sc-sent-ring">
                        <svg
                          className="sc-sent-check"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#7ff6ff"
                          strokeWidth="3"
                          strokeLinecap="square"
                          strokeLinejoin="miter">
                          <Motion.path
                            d="M4 12.5 L10 18 L20 6"
                            pathLength="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                          />
                        </svg>
                      </div>
                      <div className="sc-sent-title">Sent</div>
                      <div className="sc-sent-sub" style={{ textTransform: "uppercase", letterSpacing: "2px" }}>
                        Email delivered
                      </div>
                      <div className="sc-sent-tag">— Elias Taveras —</div>
                    </Motion.div>
                  </Motion.div>
                )}
              </AnimatePresence>
              <button
                className="sc-modal-close"
                type="button"
                onClick={() => {
                  setSent(false);
                  setSending(false);
                  setShowContact(false);
                }}>
                ×
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
