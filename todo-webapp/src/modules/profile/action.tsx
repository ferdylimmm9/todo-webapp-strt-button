import React from "react";
import ProfileModal, { ProfileModalRef } from "./modal";
import { ActionIcon } from "@mantine/core";
import { User } from "@phosphor-icons/react";
import { useGetMe } from "../../api-hooks/auth/auth.query";

export default function ProfileAction() {
  const modalRef = React.useRef<ProfileModalRef>(null);
  const { isFetching } = useGetMe();
  return (
    <>
      <ActionIcon
        variant="subtle"
        size={36}
        loading={isFetching}
        onClick={() => {
          modalRef.current?.setIsOpen(true);
        }}
      >
        <User size={24} />
      </ActionIcon>
      <ProfileModal ref={modalRef} />
    </>
  );
}
