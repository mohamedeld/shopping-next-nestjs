import { Constants } from "@/constants/api";
import { LoginSchema } from "@/schema/auth-schema";
import { post } from "@/utils/fetch";

export const createUserAction = async (userData: LoginSchema) => {
  const response = await post(`${Constants.API_URL}/users/create`, userData);
  return response;
};
