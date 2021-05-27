import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { firebaseConfig } from "../config";

const fire = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default fire;
