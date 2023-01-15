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
} from "firebase/firestore";
import {
  getDatabase,
  ref as rtref,
  set,
  push,
  onChildAdded,
} from "firebase/database";
import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as firebaseui from "firebaseui";

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
const auth = getAuth(app);
const ui = new firebaseui.auth.AuthUI(auth);

//INPUTS
const userName = document.getElementById("name");
const userSurname = document.getElementById("surname");
const userColor = document.getElementById("userColor");
const userMessage = document.getElementById("message");
const profilePhoto = document.getElementById("photoProfile");
const profileColor = document.getElementById("profileColor");

//BUTTONS
const addUserBtn = document.getElementById("add");
const sendMessage = document.getElementById("send");
const signOutBtn = document.getElementById("signout");
const updatePhotoBtn = document.getElementById("updatePhoto");
const updateProfileColorBtn = document.getElementById("updateProfileColor");

//SELECTS
const usersSelect = document.getElementById("users");

//FORMS
const messageForm = document.getElementById("messageForm");

//CONTAINERS
const messagesContainer = document.getElementById("messages");

//REFS
const usersRef = rtref(rtdb, "users");
const messagesRef = rtref(rtdb, "messages");

//IMG
const profileImg = document.getElementById("profile");

let selectedUser;

sendMessage.addEventListener("click", () => {
  const messageRef = push(messagesRef);

  set(messageRef, {
    userName: selectedUser.name,
    userSurname: selectedUser.surname,
    userColor: selectedUser.color,
    text: userMessage.value,
    date: new Date().toISOString(),
  }).then(() => {
    userMessage.value = "";
  });
});

usersSelect.addEventListener("change", () => {
  const userHeader = document.getElementById("selectedUser");

  if (usersSelect.value) {
    const user = JSON.parse(usersSelect.value);
    userHeader.innerText = `${user.name} ${user.surname}`;
    userHeader.style.color = user.color;
    selectedUser = user;
    messageForm.style.display = "flex";
  } else {
    userHeader.innerText = "";
    selectedUser = undefined;
    messageForm.style.display = "none";
  }
});

addUserBtn.addEventListener("click", () => {
  const userRef = push(usersRef);

  set(userRef, {
    name: userName.value,
    surname: userSurname.value,
    color: userColor.value,
  }).then(() => {
    userName.value = "";
    userSurname.value = "";
    userColor.value = "";
  });
});

onChildAdded(usersRef, (userSnapshot) => {
  const user = userSnapshot.val();
  const option = document.createElement("option");
  option.innerText = `${user.name} ${user.surname}`;
  option.value = JSON.stringify(user);

  usersSelect.appendChild(option);
});

onChildAdded(messagesRef, (messageSnapshot) => {
  const message = messageSnapshot.val();
  const messageDiv = document.createElement("div");
  const authorSpan = document.createElement("span");
  const dateSpan = document.createElement("span");
  const messageSpan = document.createElement("span");

  authorSpan.innerText = `${message.userName} ${message.userSurname}`;
  dateSpan.innerText = new Date(message.date).toLocaleString();
  messageSpan.innerText = message.text;
  messageSpan.style.color = message.userColor;

  messageDiv.classList.add("message");
  messageDiv.appendChild(authorSpan);
  messageDiv.appendChild(dateSpan);
  messageDiv.appendChild(messageSpan);

  messagesContainer.appendChild(messageDiv);
});

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "http://localhost:8080/",
});

onAuthStateChanged(auth, (user) => {
  const greetings = document.getElementById("greetings");
  if (user) {
    greetings.innerText = `Hello ${user.displayName}!`;
    signOutBtn.style.display = "block";
    profileImg.src = user.photoURL;
  } else {
    greetings.innerText = "Not logged in";
    signOutBtn.style.display = "none";
    profileImg.src = "";
  }
});

signOutBtn.addEventListener("click", () => {
  signOut(auth);
});

updatePhotoBtn.addEventListener("click", () => {
  const file = profilePhoto.files[0];

  const photoFileRef = ref(storage, `${auth.currentUser.uid}/profilePhoto.jpg`);

  uploadBytes(photoFileRef, file).then((res) => {
    getDownloadURL(res.ref).then((url) => {
      updateProfile(auth.currentUser, {
        photoURL: url,
      });
    });
  });
});

updateProfileColorBtn.addEventListener("click", () => {
  const userDoc = doc(db, `users/${auth.currentUser.uid}`);
  setDoc(userDoc, {
    color: profileColor.value,
  });
});
