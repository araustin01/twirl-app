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
      <ButtonGroup>
        <Button
          className="bg-space py-5 rounded-sm"
          onClick={onTogglePanelBtn}
        >
          <AudioLines className="size-7" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default BottomBar;
