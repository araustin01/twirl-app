import React, { useEffect, useMemo, useRef } from "react";

interface YoutubeViewportProps {
  url: string;
  autoplayEnabled?: boolean;
  isPlaying: boolean;
  isMuted: boolean;
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

const YoutubeViewport: React.FC<YoutubeViewportProps> = ({
  url,
  autoplayEnabled = false,
  isPlaying,
  isMuted,
  className = "",
  style = {},
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const videoId = useMemo(() => getYoutubeId(url), [url]);

  const videoSrc = useMemo(() => {
    if (!videoId) return "";

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const params = new URLSearchParams({
      autoplay: autoplayEnabled ? "1" : "0",
      controls: "0",
      disablekb: "1",
      enablejsapi: "1",
      fs: "0",
      iv_load_policy: "3",
      modestbranding: "1",
      playsinline: "1",
      rel: "0",
      origin,
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [autoplayEnabled, videoId]);

  const postCommand = (func: "playVideo" | "pauseVideo" | "mute" | "unMute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube.com"
    );
  };

  // Sync play/pause and mute state to iframe
  useEffect(() => {
    postCommand(isMuted ? "mute" : "unMute");
    postCommand(isPlaying ? "playVideo" : "pauseVideo");
  }, [isMuted, isPlaying]);

  if (!videoId) {
    return <span>Invalid YouTube URL</span>;
  }

  return (
    <div className={`youtube-viewport-container ${className}`} style={style}>
      <iframe
        ref={iframeRef}
        className="youtube-viewport-iframe"
        title="YouTube player viewport"
        src={videoSrc}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
      />

      {/* Intercept center pointer events so clicks never reach the iframe */}
      <div aria-hidden="true" className="youtube-viewport-overlay" />
    </div>
  );
};

export default YoutubeViewport;