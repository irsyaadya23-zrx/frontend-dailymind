import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI_DOMAIN",
  projectId: "ISI_PROJECT_ID",
  appId: "ISI_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();