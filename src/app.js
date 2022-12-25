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

const ntfPhoto = document.getElementById("ntfPhoto");
const send = document.getElementById("btn");
const ntfName = document.getElementById("ntfName");
const status = document.getElementById("myStatus");
const ntfPrv = document.getElementById("ntfPrv");

// Raw string is the default if no format is provided

ntfPhoto.addEventListener("change", () => {
  const photo = ntfPhoto.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(photo);
  reader.onloadend = () => {
    ntfPrv.src = reader.result;
    console.log(photo.name);

    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, "postImgs");

    const spaceRef = ref(imagesRef, photo.name);

    send.addEventListener("click", () => {
      status.innerText = "Przesyłamy!";
      uploadBytes(spaceRef).then(() => {
        getDownloadURL(spaceRef).then((url) => {
          console.log("Got URL: " + url);

          // Insert url into an <img> tag to "download"
        });
        status.innerText = "Przesłano!";
      });
    });
  };
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
