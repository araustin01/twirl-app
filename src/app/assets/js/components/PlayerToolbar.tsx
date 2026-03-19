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
  title?: string;
  duration?: number; // seconds
  currentTime?: number; // seconds
}

const PlayerToolbar: React.FC<PlayerToolbarProps> = ({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  title,
  duration,
  currentTime,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Local timer state for progress
  const [localTime, setLocalTime] = useState<number>(currentTime || 0);

  // Sync localTime with prop when video changes or prop changes
  React.useEffect(() => {
    setLocalTime(currentTime || 0);
  }, [currentTime, duration]);

  React.useEffect(() => {
    if (!isPlaying || !duration) return;
    if (localTime >= duration) return;
    const interval = setInterval(() => {
      setLocalTime((prev) => {
        if (!isPlaying) return prev;
        if (prev >= duration) return prev;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration, localTime]);

  // Calculate progress and time left
  const progress = duration ? Math.min(localTime / duration, 1) : 0;
  const timeLeft = duration ? Math.max(duration - localTime, 0) : 0;
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border-t-[6px] border-[#2D2460] bg-[#0D0B1A] px-4 py-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 sm:flex-row">
        {/* Track info section */}
        <div className="flex w-full max-w-[320px] min-w-0 flex-col items-start justify-center">
          {title && (
            <div className="mb-1 w-full max-w-[320px] truncate text-left text-base font-semibold text-[#F0E8FF]">
              {title}
            </div>
          )}
          {duration && currentTime !== undefined && (
            <div className="flex w-full max-w-[320px] items-center gap-2">
              {/* Progress slider (non-interactive) */}
              <div className="relative flex-1">
                <div className="h-1.5 overflow-hidden rounded bg-[#222]">
                  <div
                    style={{
                      width: `${progress * 100}%`,
                      height: "100%",
                      background: "#39FF9C",
                      transition: "width 0.2s",
                    }}
                  />
                </div>
              </div>
              {/* Time left */}
              <div className="min-w-12 text-right text-sm text-[#F0E8FF]">
                -{formatTime(timeLeft)}
              </div>
            </div>
          )}
        </div>
        {/* Button group and volume slider */}
        <div className="flex items-center gap-2">
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
    </div>
  );
};

export default PlayerToolbar;