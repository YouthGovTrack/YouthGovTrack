// Simple class name utility function
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  const result = inputs
    .filter(Boolean)
    .join(' ')
    .trim();
  return result;
}