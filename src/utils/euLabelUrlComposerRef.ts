export const euLabelUrlComposerRef = (referenceNumber: string): string => {
  return `${process.env.NEXT_PUBLIC_DNS}wine/?ref=${referenceNumber}`;
};
