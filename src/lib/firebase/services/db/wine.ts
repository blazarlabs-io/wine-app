import { DbReturn } from "@/typings/firestore";
import { Wine } from "@/typings/winery";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../client";

export const wine = {
  set: async (uid: string, wine: Wine): Promise<DbReturn> => {
    try {
      const docRef = doc(db, "wineries", uid);
      const docData = await getDoc(docRef);
      let wines: Wine[] = [];

      if (docData.exists()) {
        docData.data()?.wines.forEach((w: Wine) => {
          wines.push(w);
        });

        wines.push(wine);

        await setDoc(docRef, { wines: wines }, { merge: true });

        return {
          status: 200,
          message: "Success",
          data: null,
        };
      } else {
        return {
          status: 404,
          message: "Not found",
          data: null,
        };
      }
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }
  },
};
