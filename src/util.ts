// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert = require("assert");

export function isDeepEqual(a: any, b: any): boolean {
  try {
    assert.deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}
