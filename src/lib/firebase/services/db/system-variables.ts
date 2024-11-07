import { doc, getDoc } from "firebase/firestore";
import { db } from "../../client";
import { DbReturn } from "@/typings/firestore";

export const systemVariables = {
  getOne: async (variable: string): Promise<DbReturn> => {
    try {
      const docRef = doc(db, "utils", "systemVariables");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          status: 200,
          message: "Success",
          data: docSnap.data()[variable],
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
};
