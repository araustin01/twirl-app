import React, { useState } from "react";
import { ButtonGroup } from "@/lib/shadcn/ui/button-group"
import { Button } from "@/lib/shadcn/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/lib/shadcn/ui/slider";

interface PlayerToolbarProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

const PlayerToolbar: React.FC<PlayerToolbarProps> = ({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        padding: "18px",
        backgroundColor: "rgb(60, 60, 60)",
        borderTop: "1px solid rgb(213, 213, 213)",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "4px"
      }}>
        <ButtonGroup>
          <Button
            onClick={onTogglePlay}
            size="icon"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={onToggleMute}
            size="icon"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
        </ButtonGroup>
        <div
          className="relative w-30"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {showTooltip && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap">
              Volume: {volume}%
            </div>
          )}
          <Slider
            min={0}
            max={100}
            value={volume}
            step={5}
            onValueChange={(value: number) => {
              onVolumeChange(value);
            }}
            className="
                [&_[data-slot=slider-track]]:h-1 
                [&_[data-slot=slider-track]]:bg-gray-400 
                [&_[data-slot=slider-range]]:bg-white 
                [&_[data-slot=slider-thumb]]:border-white 
                [&_[data-slot=slider-thumb]]:h-3 
                [&_[data-slot=slider-thumb]]:w-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerToolbar;