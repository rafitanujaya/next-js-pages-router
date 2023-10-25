import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import bycrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn(userdata) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userdata.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(data);
  if(data.length > 0) {
    console.log("ini jalan nih");
    return data[0]
  } else {
    return null
  }
}

export async function signUp(userdata, callback) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userdata.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    userdata.password = await bycrypt.hash(userdata.password, 10);
    userdata.role = "member";
    await addDoc(collection(firestore, "users"), userdata)
      .then(() => {
        callback({ status: true, message: "Register succes" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}
