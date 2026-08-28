import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/shadcn/ui/alert-dialog';


/**
 * Props for the AutoplayModal component.
 */
interface AutoplayModalProps {
  /**
   * Callback function to handle the acceptance of autoplay permission.
   */
  onAccept: () => void;
  /**
   * Callback function to handle the decline of autoplay permission.
   */
  onDecline: () => void;
}

/**
 * Serves the purpose of asking the user for permission to autoplay videos with audio. 
 * This action circumvents browser restrictions on autoplaying media with sound.
 * 
 * @deprecated This component may not be necessary with later implementations.
 */
const AutoplayModal: React.FC<AutoplayModalProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <AlertDialog open>
      <AlertDialogContent className="bg-violet">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-foreground">
            Autoplay Permission
          </AlertDialogTitle>
          <AlertDialogDescription className="text-secondary-foreground">
            Would you like to autoplay videos with audio?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground"
            onClick={onDecline}
          >
            No, thanks
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={onAccept}
          >
            Allow Autoplay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AutoplayModal;
