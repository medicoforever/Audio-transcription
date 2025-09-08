// 1. SET UP FIREBASE: Go to https://console.firebase.google.com/
// 2. Create a new project.
// 3. Go to Project Settings -> General tab.
// 4. Under "Your apps", click the web icon (</>) to register a new web app.
// 5. After registering, you'll see a firebaseConfig object. Copy its contents here.
// 6. SET UP AUTHENTICATION: In the Firebase console, go to Build -> Authentication -> Sign-in method.
// 7. Enable the "Google" provider.
// 8. FIND CLIENT ID: Go to Project Settings -> General. Scroll down to find your SDK setup and configuration. Your Web client ID for Google Sign-In is listed here. Copy it to `googleClientId` below.

export const firebaseConfig = {
  // PASTE YOUR FIREBASE CONFIG OBJECT HERE
  apiKey: "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef",

  // PASTE YOUR GOOGLE WEB CLIENT ID FOR GOOGLE SIGN-IN HERE
  googleClientId: "123456789012-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
};
