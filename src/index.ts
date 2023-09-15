// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import _ from "lodash";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6gLCAd3vsb-QYSAFhh_6BjjnruAxlJjI",
  authDomain: "aion-2023.firebaseapp.com",
  projectId: "aion-2023",
  storageBucket: "aion-2023.appspot.com",
  messagingSenderId: "776192316285",
  appId: "1:776192316285:web:f0c60e974ee605ad0a3214"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

$(function() {
  $("body").append($("<div>Hello</div>"))
});
