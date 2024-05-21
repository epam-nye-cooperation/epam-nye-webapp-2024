import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { FC, useRef } from 'react';

export interface ConfirmationDialogProps {
  isVisible: boolean;
  message?: string;
  title: string;
  onConfirmed: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  title,
  message,
  isVisible,
  onConfirmed,
  onCancel,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose } = useDisclosure({
    isOpen: isVisible,
    onClose: onCancel,
  });

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} size="md" isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogCloseButton size="sm" />
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter gap="3">
          <Button variant="secondary" ref={cancelRef} onClick={onClose}>Mégsem</Button>
          <Button variant="primary" onClick={onConfirmed}>Ok</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
