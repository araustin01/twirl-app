import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/shadcn/ui/alert-dialog";

interface AutoplayModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const AutoplayModal: React.FC<AutoplayModalProps> = ({ onAccept, onDecline }) => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Autoplay Permission</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to autoplay videos with audio?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDecline}>No, thanks</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Allow Autoplay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AutoplayModal;
