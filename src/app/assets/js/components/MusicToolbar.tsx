import React from "react";
import { ButtonGroup } from "@/lib/shadcn/ui/button-group"
import { Button } from "@/lib/shadcn/ui/button";
import { AudioLines, CircleChevronRight } from "lucide-react";

interface MusicToolbarProps {
    onTogglePanelBtn: () => void;
}

const MusicToolbar: React.FC<MusicToolbarProps> = ({
    onTogglePanelBtn,
}) => {
    return (
        <div className="border-t-[6px] text-ghost border-stage bg-space">
            <div className="flex h-full w-full">
                <div className="flex w-full">
                    <ButtonGroup className="
                    w-full
                    [&>[data-slot]:not(:has(~[data-slot]))]:rounded-none!
                    *:data-[slot=button]:h-14
                    *:data-[slot=button]:px-4
                    *:data-[slot=button]:text-base
                    [&>[data-slot=button]_svg]:size-6">
                        <Button variant="ghost" size="lg" className="rounded-none!" onClick={onTogglePanelBtn}>
                            <AudioLines />
                        </Button>
                        <Button variant="ghost" size="lg" className="rounded-none! flex-1 justify-start">
                            <CircleChevronRight /> Add a song to play
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default MusicToolbar;