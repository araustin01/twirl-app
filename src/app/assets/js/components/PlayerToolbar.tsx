import React from "react";
import { ButtonGroup } from "@/lib/shadcn/ui/button-group"
import { Button } from "@/lib/shadcn/ui/button";
import {Play, Pause, Volume2, VolumeX } from "lucide-react";

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
        display: "flex",
        justifyContent: "center",
        padding: "6px",
        backgroundColor: "rgb(177, 177, 177)",
        borderTop: "1px solid rgb(213, 213, 213)",
      }}
    >
      <ButtonGroup>
        <Button  onClick={onTogglePlay} size="icon">
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button onClick={onToggleMute} size="icon">
          {isMuted ? <VolumeX /> : <Volume2 />}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PlayerToolbar;