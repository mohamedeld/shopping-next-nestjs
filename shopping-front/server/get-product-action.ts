import { Constants } from "@/constants/api";
import { IProduct } from "@/interfaces/product.interface";
import { get } from "@/utils/fetch";

export const getProducts = async () => {
  const response = await get(`${Constants.API_URL}/products/all`);
  const products: IProduct[] = await response.json();

  return products;
};
