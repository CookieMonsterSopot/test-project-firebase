import "./../styles/styles.css";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  listAll,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
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

// --- dodawanie do bazy ----

// const jkDoc = doc(db, "users", "IdJanaKowalskiego");
// setDoc(jkDoc, {
//   name: "Jan",
//   surname: "Kowalski",
// });

// ---- dodawanie do bazy przez input ----

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const btn = document.getElementById("myBtn");

// btn.addEventListener("click", () => {
//   const jkDoc = doc(db, "users", `${myName.value}_${mySurname.value}`);
//   setDoc(jkDoc, {
//     name: myName.value,
//     surname: mySurname.value,
//     age: myAge.value,
//   });
// });

// ---- generowanie unikalnych ID dokumentu ----
//      > tworzymy referencje na kolekcje <

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const btn = document.getElementById("myBtn");

// btn.addEventListener("click", () => {
//   const usersCollection = collection(db, "users");
//   addDoc(
//     usersCollection,
//     {
//       name: myName.value,
//       surname: mySurname.value,
//       age: myAge.value,
//     },
//     { merge: true }
//   );
// });

// ---- pobieranie danych z id_collection----

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const btn = document.getElementById("myBtn");

// const jkDoc = doc(db, "users", "IdJanaKowalskiego");
// getDoc(jkDoc).then((doc) => {
//   const myObj = doc.data();
//   myName.value = myObj.name;
//   mySurname.value = myObj.surname;
//   myAge.value = myObj.age;
// });

// btn.addEventListener("click", () => {
//   const jkDoc = doc(db, "users", "IdJanaKowalskiego");
//   setDoc(
//     jkDoc,
//     {
//       name: myName.value,
//       surname: mySurname.value,
//       age: myAge.value,
//     },
//     { merge: true }
//   );
// });

// ---- aktualizacja dokumentu > merge < ----

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const btn = document.getElementById("myBtn");

// btn.addEventListener("click", () => {
//   const jkDoc = doc(db, "users", `${myName.value}_${mySurname.value}`);
//   setDoc(
//     jkDoc,
//     {
//       name: myName.value,
//       surname: mySurname.value,
//       age: myAge.value,
//     },
//     { merge: true }
//   );
// });

// updateDoc ta sama konstrukcja co wyzej tylko bez > merge <

// ---- pobieranie wszystkich danych z collection ----

// const usersCollection = collection(db, "users");
// getDocs(usersCollection).then((docs) => {
//   docs.forEach((doc) => console.log(doc.data()));
// });

// ---- zadanie 3 z pliku----

// const usersCollection = collection(db, "users");
// getDocs(usersCollection).then((docs) => {
//   const myOl = document.createElement("ol");
//   docs.forEach((doc) => {
//     const myObj = doc.data();
//     const myLi = document.createElement("li");
//     myLi.innerText = `${myObj.name} ${myObj.surname}`;
//     myOl.appendChild(myLi);
//   });
//   document.body.appendChild(myOl);
// });

// ---- zadanie 4 z pliku----

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const btn = document.getElementById("myBtn");
// let myDoc;

// const usersCollection = collection(db, "users");
// getDocs(usersCollection).then((docs) => {
//   const myOl = document.createElement("ol");
//   docs.forEach((doc) => {
//     const myObj = doc.data();
//     const myLi = document.createElement("li");
//     const editBtn = document.createElement("button");
//     editBtn.innerText = "Edit";
//     myLi.innerText = `${myObj.name} ${myObj.surname}`;
//     myLi.appendChild(editBtn);

//     editBtn.addEventListener("click", () => {
//       myName.value = myObj.name;
//       mySurname.value = myObj.surname;
//       myAge.value = myObj.age;
//       myDoc = doc.ref;
//     });

//     myOl.appendChild(myLi);
//   });
//   document.body.appendChild(myOl);
// });

// btn.addEventListener("click", () => {
//   updateDoc(myDoc, {
//     name: myName.value,
//     surname: mySurname.value,
//     age: myAge.value,
//   });
// });

// const users = collection(db, "users");
// const ja = query(users, where("name", "==", "Ja"));
// const old = query(users, where("age", "=<", 40));
// const henioFathers = query(users, where("dzieci", "array-contains", "Henio"));
// const henioOrMarusFathers = query(
//   users,
//   where("dzieci", "array-contains-any", ["Henio", "Maruś"])
// );
// const jansAndJanuszes = query(users, where("name", "in", ["Jan", "Janusz"]));
// const notJansAndJanuszes = query(
//   users,
//   where("name", "not-in", ["Jan", "Janusz"])
// );

// getDocs(old).then((docs) => {
//   docs.forEach((doc) => console.log(doc.data()));
// });

// zadanie 5

// const myQueryName = document.getElementById("queryName");
// const findBtn = document.getElementById("findBtn");
// const usersList = document.getElementById("usersList");

// const usersRef = collection(db, "users");

// findBtn.addEventListener("click", () => {
//   usersList.innerHTML = "";
//   const userQuery = query(usersRef, where("name", "==", myQueryName.value));
//   getDocs(userQuery).then((docs) => {
//     docs.forEach((userDoc) => {
//       const user = userDoc.data();
//       const userListItem = document.createElement("li");
//       userListItem.innerText = `${user.name} ${user.surname}`;
//       usersList.appendChild(userListItem);
//     });
//   });
// });

// zadanie 6

const empName = document.getElementById("name");
const empSurname = document.getElementById("surname");
const empDep = document.getElementById("department");
const addEmp = document.getElementById("addEmployee");

addEmp.addEventListener("click", () => {
  const employeesRef = collection(db, "employees");
  addDoc(employeesRef, {
    name: empName.value,
    surname: empSurname.value,
    department: empDep.value,
  }).then(() => {
    empName.value = "";
    empSurname.value = "";
    empDep.value = "";

    const userQuery = query(employeesRef, where("department", "==", "IT"));
    getDocs(userQuery).then((docs) => {
      console.log(docs.size);
    });
  });
});

// do roboty 7 i 8
