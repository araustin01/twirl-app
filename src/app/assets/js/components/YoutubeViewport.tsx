import React, { useEffect, useMemo, useRef } from "react";

interface YoutubeViewportProps {
  url: string;
  autoplayEnabled?: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const getYoutubeId = (input: string): string | null => {
  const directIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (directIdRegex.test(input)) return input;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = input.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Load the YouTube IFrame API script once globally
function loadYouTubeAPI(): Promise<typeof window.YT> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
}

const YoutubeViewport: React.FC<YoutubeViewportProps> = ({
  url,
  autoplayEnabled = false,
  isPlaying,
  isMuted,
  onPlayingChange,
  className = "",
  style = {},
}) => {
  // YT.Player mounts into this div — not directly into an iframe ref
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  // Keep latest props accessible inside YT callbacks without re-creating the player
  const isPlayingRef = useRef(isPlaying);
  const isMutedRef = useRef(isMuted);
  const onPlayingChangeRef = useRef(onPlayingChange);

  useEffect(() => { if (playerRef.current && autoplayEnabled) playerRef.current.playVideo(); }, [autoplayEnabled]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { onPlayingChangeRef.current = onPlayingChange; }, [onPlayingChange]);

  const videoId = useMemo(() => getYoutubeId(url), [url]);

  // Boot or re-create the player when videoId changes
  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let player: YT.Player;

    loadYouTubeAPI().then((YT) => {
      // Destroy previous player instance if videoId changed
      playerRef.current?.destroy();

      player = new YT.Player(containerRef.current!, {
        videoId,
        playerVars: {
          autoplay: autoplayEnabled ? 1 : 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            // Sync initial state
            isMutedRef.current ? e.target.mute() : e.target.unMute();
            autoplayEnabled ? e.target.playVideo() : e.target.pauseVideo();
          },
          onStateChange: (e) => {
            const state = e.target.getPlayerState();
            if (state === YT.PlayerState.PLAYING) onPlayingChangeRef.current?.(true);
            if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
              onPlayingChangeRef.current?.(false);
            }
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      player?.destroy();
      playerRef.current = null;
    };
  }, [videoId]); // only re-create when video changes, not on every prop change

  // Sync play/pause and mute without re-creating the player
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    isPlaying ? p.playVideo() : p.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    isMuted ? p.mute() : p.unMute();
  }, [isMuted]);

  if (!videoId) return <span>Invalid YouTube URL</span>;

  return (
    <div className={`youtube-viewport-container ${className}`} style={style}>
      {/* YT.Player replaces this div with an iframe internally */}
      <div ref={containerRef} className="youtube-viewport-iframe" />
    </div>
  );
};

// Extend window type for YT API globals
declare global {
  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default YoutubeViewport;