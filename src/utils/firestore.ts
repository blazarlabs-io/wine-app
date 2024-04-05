import {
  EuLabelInterface,
  WineryGeneralInfoInterface,
} from "@/typings/components";
import {
  DocumentData,
  arrayUnion,
  doc,
  getDoc,
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

export const registerWineryEuLabel = async (
  docId: string,
  euLabel: EuLabelInterface
) => {
  const docRef = doc(db, "wineries", docId as string);
  await updateDoc(docRef, { euLabels: arrayUnion(euLabel) });
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
