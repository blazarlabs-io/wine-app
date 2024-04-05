export const getQrCodeImageData = (id: string) => {
  const canvas: any = document.getElementById(id);
  if (canvas) {
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    return pngUrl;
  }
};
