/** Insert shared numeric values into localized text without duplicating prices or limits. */
export function resolveContent<T extends Record<string, string>>(
  content: T,
  numbers: Partial<Record<keyof T, readonly string[]>>,
): T {
  return Object.fromEntries(
    Object.entries(content).map(([key, text]) => [
      key,
      text.replace(/\{(\d+)\}/g, (placeholder, index: string) =>
        numbers[key as keyof T]?.[Number(index)] ?? placeholder,
      ),
    ]),
  ) as T
}

/** Read numeric tokens from existing shared prices, hours and plan limits. */
export function numericParts(text: string): string[] {
  return text.match(/(?<![A-Za-z0-9])\d+(?:,\d{3})*(?:\.\d+)?/g) ?? []
}
