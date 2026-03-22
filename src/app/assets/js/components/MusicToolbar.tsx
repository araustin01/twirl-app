import React from "react";
import { ButtonGroup } from "@/lib/shadcn/ui/button-group"
import { Button } from "@/lib/shadcn/ui/button";
import { AudioLines, CircleChevronRight } from "lucide-react";

interface MusicToolbarProps {
    isPlaying: boolean;
    volume: number;
    onTogglePlay: () => void;
    onToggleMute: () => void;
    onVolumeChange: (volume: number) => void;
    title?: string;
    duration?: number; // seconds
    currentTime?: number; // seconds
}

const MusicToolbar: React.FC<MusicToolbarProps> = ({
    isPlaying,
    volume,
    onTogglePlay,
    onToggleMute,
    onVolumeChange,
    title,
    duration,
    currentTime,
}) => {
    return (
        <div className="border-t-[6px] text-[#F0E8FF] border-[#2D2460] bg-[#0D0B1A]">
            <div className="flex h-full w-full">
                <div className="flex w-full">
                    <ButtonGroup className="
                    w-full
                    [&>[data-slot]:not(:has(~[data-slot]))]:rounded-none!
                    *:data-[slot=button]:h-14
                    *:data-[slot=button]:px-4
                    *:data-[slot=button]:text-base
                    [&>[data-slot=button]_svg]:size-6">
                        <Button variant="ghost" size="lg" className="rounded-none! hover:bg-[#9B7FFF]">
                            <AudioLines />
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-none! flex-1 justify-start hover:bg-[#9B7FFF]">
                            <CircleChevronRight /> Add a song to play
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default MusicToolbar;