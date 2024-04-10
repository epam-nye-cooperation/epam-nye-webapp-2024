export const transparentize = (color: string, alphaPercentage: number ) => {
  if (alphaPercentage > 100 || alphaPercentage < 0) {
    throw new Error(`Invalid transparent value: ${alphaPercentage}`);
  }
  const hexValue = Math.round(255 * alphaPercentage / 100).toString(16);
  return `${color}${hexValue}`;
};
