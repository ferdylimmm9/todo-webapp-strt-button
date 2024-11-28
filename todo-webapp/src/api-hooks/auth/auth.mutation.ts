import { useMutation } from "@tanstack/react-query";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UpdateMeRequest,
  UpdateMeResponse,
} from "./auth.model";
import { AxiosResponse } from "axios";
import client from "../../utils/client";

const ENDPOINT = "/auth";

export function useSignIn() {
  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await client.post(ENDPOINT + "/signin", data);
      return response as AxiosResponse<SignInResponse, Error>;
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await client.post(ENDPOINT + "/signup", data);
      return response as AxiosResponse<SignInResponse, Error>;
    },
  });
}

export function useUpdateMe() {
  return useMutation({
    mutationFn: async (data: UpdateMeRequest) => {
      const response = await client.patch("/user", data);
      return response as AxiosResponse<UpdateMeResponse, Error>;
    },
  });
}
