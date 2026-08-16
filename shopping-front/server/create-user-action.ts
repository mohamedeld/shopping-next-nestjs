import { Constants } from "@/constants/api";
import { LoginSchema } from "@/schema/auth-schema";

export const createUserAction = async (userData: LoginSchema) => {
  console.log("API_URL:", Constants.API_URL); // Log the API URL to verify it's being read correctly
  const response = await fetch(`${Constants.API_URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  console.log("response", response);
  return response.json();
};
