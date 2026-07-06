const GOLDEN_ANGLE = 137.508;

export function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return ((hash % 360) + 360) % 360;
}

export function assignColor(uid: string, index: number = 0): string {
  const baseHue = hashToHue(uid);
  const hue = (baseHue + GOLDEN_ANGLE * index) % 360;
  return `hsl(${Math.round(hue)}, 70%, 55%)`;
}
