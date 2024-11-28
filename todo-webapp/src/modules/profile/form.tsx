import React from "react";
import { UpdateMeRequest } from "../../api-hooks/auth/auth.model";
import { useUpdateMe } from "../../api-hooks/auth/auth.mutation";
import { Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FloppyDisk, Lock, Mailbox, Pen, X } from "@phosphor-icons/react";
import { useGetMe } from "../../api-hooks/auth/auth.query";
import queryClient from "../../utils/client/query-client";

export interface ProfileFormProps {
  onClose: () => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { data } = useGetMe();
  const meData = data?.data;
  const [request, setRequest] = React.useState<UpdateMeRequest>({
    email: meData?.email || "",
    name: meData?.name || "",
    old_password: "",
    new_password: "",
  });

  const { mutateAsync, isPending } = useUpdateMe();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // call api
    if (request.old_password !== request.new_password) {
      // call api with old_password and new_password
      console.error("passwords do not match");
      notifications.show({
        title: "Profile Update Failed",
        message: "Passwords do not match",
        color: "red",
      });
    }

    try {
      const result = await mutateAsync(request);
      props.onClose();
      notifications.show({
        title: "Profile Updated",
        message: "Your profile has been updated",
        color: "green",
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      return result;
    } catch (e: any) {
      console.error(e);
      notifications.show({
        title: "Profile Update Failed",
        message: e.message,
        color: "red",
      });
    }
  };
  const [formStateDisabled, setFormStateDisabled] = React.useState(true);

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap={16}>
        <TextInput
          placeholder="Name"
          label="Name"
          value={request.name}
          required
          onChange={(e) => {
            const value = e.target.value;

            setRequest({
              ...request,
              name: value,
            });
          }}
          disabled={formStateDisabled}
        />
        <TextInput
          leftSection={<Mailbox />}
          type="email"
          placeholder="Email"
          label="Email"
          value={request.email}
          required
          onChange={(e) => {
            const value = e.target.value;

            setRequest({
              ...request,
              email: value,
            });
          }}
          disabled={formStateDisabled}
        />
        {formStateDisabled === false && (
          <>
            <PasswordInput
              leftSection={<Lock />}
              label="Old Password"
              placeholder="Old Password"
              value={request.old_password}
              required
              onChange={(e) => {
                const value = e.target.value;

                setRequest({
                  ...request,
                  old_password: value,
                });
              }}
              disabled={formStateDisabled}
            />

            <PasswordInput
              leftSection={<Lock />}
              label="New Password"
              placeholder="New Password"
              required
              value={request.new_password}
              onChange={(e) => {
                const value = e.target.value;

                setRequest({
                  ...request,
                  new_password: value,
                });
              }}
              disabled={formStateDisabled}
            />
          </>
        )}
        <Flex direction="row" gap={16}>
          {formStateDisabled === true ? (
            <Button
              leftSection={<Pen />}
              fullWidth
              onClick={() => {
                setFormStateDisabled(false);
              }}
            >
              Update Profile
            </Button>
          ) : (
            <>
              <Button
                type="button"
                color="red"
                flex={1}
                onClick={() => {
                  setFormStateDisabled(true);
                }}
                disabled={isPending}
                leftSection={<X />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftSection={<FloppyDisk />}
                flex={1}
                loading={isPending}
              >
                Update
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </form>
  );
}
