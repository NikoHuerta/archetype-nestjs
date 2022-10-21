/**
 * Removes dots, dashes, etc. Useful for RUTs and serial numbers
 * @param string
 * @param split separates the last character from the rest,
 * useful for separating RUTs and DVs
 */
export function sanitizeIdCardComponent<T extends 'split'>(
  string: string,
  split?: T,
): T extends 'split' ? string : string[] {
  const sanitizedString = string.replace(/[\W_]/g, '').toUpperCase();

  return (
    split === 'split'
      ? [
          sanitizedString.slice(0, -1),
          sanitizedString.slice(
            sanitizedString.length - 1,
            sanitizedString.length,
          ),
        ]
      : sanitizedString
  ) as T extends 'split' ? string : string[];
}

function capitalizeNamePart(part: string): string {
  return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
}

/**
 * Capitalizes all words in a name
 */
export function capitalizeName(word?: string): string {
  if (!word || !word.length) {
    return '';
  }

  let formatted = word.toLowerCase();
  formatted = formatted.trim();
  formatted = formatted.replace(/\s+/g, ' ');
  const parts = formatted.split(' ');

  formatted = parts.map(capitalizeNamePart).join(' ');

  return formatted;
}
