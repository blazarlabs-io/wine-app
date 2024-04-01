export const validateFileSizeInMegabytes = (
  file: File,
  maxSize: number
): boolean => {
  if (file.size / 1024 / 1024 > maxSize) {
    return false;
  }
  return true;
};
