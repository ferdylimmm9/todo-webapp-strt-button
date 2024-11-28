import React from "react";
import { Modal, Text } from "@mantine/core";
import ProfileForm from "./form";

export interface ProfileModalRef {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileModalProps {}

const ProfileModal = React.forwardRef<ProfileModalRef, ProfileModalProps>(
  (_, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    React.useImperativeHandle(ref, () => {
      return {
        isOpen,
        setIsOpen,
      };
    });

    return (
      <Modal
        closeOnClickOutside={false}
        centered
        opened={isOpen}
        onClose={onClose}
        title={<Text fw={600}>Update Profile</Text>}
      >
        {isOpen && <ProfileForm onClose={onClose} />}
      </Modal>
    );
  },
);

export default ProfileModal;
