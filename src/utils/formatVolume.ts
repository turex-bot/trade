export const formatVolume = (value: number): string => {
  if (value === 0) return '0';
  const rounded = Math.round(value * 1000) / 1000;
  const str = rounded.toString();
  if (!str.includes('.')) return str;
  return str.replace(/\.?0+$/, '');
};

export const formatVolumeWithUnit = (value: number): string => {
  return `${formatVolume(value)} m³`;
};
