import React from 'react';
import { ButtonGroup } from '@/lib/shadcn/ui/button-group';
import { Button } from '@/lib/shadcn/ui/button';
import { AudioLines } from 'lucide-react';

/**
 * Props for the BottomBar component.
 */
interface BottomBarProps {
  /**
   * Callback function to handle the toggle action for the panel button.
   */
  onTogglePanelBtn: () => void;
}

/**
 * The BottomBar component serves as a control bar at the bottom of the application interface.
 * It provides users with quick access to audio controls and the ability to add songs to play.
 */
const BottomBar: React.FC<BottomBarProps> = ({ onTogglePanelBtn }) => {
  return (
    <div className="border-t-[6px] text-ghost border-stage bg-space">
      <div className="flex h-full w-full">
        <div className="flex w-full">
          <ButtonGroup
            className="
                    w-full
                    [&>[data-slot]:not(:has(~[data-slot]))]:rounded-none!
                    *:data-[slot=button]:h-14
                    *:data-[slot=button]:px-4
                    *:data-[slot=button]:text-base
                    [&>[data-slot=button]_svg]:size-6"
          >
            <Button
              variant="ghost"
              size="lg"
              className="rounded-none!"
              onClick={onTogglePanelBtn}
            >
              <AudioLines />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
