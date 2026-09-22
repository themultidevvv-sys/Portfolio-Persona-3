import { useEffect, useRef } from "react";

export default function BackgroundMusic({ src, muted = true }) {
	const audioRef = useRef(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.loop = true;
		audio.preload = "auto";
		audio.defaultMuted = true;
		audio.muted = muted;
		audio.volume = 0.25;

		const tryPlay = () => {
			audio.muted = muted;
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch(() => {
					// Autoplay can be blocked on some browsers until user interaction.
				});
			}
		};

		const syncAudioAfterGesture = () => {
			audio.muted = muted;
			if (audio.paused && !muted) {
				tryPlay();
			}
		};

		tryPlay();
		audio.addEventListener("canplay", tryPlay);
		audio.addEventListener("loadeddata", tryPlay);

		window.addEventListener("pointerdown", syncAudioAfterGesture);
		window.addEventListener("keydown", syncAudioAfterGesture);
		window.addEventListener("touchstart", syncAudioAfterGesture, {
			passive: true,
		});

		const onVisibilityChange = () => {
			if (!document.hidden && audio.paused && !muted) {
				tryPlay();
			}
		};

		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			audio.removeEventListener("canplay", tryPlay);
			audio.removeEventListener("loadeddata", tryPlay);
			window.removeEventListener("pointerdown", syncAudioAfterGesture);
			window.removeEventListener("keydown", syncAudioAfterGesture);
			window.removeEventListener("touchstart", syncAudioAfterGesture);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [src, muted]);

	return <audio ref={audioRef} src={src} loop autoPlay muted={muted} preload="auto" />;
}

