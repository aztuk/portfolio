import { type NextRequest, NextResponse } from "next/server";
import { scryptSync, timingSafeEqual } from "crypto";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : null;

  if (!password) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const stored = process.env.PORTFOLIO_PASSWORD_HASH;
  if (!stored) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const inputHash = scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hashHex, "hex");

  // Buffer lengths must match before timingSafeEqual
  if (inputHash.length !== storedHash.length) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const valid = timingSafeEqual(inputHash, storedHash);
  if (!valid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("portfolio_auth", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
