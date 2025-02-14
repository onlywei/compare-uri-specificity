/**
 * Represents the possible return values from URI specificity comparison
 * 1: first URI is more specific
 * -1: second URI is more specific
 * 0: equal specificity
 */
export type ComparisonResult = 1 | -1 | 0;

/**
 * Represents the possible specificity scores for URI segments
 * 0: wildcard (*)
 * 1: static segment
 */
export type SpecificityScore = 0 | 1;

/**
 * Compares two URIs to determine which one is more specific
 * @param uri1 - First URI to compare
 * @param uri2 - Second URI to compare
 * @returns 1 if uri1 is more specific, -1 if uri2 is more specific, 0 if equal
 * @throws {Error} If either URI is invalid or malformed
 */
export function compareUriSpecificity(uri1: string, uri2: string): ComparisonResult {
  // Clean and validate URIs
  const cleanUri1 = cleanUri(uri1);
  const cleanUri2 = cleanUri(uri2);

  // Split paths into segments
  const segments1 = cleanUri1.split('/').filter(Boolean);
  const segments2 = cleanUri2.split('/').filter(Boolean);

  // Compare segment length first
  if (segments1.length !== segments2.length) {
    return segments1.length > segments2.length ? 1 : -1;
  }

  // If same length, compare segment by segment for wildcards or parameters
  for (let i = 0; i < segments1.length; i++) {
    const score1 = getSegmentSpecificityScore(segments1[i]);
    const score2 = getSegmentSpecificityScore(segments2[i]);

    if (score1 !== score2) {
      return score1 > score2 ? 1 : -1;
    }
  }

  return 0;
}

/**
 * Cleans and validates a URI string
 * @param uri - URI to clean and validate
 * @returns Cleaned URI string
 * @throws {Error} If URI is invalid or malformed
 * @private
 */
function cleanUri(uri: string): string {
  if (typeof uri !== 'string') {
    throw new Error('URI must be a string');
  }

  // Remove leading/trailing whitespace and slashes
  let cleaned = uri.trim();
  cleaned = cleaned.replace(/^\/+|\/+$/g, '');

  // Validate URI format (basic check)
  if (cleaned.includes('//')) {
    throw new Error('Invalid URI format: contains consecutive slashes');
  }

  return cleaned;
}

/**
 * Calculates specificity score for a URI segment
 * @param segment - URI segment to score
 * @returns Specificity score for the segment
 * @private
 */
function getSegmentSpecificityScore(segment: string): SpecificityScore {
  // Wildcards are least specific
  if (segment === '*') return 0;
  // All other segments are treated as static and most specific
  return 1;
}
