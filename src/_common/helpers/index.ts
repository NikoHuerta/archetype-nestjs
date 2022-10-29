export * from './encripter';

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
