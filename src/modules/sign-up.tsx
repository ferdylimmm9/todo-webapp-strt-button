import React from "react";
import { SignUpRequest } from "../api-hooks/auth/auth.model";
import { useSignUp } from "../api-hooks/auth/auth.mutation";
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
import { RouterEnum } from "../router/constant";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [request, setRequest] = React.useState<SignUpRequest>({
    password: "",
    username: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();

  const SignUpMutate = useSignUp();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await SignUpMutate.mutateAsync(request);
      AuthSession.set(result.data);
      notifications.show({
        title: "Sign In Success",
        message: "You have successfully signed in",
        color: "green",
      });
      navigate(RouterEnum.signin);
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
              Todo App - Sign Up
            </Text>{" "}
            <TextInput
              label="Name"
              placeholder="Name"
              value={request.name}
              onChange={(e) => {
                setRequest({ ...request, name: e.target.value });
              }}
              required
            />
            <TextInput
              type="email"
              label="Email"
              placeholder="Email"
              value={request.email}
              onChange={(e) => {
                setRequest({ ...request, email: e.target.value });
              }}
              required
            />
            <TextInput
              label="Username"
              placeholder="Username"
              value={request.username}
              onChange={(e) => {
                setRequest({ ...request, username: e.target.value });
              }}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={request.password}
              onChange={(e) => {
                setRequest({ ...request, password: e.target.value });
              }}
              required
            />
            <Button type="submit" loading={SignUpMutate.isPending}>
              Sign Up
            </Button>
            <Button
              variant="subtle"
              onClick={() => navigate(RouterEnum.signin)}
            >
              Sign In
            </Button>
          </Flex>
        </Card>
      </div>
    </form>
  );
}
