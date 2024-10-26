export function removeSpacesFromKey(key: string) {
  return key.trim().split(" ").join("");
}
