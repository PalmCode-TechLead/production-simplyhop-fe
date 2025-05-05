export const formatUnreadMessageNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(".", ",") + " Mrd"; // Milliarde
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(".", ",") + " Mio"; // Million
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(".", ",") + " Tsd"; // Tausend
  } else {
    return num.toString();
  }
};
