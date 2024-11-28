export function formatDateString(date: string) {
  return new Date(date).toLocaleDateString("en-US");
}
