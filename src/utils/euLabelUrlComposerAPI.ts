export const euLabelUrlComposerAPI = (referenceNumber: string): string => {
  return `${process.env.NEXT_PUBLIC_DNS}api/ref/?ref=${referenceNumber}`;
};
