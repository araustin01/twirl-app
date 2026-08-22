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

interface AutoplayModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

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
