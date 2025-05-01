"use server";

import { cookies } from "next/headers";

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
}
