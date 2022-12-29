import "./../styles/styles.css";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  listAll,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  uploadString,
} from "firebase/storage";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  where,
  query,
  documentId,
  listCollections,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWeuEMFZpXzes_qswwGla9cSL9tEiLBHo",
  authDomain: "test-project-21166.firebaseapp.com",
  projectId: "test-project-21166",
  storageBucket: "test-project-21166.appspot.com",
  messagingSenderId: "242141797060",
  appId: "1:242141797060:web:e5611e8b2b8901347b8791",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const ntfPhoto = document.getElementById("ntfPhoto");
const send = document.getElementById("btn");
const ntfName = document.getElementById("ntfName");
const status = document.getElementById("myStatus");
const ntfPrv = document.getElementById("ntfPrv");
const ntfText = document.getElementById("ntfText");

// Raw string is the default if no format is provided

ntfPhoto.addEventListener("change", () => {
  const photo = ntfPhoto.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(photo);
  reader.onloadend = () => {
    ntfPrv.src = reader.result;
    const storageRef = ref(storage, "postImgs/" + photo.name);
    send.addEventListener("click", () => {
      status.innerText = "Przesyłamy!";

      uploadBytes(storageRef, photo).then((snapshot) => {
        getDownloadURL(storageRef, photo.name).then((url) => {
          console.log("Got URL: " + url);
          const postView = document.getElementById("postView");
          postView.src = url;

          const postDoc = doc(db, "posts", `${ntfName.value}`);
          setDoc(
            postDoc,
            {
              name: ntfName.value,
              message: ntfText.value,
              photo: url,
            },
            { merge: true }
          );
          getDoc(postDoc).then((doc) => {
            const myObj = doc.data();
            const postName = document.getElementById("postName");
            const postText = document.getElementById("postText");

            postName.innerText = myObj.name;
            postText.innerText = myObj.message;
            postView.src = myObj.photo;
          });
        });

        status.innerText = "Przesłano!";
      });
    });
  };
});

let itemParent = document.getElementById("listBox");
let newItem = document.createElement("ol");
newItem.className = "box";
itemParent.appendChild(newItem);
const usersCollection = collection(db, "posts");
getDocs(usersCollection).then((docs) => {
  docs.forEach((doc) => {
    console.log(doc.data());
    const myObj = doc.data();
    const myLi = document.createElement("li");
    const editBtn = document.createElement("button");
    editBtn.innerText = "POKAŻ";
    myLi.innerText = `${myObj.name}`;
    newItem.appendChild(myLi);
    newItem.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
      postName.innerText = myObj.name;
      postText.innerText = myObj.message;

      postView.src = myObj.photo;
    });
  });
});

// const usersList = document.getElementById("listBox");
// const usersCollection = collection(db, "posts");
// usersList.innerHTML = "";
// const userQuery = query(
//   usersCollection,
//   where("name", "==", myQueryName.value)
// );
// getDocs(userQuery).then((docs) => {
//   docs.forEach((userDoc) => {
//     const user = userDoc.data();
//     const userListItem = document.createElement("li");
//     userListItem.innerText = `${user.name}`;
//     usersList.appendChild(userListItem);
//   });
// });
