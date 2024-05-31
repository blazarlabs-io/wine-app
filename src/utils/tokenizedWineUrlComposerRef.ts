export const tokenizedWineUrlComposerRef = (
  referenceNumber: string
): string => {
  return `${process.env.NEXT_PUBLIC_DNS}tokenized-wine/?ref=${referenceNumber}`;
};
