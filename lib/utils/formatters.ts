/**
 * Formats large numbers with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Truncates a string to a specified length with ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Formats player class name for display
 */
export function formatClassName(className: string): string {
  return className.replace('Ex.', '')
}

