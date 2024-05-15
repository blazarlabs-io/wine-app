import {
  CreateAdminNotification,
  WineInterface,
  GrapesInterface,
  GrapesMapCoordinatesInterface,
  WineryDataInterface,
  WineryGeneralInfoInterface,
  WineryInterface,
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
import { db, storage } from "@/lib/firebase/client";

export const initWineryInDb = async (docId: string) => {
  try {
    await setDoc(
      doc(db, "wineries", docId),
      { uid: docId, generalInfo: {}, wines: [] },
      { merge: true }
    );
  } catch (e) {
    console.error(e);
  }
};

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

export const registerWineryGeneralInfoToDb = async (
  docId: string,
  wineryData: WineryGeneralInfoInterface
) => {
  const docRef = doc(db, "wineries", docId as string);
  setDoc(docRef, { generalInfo: wineryData }, { merge: true });
};

export const registerWineryWine = async (
  docId: string,
  wine: WineInterface
) => {
  const docRef = doc(db, "wineries", docId as string);
  await updateDoc(docRef, { wines: arrayUnion(wine) });
};

export const updateWineryWine = async (docId: string, wine: WineInterface) => {
  const docRef = doc(db, "wineries", docId as string);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const wines = data?.wines;
  if (wines) {
    const updatedWines = wines.map((w: WineInterface) => {
      if (w.referenceNumber === wine.referenceNumber) {
        return wine;
      } else {
        return w;
      }
    });
    await updateDoc(docRef, { wines: updatedWines });
  }
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

export const getWineByRefNumber = async (
  refNumber: string,
  callback: (wine: WineInterface | null) => void
) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  querySnapshot.forEach((doc) => {
    if (doc.data().wines) {
      doc.data().wines.forEach((wine: WineInterface) => {
        if (wine.referenceNumber === refNumber) {
          callback(wine);
        } else {
          // callback(null);
        }
      });
    } else {
      // callback(null);
    }
  });
};

export const getWineByUpcCode = async (
  upc: string,
  callback: (wine: WineInterface | null) => void
) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  querySnapshot.forEach((doc) => {
    if (doc.data().wines) {
      doc.data().wines.forEach((wine: WineInterface) => {
        if (wine.upc === upc) {
          callback(wine);
        } else {
          // callback(null);
        }
      });
    } else {
      // callback(null);
    }
  });
};

export const getDocsInCollection = async (collectionName: string) => {
  const result = collection(db, collectionName);
  const querySnapshot = await getDocs(result);
  const items: any[] = [];
  querySnapshot.forEach((doc) => {
    items.push(doc.data());
  });
  return items;
};

export const getAllWines = async () => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);

  const items: WineInterface[] = [];
  await querySnapshot.forEach((doc) => {
    if (doc.data().wines.length > 0 && doc.data().disabled === false) {
      doc.data().wines.forEach((wine: WineInterface) => {
        items.push(wine);
      });
    }
  });
  return items;
};

export const getWineryLevelDb = async (l: string) => {
  try {
    const docRef = doc(db, "utils", "systemVariables");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const level = data?.level[l];
    return level;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAllWineryNames = async () => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  const items: string[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().disabled === false) {
      items.push(doc.data().generalInfo.name);
    }
  });
  return items;
};

export const getWinesByWineryName = async (wineryName: string) => {
  const wineries = query(
    collection(db, "wineries"),
    where("generalInfo.name", "==", wineryName)
  );
  const querySnapshot = await getDocs(wineries);
  const items: WineInterface[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().wines.length > 0 && doc.data().disabled === false) {
      doc.data().wines.forEach((wine: WineInterface) => {
        items.push(wine);
      });
    }
  });
  return items;
};

export const getWinesByWineType = async (wineType: string) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  const items: WineInterface[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().wines.length > 0 && doc.data().disabled === false) {
      doc.data().wines.forEach((wine: WineInterface) => {
        if (
          wine.typeOfWine.toLocaleLowerCase() === wineType.toLocaleLowerCase()
        ) {
          items.push(wine);
        }
      });
    }
  });
  return items;
};

export const getWineTypes = async () => {
  try {
    const docRef = doc(db, "utils", "systemVariables");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data?.wineTypes;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const overwriteWineryData = async (
  docId: string,
  data: WineryInterface
) => {
  const docRef = doc(db, "wineries", docId);
  try {
    await updateDoc(docRef, { ...data });
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getWineryByWineRefNumber = async (
  refNumber: string,
  callback: (data: WineryInterface | null) => void
) => {
  const wineries = query(collection(db, "wineries"));
  try {
    const querySnapshot = await getDocs(wineries);
    let winery: WineryInterface | null = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().wines) {
        doc.data().wines.forEach((wine: WineInterface) => {
          if (wine.referenceNumber === refNumber) {
            winery = doc.data() as WineryInterface;
          }
        });
      }
    });
    callback(winery);
  } catch (e) {
    console.error(e);
    callback(null);
  }
};

export const updateGrapesInWine = async (
  docId: string,
  refNumber: string,
  grapes: GrapesInterface
) => {
  const docRef = doc(db, "wineries", docId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const wines = data?.wines;
  if (wines) {
    const updatedWines = wines.map((wine: WineInterface) => {
      if (wine.referenceNumber === refNumber) {
        wine.ingredients.grapes = grapes;
        return wine;
      } else {
        return wine;
      }
    });
    await updateDoc(docRef, { wines: updatedWines });
  }
};

export const updateWineryHeadquarters = async (
  docId: string,
  latitude: number,
  longitude: number
) => {
  const docRef = doc(db, "wineries", docId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const updatedGeneralInfo = data?.generalInfo;
  updatedGeneralInfo.wineryHeadquarters.latitude = latitude;
  updatedGeneralInfo.wineryHeadquarters.longitude = longitude;
  await updateDoc(docRef, { generalInfo: updatedGeneralInfo });
};

export const createAdminNotification = async (
  data: CreateAdminNotification
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    const id = data.wineryName.replace(/\s/g, "").toLocaleLowerCase();
    const docRef = doc(db, "notifications", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      resolve(true);
    } else {
      await setDoc(docRef, data);
      resolve(false);
    }
  });
};
