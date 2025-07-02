"use server";

import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { sessionCookieKey } from "@/constants/session";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete(sessionCookieKey);

  return NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_FE_URL),
  );
}
