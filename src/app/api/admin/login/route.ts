import { NextResponse } from "next/server";
import {
  createAdminSessionCookie,
  verifyAdminEmail,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const email =
    typeof record.email === "string" ? record.email : "";
  const password =
    typeof record.password === "string" ? record.password : "";

  if (!verifyAdminEmail(email) || !verifyAdminPassword(password)) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  await createAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
