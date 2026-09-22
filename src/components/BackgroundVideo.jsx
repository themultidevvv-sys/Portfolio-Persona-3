import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({
	src,
	muted = true,
	className = "",
	style,
	playbackRate = 1,
	placeholderSrc = "/og-image.jpg",
}) {
	const videoRef = useRef(null);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [lastSrc, setLastSrc] = useState(src);

	if (lastSrc !== src) {
		setLastSrc(src);
		setIsVideoReady(false);
	}

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.loop = true;
		video.playsInline = true;
		video.setAttribute("playsinline", "true");
		video.setAttribute("webkit-playsinline", "true");
		video.defaultMuted = true;
		video.muted = muted;
		video.playbackRate = playbackRate;

		const markReady = () => {
			setIsVideoReady(true);
		};

		const tryPlay = () => {
			video.muted = muted;
			const playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						setIsVideoReady(true);
					})
					.catch(() => {
						// If unmuted autoplay is blocked by browser policy, try playing muted
						if (!muted) {
							video.muted = true;
							video
								.play()
								.then(() => setIsVideoReady(true))
								.catch(() => {});
						}
					});
			}
		};

		const syncAudioAfterGesture = () => {
			video.muted = muted;
			if (video.paused) {
				tryPlay();
			}
		};

		tryPlay();

		video.addEventListener("playing", markReady);
		video.addEventListener("canplay", markReady);
		video.addEventListener("loadeddata", markReady);
		video.addEventListener("timeupdate", markReady);

		window.addEventListener("pointerdown", syncAudioAfterGesture);
		window.addEventListener("keydown", syncAudioAfterGesture);
		window.addEventListener("touchstart", syncAudioAfterGesture, {
			passive: true,
		});

		const onVisibilityChange = () => {
			if (!document.hidden && video.paused) {
				tryPlay();
			}
		};

		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			video.removeEventListener("playing", markReady);
			video.removeEventListener("canplay", markReady);
			video.removeEventListener("loadeddata", markReady);
			video.removeEventListener("timeupdate", markReady);
			window.removeEventListener("pointerdown", syncAudioAfterGesture);
			window.removeEventListener("keydown", syncAudioAfterGesture);
			window.removeEventListener("touchstart", syncAudioAfterGesture);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [src, muted, playbackRate]);

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				overflow: "hidden",
			}}>
			<img
				src={placeholderSrc}
				alt=""
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					opacity: isVideoReady ? 0 : 1,
					transition: "opacity 400ms ease",
				}}
			/>
			<video
				ref={videoRef}
				src={src}
				autoPlay
				loop
				muted={muted}
				playsInline
				webkit-playsinline="true"
				preload="auto"
				poster={placeholderSrc}
				className={className}
				style={{
					pointerEvents: "none",
					opacity: isVideoReady ? 1 : 0,
					transition: "opacity 400ms ease",
					...style,
				}}
			/>
		</div>
	);
}

