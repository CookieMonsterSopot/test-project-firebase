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

const ntfPhoto = document.getElementById("addPhoto");
const send = document.getElementById("btn");
const ntfName = document.getElementById("ntfName");
const status = document.getElementById("myStatus");

const storageRef = ref(storage, `${ntfName.value}.txt`);

// Raw string is the default if no format is provided
const message = "This is my message.";
uploadString(storageRef, message).then((snapshot) => {
  console.log("Uploaded a raw string!");
  console.log(snapshot);
});

addPhoto.addEventListener("change", () => {
  const photo = ntfPhoto.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(photo);
  reader.onloadend = () => {
    thumbnailImage.src = reader.result;
    console.log(photo.name);
  };

const storageRef = ref(storage, 
  console.log(storageRef);
  send.addEventListener("click", () => {
    status.innerText = "Przesyłamy!";
    uploadBytes(storageRef).then(() => {
      status.innerText = "Przesłano!";
    });
  }));
});




// document.getElementById("btnList").addEventListener("click", () => {
//   const storageList = ref(storage,
//   console.log(storageList);
//   listAll(storageList).then((res) => {
//     res.items.forEach((item) => {
//       getDownloadURL(item).then((url) => {
//         const myDiv = document.createElement("div");
//         const myImg = document.createElement("img");
//         const myHeader = document.createElement("h1");
//         const myButton = document.createElement("button");

//         myButton.innerText = "Usuń";
//         myImg.src = url;

//         myButton.addEventListener("click", () => {
//           deleteObject(item).then(() => {
//             document.body.removeChild(myDiv);
//           });
//         });
//         myHeader.innerText = item.fullPath;
//         myDiv.appendChild(myImg);
//         myDiv.appendChild(myHeader);
//         myDiv.appendChild(myButton);
//         document.body.appendChild(myDiv);
//       });
//     });
//   });
// });
