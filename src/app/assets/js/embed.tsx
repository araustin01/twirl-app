import React from "react";

interface YoutubeEmbedProps {
  target: string;
  autoplayEnabled?: boolean;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ target, autoplayEnabled = false }) => {
  const getYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(target);

  if (!videoId) return <span>Invalid YouTube URL</span>;

  const videoSrc = autoplayEnabled
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-embed">
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
