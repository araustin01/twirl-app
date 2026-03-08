import React, { useEffect, useMemo, useRef, useState } from "react";

interface YoutubeViewportProps {
  url: string;
  autoplayEnabled?: boolean;
  isPlaying: boolean;
  isMuted: boolean;
}

const getYoutubeId = (input: string): string | null => {
  const directIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  if (directIdRegex.test(input)) {
    return input;
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = input.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const YoutubeViewport: React.FC<YoutubeViewportProps> = ({
  url,
  autoplayEnabled = true,
  isPlaying,
  isMuted,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const videoId = useMemo(() => getYoutubeId(url), [url]);

  const videoSrc = useMemo(() => {
    if (!videoId) {
      return "";
    }

    const params = new URLSearchParams({
      autoplay: "1",
      controls: "0",
      disablekb: "1",
      enablejsapi: "1",
      fs: "0",
      iv_load_policy: "3",
      modestbranding: "1",
      playsinline: "1",
      rel: "0",
      mute: autoplayEnabled ? "0" : "1",
      origin: window.location.origin,
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [autoplayEnabled, videoId]);

  const postCommand = (func: "playVideo" | "pauseVideo" | "mute" | "unMute") => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      return;
    }

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args: [],
      }),
      "https://www.youtube.com"
    );
  };

  useEffect(() => {
    setIsReady(false);
  }, [videoSrc]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (isMuted) {
      postCommand("mute");
    } else {
      postCommand("unMute");
    }

    if (isPlaying) {
      postCommand("playVideo");
    } else {
      postCommand("pauseVideo");
    }
  }, [isMuted, isPlaying, isReady]);

  if (!videoId) {
    return <span>Invalid YouTube URL</span>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        paddingTop: "56.25%",
        overflow: "hidden",
        borderRadius: "10px",
        backgroundColor: "#000",
      }}
    >
      <iframe
        ref={iframeRef}
        onLoad={() => setIsReady(true)}
        title="YouTube player viewport"
        src={videoSrc}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default YoutubeViewport;
