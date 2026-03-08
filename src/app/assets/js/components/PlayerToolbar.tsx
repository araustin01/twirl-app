import React from "react";

interface PlayerToolbarProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

const PlayerToolbar: React.FC<PlayerToolbarProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: "rgba(10, 10, 10, 0.88)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <button
        onClick={onTogglePlay}
        style={{
          border: "none",
          borderRadius: "6px",
          padding: "8px 14px",
          backgroundColor: "#2f9e44",
          color: "#fff",
          cursor: "pointer",
          minWidth: "92px",
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button
        onClick={onToggleMute}
        style={{
          border: "none",
          borderRadius: "6px",
          padding: "8px 14px",
          backgroundColor: "#1c7ed6",
          color: "#fff",
          cursor: "pointer",
          minWidth: "92px",
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default PlayerToolbar;
