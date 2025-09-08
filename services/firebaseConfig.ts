// 1. SET UP FIREBASE: Go to https://console.firebase.google.com/
// 2. Create a new project.
// 3. Go to Project Settings -> General tab.
// 4. Under "Your apps", click the web icon (</>) to register a new web app.
// 5. After registering, you'll see a firebaseConfig object. Copy its contents here.
// 6. SET UP AUTHENTICATION: In the Firebase console, go to Build -> Authentication -> Sign-in method.
// 7. Enable the "Google" provider.
// 8. FIND CLIENT ID: Go to Project Settings -> General. Scroll down to find your SDK setup and configuration. Your Web client ID for Google Sign-In is listed here. Copy it to `googleClientId` below.

export const firebaseConfig = {
 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsvaphTIz261oTCBLE9pd7sc6q4WxavCs",
  authDomain: "lkmkbgndkb.firebaseapp.com",
  projectId: "lkmkbgndkb",
  storageBucket: "lkmkbgndkb.firebasestorage.app",
  messagingSenderId: "1087976758964",
  appId: "1:1087976758964:web:fa742ebbd4063bdd3f41e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  // PASTE YOUR GOOGLE WEB CLIENT ID FOR GOOGLE SIGN-IN HERE
  googleClientId: "1087976758964-0dfeh4n99t0io2m4efsbhkrllu68s7lb.apps.googleusercontent.com",
};
