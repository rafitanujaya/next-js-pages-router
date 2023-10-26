import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
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
  console.log(data);
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
  if (data.length > 0) {
    console.log("ini jalan nih");
    return data[0];
  } else {
    return null;
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

export async function signInWithGoogle(userdata, callback) {
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
  if (data.length > 0) {
    userdata.role = data[0].role;
    console.log(data[0].id);
    console.log(userdata);
    await updateDoc(doc(firestore, "users", data[0].id), userdata)
      .then(() => {
        callback({
          status: true,
          message: "Sign In with Google sucess",
          data: userdata,
        });
      })
      .catch(() => {
        callback({ status: false, message: "Sign In with Google failed" });
      });
  } else {
    userdata.role = "member";
    console.log(userdata);
    await addDoc(collection(firestore, "users"), userdata)
      .then(() =>
        callback({
          status: true,
          message: "Sign In with Google sucess",
          data: userdata,
        })
      )
      .catch(() =>
        callback({
          status: false,
          message: "Sign In with Google failed",
        })
      );
  }
}
