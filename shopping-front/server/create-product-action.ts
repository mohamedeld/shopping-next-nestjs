import { Constants } from "@/constants/api";
import { CreateProductSchema } from "@/schema/create-product-schema";
import { post } from "@/utils/fetch";

export const createProductAction = async (data: CreateProductSchema) => {
  console.log("data", data);
  const response = await post(`${Constants.API_URL}/products/create`, data);
  return response;
};
