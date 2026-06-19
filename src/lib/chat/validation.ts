const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

export function parseEmail(value: unknown): string | null {
  const text = sanitizeText(value, 254);
  if (!text || !EMAIL_RE.test(text)) return null;
  return text.toLowerCase();
}

export function parseUuid(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const id = value.trim();
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    )
  ) {
    return null;
  }
  return id;
}
