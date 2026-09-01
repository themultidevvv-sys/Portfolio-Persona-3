import { useLanguage } from "../context/LanguageContext";

export default function MediaControls({
	mediaMuted,
	onToggleMedia,
	soundMuted,
	onToggleSound,
}) {
	// Sound button is hidden from the page but kept for future use.
	void soundMuted;
	void onToggleSound;

	const { language, toggleLanguage } = useLanguage();

	return (
		<>
			<div className="mc-stack">
				<button
					type="button"
					onClick={onToggleMedia}
					className="mc-toggle"
					aria-pressed={!mediaMuted}
					aria-label={mediaMuted ? "Unmute music" : "Mute music"}
					style={{
						background: mediaMuted
							? "rgba(15,18,28,0.75)"
							: "rgba(196,0,26,0.85)",
					}}>
					{mediaMuted ? "MUSIC: OFF" : "MUSIC: ON"}
				</button>
			</div>

			<div className="mc-bottom-left-stack">
				<button
					type="button"
					onClick={toggleLanguage}
					className="mc-toggle mc-toggle-lang"
					aria-label="Toggle language"
					style={{
						background: language === "es"
							? "linear-gradient(135deg, rgba(196,0,26,0.95), rgba(130,0,16,0.98))"
							: "linear-gradient(135deg, rgba(10,22,60,0.92), rgba(6,12,38,0.95))",
						borderColor: language === "es" ? "#ff4d6d" : "#7ff6ff",
					}}>
					<span className="mc-lang-icon">🌐</span>
					<span>{language === "es" ? "IDIOMA: ESPAÑOL" : "LANG: ENGLISH"}</span>
				</button>
			</div>

			<style>{`
        .mc-stack {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 12px);
          right: calc(env(safe-area-inset-right, 0px) + 12px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .mc-bottom-left-stack {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
          left: calc(env(safe-area-inset-left, 0px) + 24px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .mc-toggle {
          border: 2px solid #ffffff;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.5px;
          font-size: 16px;
          line-height: 1;
          padding: 10px 14px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
          transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        }

        .mc-toggle-lang {
          font-size: 22px;
          letter-spacing: 2px;
          padding: 14px 22px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          border-width: 3px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6), 0 0 12px rgba(127,246,255,0.3);
        }

        .mc-lang-icon {
          font-size: 24px;
        }

        .mc-toggle:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 28px rgba(0,0,0,0.7), 0 0 18px rgba(127,246,255,0.6);
        }

        @media (max-width: 900px) {
          .mc-stack {
            top: calc(env(safe-area-inset-top, 0px) + 10px);
            right: calc(env(safe-area-inset-right, 0px) + 10px);
            gap: 6px;
          }
          .mc-bottom-left-stack {
            bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);
            left: calc(env(safe-area-inset-left, 0px) + 14px);
          }
          .mc-toggle {
            font-size: 14px;
            letter-spacing: 1.2px;
            padding: 8px 10px;
          }
          .mc-toggle-lang {
            font-size: 18px;
            padding: 10px 16px;
            border-width: 2px;
          }
          .mc-lang-icon {
            font-size: 20px;
          }
        }

        @media (max-height: 680px) {
          .mc-toggle {
            font-size: 12px;
            padding: 6px 8px;
            border-width: 1px;
          }
          .mc-toggle-lang {
            font-size: 16px;
            padding: 8px 14px;
          }
        }
      `}</style>
		</>
	);
}
