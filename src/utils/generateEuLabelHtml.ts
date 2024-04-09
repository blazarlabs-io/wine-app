export const generateEuLabelHtml = (url: string, image: string) => {
  console.log(url, image);
  return `
          <div>
              <h1 style="font-size: 24px; font-weight: 600; color: #333333; margin-bottom: 24px;">
                  Your new EU-only label has been created!
              </h1>
              <img src="${image}" alt="QR Code" style="width: 200px; height: 200px; border-radius: 8px; object-fit: cover; object-position: center;">
              <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
                  You can find your QR code here: <h3>${image}</h3>
              </p>
              <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
                  The url is: <h3>${url}</h3>
              </p>
          </div>
      `;
};
