type AnyObject = Record<string, any>;
export const findLastIndexOfferCard = <T extends AnyObject>(
  arr: T[],
  key: keyof T,
  notEqualValue: any
): number => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][key] !== notEqualValue) {
      return i;
    }
  }
  // Kalau semua item value === notEqualValue, default ke arr.length - 1
  return arr.length > 0 ? arr.length - 1 : -1;
};
