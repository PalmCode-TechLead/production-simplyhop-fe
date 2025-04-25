import {
  GetAuthSocialCallbackPayloadRequestInterface,
  GetAuthSocialCallbackSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialCallback } from "@/core/services/rest/simplyhop/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const payload: GetAuthSocialCallbackPayloadRequestInterface = {
      path: {
        provider: "google",
      },
      params: {
        code: encodeURIComponent(code),
      },
    };
    const response = await fetchGetAuthSocialCallback(payload);
    const data = response as GetAuthSocialCallbackSuccessResponseInterface;

    return NextResponse.json(
      {
        message: "success",
        token: data.data.token,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
