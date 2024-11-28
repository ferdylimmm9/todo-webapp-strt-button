import { useQuery } from "@tanstack/react-query";
import client from "../../utils/client";
import { AxiosResponse } from "axios";
import { MeResponse } from "./auth.model";

const ENDPOINT = "/user";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await client.get(ENDPOINT);
      return response as AxiosResponse<MeResponse, Error>;
    },
    staleTime: Infinity,
  });
}
