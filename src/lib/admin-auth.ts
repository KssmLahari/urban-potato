import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { COMPANY } from "@/lib/company";

const COOKIE_NAME = "nulien_admin_session";
const SESSION_VALUE = "authenticated";

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function createAdminSessionCookie(): Promise<void> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");

  const signature = sign(SESSION_VALUE, secret);
  const jar = await cookies();
  jar.set(COOKIE_NAME, `${SESSION_VALUE}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const dot = raw.indexOf(".");
  if (dot === -1) return false;

  const payload = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  if (payload !== SESSION_VALUE) return false;

  const expected = sign(SESSION_VALUE, secret);
  try {
    return timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8"),
    );
  } catch {
    return false;
  }
}

function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
  } catch {
    return false;
  }
}

const DEFAULT_ALLOWED_ADMIN_EMAILS = [
  COMPANY.infoEmail,
  "laharikarrotu24@gmail.com",
] as const;

/** Comma-separated in ADMIN_ALLOWED_EMAILS, e.g. info@...,you@gmail.com */
export function getAllowedAdminEmails(): string[] {
  const fromEnv = process.env.ADMIN_ALLOWED_EMAILS;
  if (fromEnv?.trim()) {
    return fromEnv
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
  }
  return DEFAULT_ALLOWED_ADMIN_EMAILS.map((email) => email.toLowerCase());
}

export function verifyAdminEmail(input: string): boolean {
  const normalized = input.trim().toLowerCase();
  return getAllowedAdminEmails().some((allowed) =>
    timingSafeStringEqual(normalized, allowed),
  );
}

export function verifyAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeStringEqual(input, expected);
}
