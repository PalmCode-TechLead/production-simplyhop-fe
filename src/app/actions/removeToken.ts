"use server";

import { cookies } from "next/headers";

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: false,
  });
}
