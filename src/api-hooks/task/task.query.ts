import { AxiosResponse } from "axios";
import client from "../../utils/client";
import {
  GetTaskResponse,
  GetTasksRequest,
  GetTasksResponse,
} from "./task.model";
import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/task";
export function useGetTasks(params?: GetTasksRequest) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const response = await client.get(ENDPOINT, {
        params,
      });
      return response as AxiosResponse<GetTasksResponse, Error>;
    },
  });
}

export function useGetTask(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await client.get(ENDPOINT + "/" + id);
      return response as AxiosResponse<GetTaskResponse, Error>;
    },
  });
}
