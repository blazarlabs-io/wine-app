import { DbReturn } from "@/typings/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../client";

export const winery = {
  getOne: async (uid: string): Promise<DbReturn> => {
    try {
      const docRef = doc(db, "wineries", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          status: 200,
          message: "Success",
          data: docSnap.data(),
        };
      }
      return {
        status: 404,
        message: "Not found",
        data: null,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }
  },
  set: async (uid: string, data: any): Promise<DbReturn> => {
    try {
      const docRef = doc(db, "wineries", uid);
      await setDoc(docRef, data);
      return {
        status: 200,
        message: "Success",
        data: null,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }
  },
  update: async (uid: string, data: any): Promise<DbReturn> => {
    try {
      const docRef = doc(db, "wineries", uid);
      await updateDoc(docRef, data);
      return {
        status: 200,
        message: "Success",
        data: null,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }
  },
};
