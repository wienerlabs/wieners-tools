const DOTLESS_I = String.fromCharCode(0x131);

export function normalizeSearch(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replaceAll(DOTLESS_I, "i");
}
