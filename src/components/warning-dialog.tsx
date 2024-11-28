import { Button, Flex, Modal, Text } from "@mantine/core";
import React from "react";

interface WarningDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  confirmLoading?: boolean;
}

export interface WarningDialogRef {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarningDialog = React.forwardRef<WarningDialogRef, WarningDialogProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    React.useImperativeHandle(ref, () => {
      return {
        isOpen,
        setIsOpen,
      };
    });
    return (
      <Modal
        centered
        onClose={() => setIsOpen(false)}
        opened={isOpen}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <Flex direction="column" gap="md" pos="relative">
          <Text ta="center" fw={600} fz={16}>
            {props.title}
          </Text>
          <Text ta="center" fz={16}>
            {props.message}
          </Text>
          <Flex direction="row" gap={16}>
            <Button flex={1} variant="subtle" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              flex={1}
              color="red"
              onClick={props.onConfirm}
              loading={props.confirmLoading}
            >
              {props.confirmText ?? "Confirm"}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    );
  },
);

export default WarningDialog;
