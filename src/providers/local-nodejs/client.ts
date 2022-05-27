export function getClient<T>(identifier: string): T {
  return (global as any).MyCloud[identifier] as unknown as T;
}
