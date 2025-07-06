import stringComparison from 'string-comparison';

export default class StringSimilarity {
  private static cosine = stringComparison.cosine;

  static similarity(str1: string, str2: string) {
    return this.cosine.similarity(str1, str2);
  }

  static distance(str1: string, str2: string) {
    return this.cosine.distance(str1, str2);
  }

  static sortMatch(str: string, arr: string[]) {
    return this.cosine.sortMatch(str, arr).sort((a, b) => b.rating - a.rating);
  }

}