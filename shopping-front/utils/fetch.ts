"use server";

import { cookies } from "next/headers";

const getHeaders = async () => {
  const cookie = (await cookies()).toString();

  return {
    "Content-Type": "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };
};

export const post = async <TBody>(path: string, body: TBody) => {
  const response = await fetch(path, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`,
    );
  }

  return {
    success: true,
    data,
  };
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
