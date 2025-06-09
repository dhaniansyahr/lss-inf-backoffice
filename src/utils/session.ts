"use server";

import { sessionCookieKey } from "@/constants/session";
import { TLoginResponse, TVerifyResponse } from "@/services/auth/types";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(sessionCookieKey)?.value;

  if (!session) return null;

  return JSON.parse(session);
}

export async function setSession(value: TLoginResponse) {
  const token = value.token;

  const session = {
    accessToken: token,
    user: value.user,
  } as unknown as TVerifyResponse;

  const cookieStore = await cookies();

  cookieStore.set(sessionCookieKey, JSON.stringify(session), {
    httpOnly: true,
  });

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  if (cookieStore.get(sessionCookieKey)) {
    cookieStore.delete(sessionCookieKey);
  }
}
