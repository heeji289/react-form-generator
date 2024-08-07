export const getSessionItem = <T>(key: string, defaultValue: T): T => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const setSessionItem = <T>(key: string, value: T): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionItem = (key: string): void => {
  sessionStorage.removeItem(key);
};
