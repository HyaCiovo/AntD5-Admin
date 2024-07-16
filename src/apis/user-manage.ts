import request from "@/utils/request";

interface RoleInfoResponse {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: Array<any>;
}

export type ApiResponse<T> = Promise<T>;
export const getRoleInfo = <T = RoleInfoResponse>(params: any): ApiResponse<T> => {
  return request.get("https://randomuser.me/api", {
    params: { results: 55, ...params },
  });
};
