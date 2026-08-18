"use server";

import { Constants } from "@/constants/api";
import { LoginSchema } from "@/schema/auth-schema";
import { post } from "@/utils/fetch";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const loginUserAction = async (userData: LoginSchema) => {
  const response = await post(`${Constants.API_URL}/auth/login`, userData);

  await setAuthCookie(response?.data);

  return response?.data.json();
};

const setAuthCookie = async (res: Response) => {
  const setCookieHeader = res.headers.get("set-cookie");

  if (!setCookieHeader) {
    return;
  }

  const token = setCookieHeader.split(";").at(0)?.split("=").slice(1).join("=");

  if (!token) {
    return;
  }

  const decoded = jwtDecode<{ exp?: number }>(token);

  if (!decoded.exp) {
    throw new Error("Invalid token expiration");
  }

  (await cookies()).set({
    name: "Authentication",
    value: token,
    secure: true,
    httpOnly: true,
    expires: new Date(decoded.exp * 1000),
  });
};
