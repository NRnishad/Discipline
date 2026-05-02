import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function getUserDataRef(userId) {
  return doc(db, "users", userId, "app", "discipline_os");
}

export async function loadDisciplineData(userId) {
  const snapshot = await getDoc(getUserDataRef(userId));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return data.payload || null;
}

export async function saveDisciplineData(userId, payload) {
  await setDoc(
    getUserDataRef(userId),
    {
      payload,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
