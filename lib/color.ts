const HEX_SHORT_LENGTH = 4;
const HEX_LONG_LENGTH = 7;
const HEX_SHORT_ALPHA_LENGTH = 5;
const HEX_LONG_ALPHA_LENGTH = 9;

const expandHex = (hex: string) =>
  hex
    .slice(1)
    .split("")
    .map((char) => char + char)
    .join("");

const parseRgbFunction = (value: string): string | null => {
  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);

  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch[1]
    .replace("/", " ")
    .replaceAll(",", " ")
    .match(/[\d.]+%?/g);

  if (!channels || channels.length < 3) {
    return null;
  }

  const [red, green, blue] = channels.slice(0, 3).map((channel) => {
    if (channel.endsWith("%")) {
      return Math.round((Number.parseFloat(channel) / 100) * 255);
    }

    return Math.round(Number.parseFloat(channel));
  });

  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return `${red},${green},${blue}`;
};

export const tryColorToRgbTuple = (color: string): string | null => {
  const trimmed = color.trim();

  if (trimmed.startsWith("#")) {
    const normalized =
      trimmed.length === HEX_SHORT_LENGTH || trimmed.length === HEX_SHORT_ALPHA_LENGTH
        ? expandHex(trimmed)
        : trimmed.slice(1);

    if (
      normalized.length !== HEX_LONG_LENGTH - 1 &&
      normalized.length !== HEX_LONG_ALPHA_LENGTH - 1
    ) {
      return null;
    }

    const red = Number.parseInt(normalized.slice(0, 2), 16);
    const green = Number.parseInt(normalized.slice(2, 4), 16);
    const blue = Number.parseInt(normalized.slice(4, 6), 16);

    return `${red},${green},${blue}`;
  }

  const rgbTuple = parseRgbFunction(trimmed);
  if (rgbTuple) {
    return rgbTuple;
  }

  const spacedChannels = trimmed.match(/^\d+(?:\.\d+)?\s+\d+(?:\.\d+)?\s+\d+(?:\.\d+)?$/);
  if (spacedChannels) {
    return trimmed.replace(/\s+/g, ",");
  }

  const commaSeparated = trimmed.match(/^\d+(?:\.\d+)?,\d+(?:\.\d+)?,\d+(?:\.\d+)?$/);
  if (commaSeparated) {
    return trimmed;
  }

  return null;
};

export const colorToRgbTuple = (color: string): string =>
  tryColorToRgbTuple(color) ?? "255,255,255";

export const colorToRgba = (color: string, alpha: number): string =>
  `rgba(${colorToRgbTuple(color)},${alpha})`;
