import { useMutation } from "@tanstack/react-query";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./task.model";
import client from "../../utils/client";
import { AxiosResponse } from "axios";

const ENDPOINT = "/task";

export function useCreateTask() {
  return useMutation({
    mutationFn: async (task: CreateTaskRequest) => {
      const response = await client.post(ENDPOINT, task);
      return response as AxiosResponse<CreateTaskResponse, Error>;
    },
  });
}

export function useUpdateTask(id: number) {
  return useMutation({
    mutationFn: async (task: UpdateTaskRequest) => {
      const response = await client.patch(ENDPOINT + "/" + id, task);
      return response as AxiosResponse<UpdateTaskResponse, Error>;
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await client.delete(ENDPOINT + "/" + id);
      return response as AxiosResponse<DeleteTaskResponse, Error>;
    },
  });
}
