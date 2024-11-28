import React from "react";
import { useNavigate } from "react-router-dom";
import AuthSession from "../../repositories/auth-session";
import { RouterEnum } from "../../router/constant";
import queryClient from "../../utils/client/query-client";
import { ActionIcon } from "@mantine/core";
import { SignOut } from "@phosphor-icons/react";
import WarningDialog, {
  WarningDialogRef,
} from "../../components/warning-dialog";
import { notifications } from "@mantine/notifications";

export default function ProfileLogout() {
  const warningRef = React.useRef<WarningDialogRef>(null);
  const navigate = useNavigate();
  const logout = () => {
    AuthSession.remove();
    navigate(RouterEnum.signin);
    queryClient.invalidateQueries();
    warningRef.current?.setIsOpen(false);
    notifications.show({
      title: "Logout",
      message: "You have been logged out",
      color: "blue",
    })
  };

  return (
    <>
      <ActionIcon
        size={36}
        variant="subtle"
        color="red"
        onClick={() => {
          warningRef.current?.setIsOpen(true);
        }}
      >
        <SignOut size={24} />
      </ActionIcon>
      <WarningDialog
        ref={warningRef}
        title="Logout"
        message="Are you sure for logout ?"
        onConfirm={logout}
        confirmText="Logout"
      />
    </>
  );
}
