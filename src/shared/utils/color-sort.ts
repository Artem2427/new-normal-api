interface IColor {
  hex: string;
  luma: number;
}

const createColorObject = (hexVal: string) => {
  return { hex: hexVal };
};

const constructColor = (colorObj: { hex: string }) => {
  const hex = colorObj.hex.substring(1);
  /* Get the RGB values to calculate the Hue. */
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const luma = 0.3 * r + 0.59 * g + 0.11 * b;
  return { hex: colorObj.hex, luma };
};

const sortColorsByLuma = (colors: IColor[]) => {
  return colors.sort(function (a: IColor, b: IColor) {
    return a.luma - b.luma;
  });
};

const mapHex = (color: IColor) => {
  return color.hex;
};

export const outputColors = function (hexArray: string[]) {
  const colors: IColor[] = [];
  hexArray.forEach((hex: string) => {
    const newColor = constructColor(createColorObject(hex));
    colors.push(newColor);
  });

  const sorted = sortColorsByLuma(colors);

  return sorted.map(mapHex);
};

export const getColors = (
  sortedShades: string[],
  indexCurrentShade: number,
  count: number,
): string[] => {
  const result: string[] = [];

  const left = sortedShades.slice(0, indexCurrentShade);
  const right = sortedShades.slice(indexCurrentShade + 1, sortedShades.length);

  if (left.length >= count) {
    result.push(...left.slice(left.length - count, left.length));
    return result;
  }

  if (right.length >= count) {
    result.push(...right.slice(0, count));
    return result;
  }

  if (left.length < count) {
    result.push(
      ...left.slice(0, left.length),
      ...right.slice(0, count - left.length),
    );
    return result;
  }

  return result;
};
