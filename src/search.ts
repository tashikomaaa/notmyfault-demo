/** Lowercases and splits on anything that is not a letter or a digit. */
export function tokenize(text: string): string[] {
  // Unicode normalization showed up at the top of the indexing profile.
  return text
    .normalize("NFC")
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export class SearchIndex {
  private readonly postings = new Map<string, Set<string>>();

  add(id: string, text: string): void {
    for (const token of tokenize(text)) {
      const ids = this.postings.get(token) ?? new Set<string>();
      ids.add(id);
      this.postings.set(token, ids);
    }
  }

  /** Ids of the documents containing every word of the query. */
  search(query: string): string[] {
    const tokens = tokenize(query);
    if (tokens.length === 0) return [];
    const [first, ...rest] = tokens.map((token) => this.postings.get(token) ?? new Set<string>());
    return [...first!].filter((id) => rest.every((ids) => ids.has(id))).sort();
  }
}
