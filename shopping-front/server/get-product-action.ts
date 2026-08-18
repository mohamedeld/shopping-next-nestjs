import { Constants } from "@/constants/api";
import { get } from "@/utils/fetch";

export const getProducts = async () => {
  const response = await get(`${Constants.API_URL}/products/all`);
  return response;
};
