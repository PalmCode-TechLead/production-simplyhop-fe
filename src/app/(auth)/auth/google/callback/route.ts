import { GetAuthSocialCallbackSuccessResponseInterface } from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialCallback } from "@/core/services/rest/simplyhop/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    const response = await fetchGetAuthSocialCallback({
      params: {
        code: code ?? "",
      },
      path: {
        provider: "google",
      },
    });
    if (!response) return;
    const data = response as GetAuthSocialCallbackSuccessResponseInterface;
    response.cookies.set({
      name: "token",
      value: data.data.token,
      path: "/",
      httpOnly: false,
      //   sameSite: "lax",
      //   secure: process.env.NODE_ENV === "production",
      //   maxAge: 60 * 60 * 24, // 1 day
    });
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL));
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
