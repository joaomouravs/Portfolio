/** Junta classes condicionais sem trazer uma dependência para o bundle. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
