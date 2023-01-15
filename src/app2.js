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
  onSnapshot,
  set,
} from "firebase/firestore";
import { getDatabase, ref as rtref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWeuEMFZpXzes_qswwGla9cSL9tEiLBHo",
  authDomain: "test-project-21166.firebaseapp.com",
  projectId: "test-project-21166",
  storageBucket: "test-project-21166.appspot.com",
  messagingSenderId: "242141797060",
  databaseURL:
    "https://test-project-21166-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:242141797060:web:e5611e8b2b8901347b8791",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

const albumName = document.getElementById("name");
const albumYear = document.getElementById("year");
const addAlbum = document.getElementById("addAlbum");

// addAlbum.addEventListener("click", () => {
//   const albumsRef = collection(db, "albums");
//   addDoc(albumsRef, {
//     name: albumName.value,
//     year: albumYear.value,
//   });
// });

// const photoFile = document.getElementById("photoFile");
// const albumId = document.getElementById("albumId");
// const addPhotoBtn = document.getElementById("addPhoto");

// const albumsCollection = collection(db, "albums");
// getDocs(albumsCollection).then((docs) => {
//   const myOl = document.getElementById("albumsList");
//   docs.forEach((doc) => {
//     const myObj = doc.data();
//     const myLi = document.createElement("li");

//     const addPhotosBtn = document.createElement("button");
//     const showPhotosBtn = document.createElement("button");
//     addPhotosBtn.innerText = "Add photos";
//     showPhotosBtn.innerText = "Show photos";

//     addPhotosBtn.addEventListener("click", () => {
//       albumId.value = doc.id;
//     });

//     showPhotosBtn.addEventListener("click", () => {
//       const albumRef = ref(storage, doc.id);
//       document.getElementById("photos").innerHTML = "";

//       listAll(albumRef).then((res) => {
//         res.items.forEach((item) => {
//           getDownloadURL(item).then((url) => {
//             const myImg = document.createElement("img");
//             myImg.src = url;
//             document.getElementById("photos").appendChild(myImg);
//           });
//         });
//       });
//     });

//     myLi.innerText = `${myObj.name} ${myObj.year}`;
//     myLi.appendChild(addPhotosBtn);
//     myLi.appendChild(showPhotosBtn);

//     myOl.appendChild(myLi);
//   });
// });

// addPhotoBtn.addEventListener("click", () => {
//   const file = photoFile.files[0];
//   const fileRef = ref(storage, `${albumId.value}/${file.name}`);
//   uploadBytes(fileRef, file);
// });

const seconds = document.getElementById("seconds");
const stoperDoc = doc(db, "stopers", "stoper");
onSnapshot(stoperDoc, (doc) => {
  seconds.innerText = doc.data().seconds;
});

let intervalId;
let i = 0;

const start = document.getElementById("start");
const reset = document.getElementById("reset");

start.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    i++;
    setDoc(stoperDoc, {
      seconds: i,
    });
  }, 1000);
});

reset.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  i = 0;
  setDoc(stoperDoc, {
    seconds: 0,
  });
});
