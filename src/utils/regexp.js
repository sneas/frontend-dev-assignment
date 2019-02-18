// Taken from https://stackoverflow.com/a/6969486/379949
export const escapeRegexpString = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
