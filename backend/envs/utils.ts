export const getBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
};

export const getNumber = (value: string | undefined, defaultValue: number): number => {
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const getString = (value: string | undefined, defaultValue: string): string => {
  return value || defaultValue;
};

export const required = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Environment variable ${name} is required`);
  return value;
};
