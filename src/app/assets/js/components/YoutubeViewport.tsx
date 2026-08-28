import React, { useEffect, useRef } from 'react';
import { HTMLAttributes } from 'react';
/**
 * Props for the YoutubeViewport component.
 */
interface YoutubeViewportProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The YouTube video ID to be played in the viewport.
   */
  id: string;
  /**
   * Indicates whether autoplay is enabled for the video.
   * @default false
   */
  autoplayEnabled?: boolean;
  /**
   * Indicates whether the video is currently playing.
   */
  isPlaying: boolean;
  /**
   * Represents the current volume level, ranging from 0 to 100.
   * @default 0
   */
  volume: number;
  /**
   * Callback function to handle changes in the playing state of the video.
   * @param isPlaying Indicates whether the video is currently playing.
   */
  onPlayingChange?: (isPlaying: boolean) => void;
  /**
   * Callback function to handle updates to the video's metadata.
   * @param meta An object containing the video's title, duration, and current playback time.
   */
  onMetadataUpdate?: (meta: {
    title: string;
    duration: number;
    currentTime: number;
  }) => void;
}

// Singleton promise to ensure the YouTube IFrame API is loaded only once
let youTubeAPIReadyPromise: Promise<typeof window.YT> | null = null;

// Load the YouTube IFrame API script once globally
function loadYouTubeAPI(): Promise<typeof window.YT> {
  // If the API is already available, resolve immediately.
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  // Reuse the same promise for concurrent callers while the API is loading.
  if (youTubeAPIReadyPromise) {
    return youTubeAPIReadyPromise;
  }

  youTubeAPIReadyPromise = new Promise((resolve) => {
    // Avoid injecting multiple script tags.
    let script = document.getElementById(
      'youtube-iframe-api'
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        previousCallback();
      }
      resolve(window.YT);
    };
  });

  return youTubeAPIReadyPromise;
}

function updateMetadata(
  player: YT.Player,
  onMetadataUpdate?: (meta: {
    title: string;
    duration: number;
    currentTime: number;
  }) => void
) {
  if (!onMetadataUpdate) return;
  const title = player.getVideoData().title || '';
  const duration = player.getDuration() || 0;
  const currentTime = player.getCurrentTime() || 0;
  onMetadataUpdate({ title, duration, currentTime });
}

const YoutubeViewport: React.FC<YoutubeViewportProps> = ({
  id,
  autoplayEnabled = false,
  isPlaying,
  volume,
  onPlayingChange,
  onMetadataUpdate,
  ...rest
}) => {
  // YT.Player mounts into this div — not directly into an iframe ref
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  // Keep latest props accessible inside YT callbacks without re-creating the player
  const isPlayingRef = useRef(isPlaying);
  const volumeRef = useRef(volume);
  const onPlayingChangeRef = useRef(onPlayingChange);
  const onMetadataUpdateRef = useRef(onMetadataUpdate);

  useEffect(() => {
    if (playerRef.current && autoplayEnabled) playerRef.current.playVideo();
  }, [autoplayEnabled]);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);
  useEffect(() => {
    onMetadataUpdateRef.current = onMetadataUpdate;
  }, [onMetadataUpdate]);

  const videoId = id;

  // Boot or re-create the player when videoId changes
  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let player: YT.Player;
    let cancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (cancelled) return;

      // Destroy previous player instance if videoId changed
      playerRef.current?.destroy();

      player = new YT.Player(containerRef.current!, {
        videoId,
        playerVars: {
          autoplay: autoplayEnabled ? 1 : 0,
          modestbranding: 1,
          controls: 0,
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
            e.target.setVolume(volumeRef.current);

            if (autoplayEnabled) {
              e.target.playVideo();
            } else {
              e.target.pauseVideo();
            }

            if (onMetadataUpdateRef.current) {
              updateMetadata(e.target, onMetadataUpdateRef.current);
            }
          },
          onStateChange: (e) => {
            const state = e.target.getPlayerState();
            if (state === YT.PlayerState.PLAYING)
              onPlayingChangeRef.current?.(true);
            if (
              state === YT.PlayerState.PAUSED ||
              state === YT.PlayerState.ENDED
            ) {
              onPlayingChangeRef.current?.(false);
            }
            updateMetadata(e.target, onMetadataUpdateRef.current);
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;
      player?.destroy();
      playerRef.current = null;
    };
  }, [videoId]); // only re-create when video changes, not on every prop change

  // Sync play/pause and adjust volume without re-creating the player
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;

    if (isPlaying) {
      p.playVideo();
    } else {
      p.pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    p.setVolume(volumeRef.current);
  }, [volume]);

  if (!videoId) return <span>Invalid YouTube URL</span>;

  return (
    <div {...rest}>
      {/* YT.Player replaces this div with an iframe internally */}
      <div ref={containerRef} className="youtube-viewport-iframe" />
    </div>
  );
};

export default YoutubeViewport;
