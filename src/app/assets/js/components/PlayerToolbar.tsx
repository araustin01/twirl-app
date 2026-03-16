import React from "react";
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
        <Slider
          min={0}
          max={100}
          step={5}
          onValueChange={(values: number[]) => {
            onVolumeChange(values[0]);
          }}
          className="
          max-w-30 
          [&_[data-slot=slider-track]]:h-1 
          [&_[data-slot=slider-track]]:bg-gray-400 
          [&_[data-slot=slider-range]]:bg-white 
          [&_[data-slot=slider-thumb]]:border-white 
          [&_[data-slot=slider-thumb]]:h-3 
          [&_[data-slot=slider-thumb]]:w-3"
        />
      </div>
    </div>
  );
};

export default PlayerToolbar;