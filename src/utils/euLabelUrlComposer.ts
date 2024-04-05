export const euLabelUrlComposer = (referenceNumber: string): string => {
  return `${process.env.NEXT_PUBLIC_DNS}/explorer/wine/${referenceNumber}`;
};
