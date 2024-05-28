import {
  CreateAdminNotification,
  Wine,
  WineryGeneralInfo,
  Winery,
  BlendComponent,
  VineyardDetails,
  Grape,
  GrapeAndVineyard,
  CoordinateInterface,
  VineyardGrapeAndCoordinates,
} from "@/typings/winery";
import {
  DocumentData,
  arrayUnion,
  collection,
  where,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, functions, storage } from "@/lib/firebase/client";
import { removeUndefinedValues } from "./removeUndefinedValues";
import { httpsCallable } from "firebase/functions";

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

/////////////////////////////////////////////////////

// WINERY CALLABLES
export const getWineryData = httpsCallable(functions, "winery-getWineryData");
export const registerWineryGeneralInfo = httpsCallable(
  functions,
  "winery-registerWineryGeneralInfo"
);
export const registerWineryWine = httpsCallable(
  functions,
  "winery-registerWineryWine"
);
export const updateWineryHeadquarters = httpsCallable(
  functions,
  "winery-updateWineryHeadquarters"
);

export const getWineryByWineRefNumber = httpsCallable(
  functions,
  "winery-getWineryByWineRefNumber"
);

export const getWineByRefNumber = httpsCallable(
  functions,
  "winery-getWineByRefNumber"
);

export const getWinesByWineryName = httpsCallable(
  functions,
  "winery-getWinesByWineryName"
);

export const getWineryLevel = httpsCallable(functions, "winery-getWineryLevel");

export const getAllWineryNames = httpsCallable(
  functions,
  "winery-getAllWineryNames"
);

// DB CALLABLES
export const createNotification = httpsCallable(
  functions,
  "db-createNotification"
);

export const updateWineryWine = httpsCallable(
  functions,
  "winery-updateWineryWine"
);

export const getDocsInCollection = httpsCallable(
  functions,
  "db-getDocsInCollection"
);

export const getAllWines = httpsCallable(functions, "winery-getAllWines");

// AUTH CALLABLES
export const deleteUser = httpsCallable(functions, "auth-deleteUser");
export const disableUser = httpsCallable(functions, "auth-disableUser");
export const updateUserPassword = httpsCallable(
  functions,
  "auth-updateUserPassword"
);

// UTILS CALLABLES
export const getClosureTypesDb = httpsCallable(
  functions,
  "utils-getClosureTypes"
);
export const getIrrigationPractices = httpsCallable(
  functions,
  "utils-getIrrigationPractices"
);
export const getWineTypes = httpsCallable(functions, "utils-getWineTypes");
export const getWineColours = httpsCallable(functions, "utils-getWineColours");
export const getWineBottleSizes = httpsCallable(
  functions,
  "utils-getWineBottleSizes"
);
export const getAromaProfiles = httpsCallable(
  functions,
  "utils-getAromaProfiles"
);
export const getFlavourProfiles = httpsCallable(
  functions,
  "utils-getFlavourProfiles"
);
