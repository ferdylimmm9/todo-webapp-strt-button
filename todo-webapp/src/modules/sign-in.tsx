import React from "react";
import { SignInRequest } from "../api-hooks/auth/auth.model";
import { useSignIn } from "../api-hooks/auth/auth.mutation";
import AuthSession from "../repositories/auth-session";
import { notifications } from "@mantine/notifications";
import {
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RouterEnum } from "../router/constant";

export default function SignIn() {
  const [request, setRequest] = React.useState<SignInRequest>({
    username_or_email: "",
    password: "",
  });
  const signInMutate = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signInMutate.mutateAsync(request);
      AuthSession.set(result.data);
      notifications.show({
        title: "Sign In Success",
        message: "You have successfully signed in",
        color: "green",
      });
      navigate(RouterEnum.tasks);
    } catch (e: any) {
      console.error(e);
      notifications.show({
        title: "Sign In Failed",
        message: e.message,
        color: "red",
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          minHeight: "100dvh",
          minWidth: "100dvw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Card withBorder m="auto" miw={320} p={16}>
          <Flex direction="column" gap={16}>
            <Text fw={600} fz={24} ta="center">
              Todo App - Sign In
            </Text>
            <TextInput
              label="Username or Email"
              placeholder="Username or Email"
              value={request.username_or_email}
              onChange={(e) => {
                setRequest({ ...request, username_or_email: e.target.value });
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={request.password}
              onChange={(e) => {
                setRequest({ ...request, password: e.target.value });
              }}
            />
            <Button type="submit" loading={signInMutate.isPending}>
              Sign In
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate(RouterEnum.signup)}
            >
              Sign Up
            </Button>
          </Flex>
        </Card>
      </div>
    </form>
  );
}
