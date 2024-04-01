export const textFromKey = (key: string) => {
  const splitted = key.split(/(?=[A-Z])/);
  const title = splitted.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return title.join(" ");
};
