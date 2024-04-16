import { EuLabelInterface, WineryGeneralInfoInterface } from "@/typings/winery";
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
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/lib/firebase/client";

export const initWineryInDb = async (docId: string) => {
  console.log("initWineryInDb", db, docId);
  try {
    await setDoc(
      doc(db, "wineries", docId),
      { uid: docId, generalInfo: {}, euLabels: [], wines: [] },
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

export const regiterWineryEuLabel = async (
  docId: string,
  euLabel: EuLabelInterface
) => {
  const docRef = doc(db, "wineries", docId as string);
  await updateDoc(docRef, { euLabels: arrayUnion(euLabel) });
};

export const updateWineryEuLabel = async (
  docId: string,
  euLabel: EuLabelInterface
) => {
  const docRef = doc(db, "wineries", docId as string);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const euLabels = data?.euLabels;
  if (euLabels) {
    const updatedEuLabels = euLabels.map((label: EuLabelInterface) => {
      if (label.referenceNumber === euLabel.referenceNumber) {
        return euLabel;
      } else {
        return label;
      }
    });
    await updateDoc(docRef, { euLabels: updatedEuLabels });
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
  callback: (label: EuLabelInterface | null) => void
) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  querySnapshot.forEach((doc) => {
    if (doc.data().euLabels) {
      doc.data().euLabels.forEach((label: EuLabelInterface) => {
        if (label.referenceNumber === refNumber) {
          // console.log(doc.id, " => ", label);
          callback(label);
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
  callback: (label: EuLabelInterface | null) => void
) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  querySnapshot.forEach((doc) => {
    if (doc.data().euLabels) {
      doc.data().euLabels.forEach((label: EuLabelInterface) => {
        if (label.upc === upc) {
          // console.log(doc.id, " => ", label);
          callback(label);
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

export const getAllEuLabelWines = async () => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);

  const items: EuLabelInterface[] = [];
  await querySnapshot.forEach((doc) => {
    if (doc.data().euLabels.length > 0) {
      doc.data().euLabels.forEach((label: EuLabelInterface) => {
        items.push(label);
      });
    }
  });
  return items;
};

export const getWineryLevelDb = async (tier: string) => {
  try {
    const docRef = doc(db, "utils", "systemVariables");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const level = data?.level[tier];
    console.log(tier, data);
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
    items.push(doc.data().generalInfo.name);
  });
  return items;
};

export const getEuLabelWinesByWineryName = async (wineryName: string) => {
  const wineries = query(
    collection(db, "wineries"),
    where("generalInfo.name", "==", wineryName)
  );
  const querySnapshot = await getDocs(wineries);
  const items: EuLabelInterface[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().euLabels.length > 0) {
      doc.data().euLabels.forEach((label: EuLabelInterface) => {
        items.push(label);
      });
    }
  });
  return items;
};

export const getEuLabelWinesByWineType = async (wineType: string) => {
  const wineries = query(collection(db, "wineries"));
  const querySnapshot = await getDocs(wineries);
  const items: EuLabelInterface[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().euLabels.length > 0) {
      doc.data().euLabels.forEach((label: EuLabelInterface) => {
        if (
          label.typeOfWine.toLocaleLowerCase() === wineType.toLocaleLowerCase()
        ) {
          console.log("found", label.typeOfWine);
          items.push(label);
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
