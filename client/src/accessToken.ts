export let accessToken = "";

export const setAcccessToken = (s: string) => {
  accessToken = s;
};

export const getAcccessToken = (): string => {
  return accessToken;
};
