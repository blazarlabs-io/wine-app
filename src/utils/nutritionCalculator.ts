export const kcal = (alcoholContent: string, sugar: string) => {
  const alcohol = parseFloat(alcoholContent);
  const sugars = parseFloat(sugar);
  return alcohol * 7 + sugars * 4;
};

export const kj = (alcoholContent: string, sugar: string) => {
  const alcohol = parseFloat(alcoholContent);
  const sugars = parseFloat(sugar);
  return alcohol * 29 + sugars * 17;
};
