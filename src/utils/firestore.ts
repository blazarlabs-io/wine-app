import { Wine, BlendComponent, Grape } from "@/typings/winery";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/lib/firebase/client";

export const getWineryDataDb = async (
  docId: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, "wineries", docId);
  const docSnap = await getDoc(docRef);

  return new Promise<DocumentData | null>((resolve, reject) => {
    if (docSnap.exists()) {
      resolve(docSnap.data());
    } else {
      resolve(null);
    }
  });
};

export const uploadLogoToStorage = async (
  id: string,
  file: File,
  callback: (url: string) => void
) => {
  if (!file) {
    getWineryDataDb(id).then((data) => {
      callback(data?.generalInfo.logo || "");
    });
    return;
  }
  const imgRef = ref(
    storage,
    "images/" + id + "/logo." + file.type.split("/")[1]
  );

  const uploadTask = uploadBytesResumable(imgRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const uploadQrCodeToStorage = async (
  id: string,
  file: string,
  name: string,
  callback: (url: string) => void
) => {
  const blob = await fetch(file).then((r) => r.blob());
  const newImage = new File([blob], name + ".png", { type: "image/png" });

  if (!file) {
    getWineryDataDb(id).then((data) => {
      callback(data?.generalInfo.logo || "");
    });
    return;
  }

  const imgRef = ref(storage, "images/" + id + "/" + name + ".png");

  const uploadTask = uploadBytesResumable(imgRef, newImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const uploadWineImageToStorage = async (
  id: string,
  file: File,
  refNumber: string,
  callback: (url: string) => void
) => {
  if (!file) {
    callback("");
    return;
  }
  const imgRef = ref(
    storage,
    "images/" + id + "/wines" + "/" + refNumber + "." + file.type.split("/")[1]
  );

  const uploadTask = uploadBytesResumable(imgRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const getGrapeVarieties = async (docId: string, ref: string) => {
  try {
    const docRef = doc(db, "wineries", docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const wines = data?.wines;
    let grapeVarieties: Grape[] = [];
    await wines.forEach((wine: Wine) => {
      if (wine.referenceNumber === ref) {
        wine.blendComponents.forEach((component: BlendComponent) => {
          if (component.vineyardDetails.grape) {
            grapeVarieties.push(component.vineyardDetails.grape as Grape);
          }
        });
      }
    });
    return grapeVarieties as Grape[];
  } catch (e) {
    console.error(e);
    return null;
  }
};
