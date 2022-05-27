export function getClient<T>(identifier: string): T {
  return (global as any).MyCloud.modules[identifier] as unknown as T;
}
