export const validateFileSizeAndType = (
  file: File,
  maxSize: number
): boolean => {
  let validatedSize: boolean;
  let validatedType: boolean;

  if (file.size / 1024 / 1024 > maxSize) {
    validatedSize = false;
  } else {
    validatedSize = true;
  }

  if (file.type === "image/jpeg" || file.type === "image/png") {
    validatedType = true;
  } else {
    validatedType = false;
  }

  return validatedSize && validatedType;
};
