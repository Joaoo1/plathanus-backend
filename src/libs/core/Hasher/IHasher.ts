export interface IHasher {
  compare: (plainText: string, digest: string) => Promise<boolean>;
}
