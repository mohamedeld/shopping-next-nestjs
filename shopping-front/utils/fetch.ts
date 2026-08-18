"use server";

import { cookies } from "next/headers";

const getHeaders = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  return {
    ...(cookie && { Cookie: cookie }),
    "Content-Type": "application/json",
  };
};
export const post = async <TBody>(
  path: string,
  body: TBody,
): Promise<Response> => {
  const response = await fetch(path, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response;
};

export const get = async (path: string): Promise<Response> => {
  const response = await fetch(path, {
    method: "GET",
    headers: await getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response;
};
