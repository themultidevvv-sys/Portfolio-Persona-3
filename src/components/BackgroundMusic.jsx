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
		const applyDesiredMute = () => {
			audio.muted = muted;
		};

		const tryPlay = () => {
			audio.muted = true;
			audio
				.play()
				.then(() => {
					applyDesiredMute();
				})
				.catch(() => {
					// Autoplay can be blocked on some browsers until user interaction.
				});
		};

		const ensureLoopingPlayback = () => {
			if (audio.ended) {
				audio.currentTime = 0;
				tryPlay();
				return;
			}
			if (audio.paused && !document.hidden) {
				tryPlay();
			}
		};

		const syncAudioAfterGesture = () => {
			if (muted) {
				audio.muted = true;
				return;
			}
			if (audio.paused) {
				tryPlay();
				return;
			}
			applyDesiredMute();
		};

		tryPlay();
		audio.addEventListener("canplay", tryPlay);
		audio.addEventListener("loadeddata", tryPlay);
		audio.addEventListener("ended", ensureLoopingPlayback);
		window.addEventListener("pointerdown", syncAudioAfterGesture);
		window.addEventListener("keydown", syncAudioAfterGesture);
		window.addEventListener("touchstart", syncAudioAfterGesture, {
			passive: true,
		});

		const onVisibilityChange = () => {
			if (!document.hidden) ensureLoopingPlayback();
		};

		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			audio.pause();
			audio.removeEventListener("canplay", tryPlay);
			audio.removeEventListener("loadeddata", tryPlay);
			audio.removeEventListener("ended", ensureLoopingPlayback);
			window.removeEventListener("pointerdown", syncAudioAfterGesture);
			window.removeEventListener("keydown", syncAudioAfterGesture);
			window.removeEventListener("touchstart", syncAudioAfterGesture);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [src, muted]);

	return <audio ref={audioRef} src={src} loop autoPlay muted={muted} preload="auto" />;
}
