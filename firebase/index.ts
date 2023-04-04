import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  User
} from "firebase/auth"

import confJson from '../redux/api/configuration.json'

const config: { [key: string]: {} } = {
  "development": {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyDSiJPdanhy4qfYV7NzB7cSeQXwDFFvIJk",
    authDomain: "auth-portale-dev.firebaseapp.com",
    projectId: "auth-portale-dev",
    storageBucket: "auth-portale-dev.appspot.com",
    messagingSenderId: "126496678682",
    appId: "1:126496678682:web:0f18704afe369eebb302a3",
    measurementId: "G-EBGER58774"
  },
  "test": {
    apiKey: "AIzaSyDIgz_N8CIHjUh1f_KW5VHEDPc5O88giKA",
    authDomain: "auth-portale-test.firebaseapp.com",
    projectId: "auth-portale-test",
    storageBucket: "auth-portale-test.appspot.com",
    messagingSenderId: "791680188768",
    appId: "1:791680188768:web:8fe0223c32494a26941e05",
    measurementId: "G-8NDVCC2XT7"
  },
  "production": {
    apiKey: "AIzaSyDZ7GgXi6-OlzmVE3qUgyUWoBHDvxSyctQ",
    authDomain: "auth-portale-prod.firebaseapp.com",
    projectId: "auth-portale-prod",
    storageBucket: "auth-portale-prod.appspot.com",
    messagingSenderId: "728580019584",
    appId: "1:728580019584:web:ff5865c0cd53623ac05d65",
    measurementId: "G-H02NPG5Y3K"
  }
}

export const loginArgs = {
  email: "funnel@covercare.it",
  password: "!g9h._hR",
}

export const FirebaseErrorMessagesIt = {
  'Firebase: Error (auth/too-many-requests).': "L'accesso a questo account è stato temporaneamente disabilitato a causa di troppi tentativi falliti di login. Puoi ripristinarlo immediatamente reimpostando la password o puoi provare nuovamente più tardi.",
  'Firebase: Error (auth/wrong-password).': "La password inserita non è valida.",
  'Firebase: Error (auth/user-not-found).': "L'email inserita non risulta essere registrata.",
}

const app = initializeApp(config[confJson.env])
export const auth = getAuth(app)

export const signIn = (email: string, password: string) => { 
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        resolve(user)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getCurrentUser = () => {
  return new Promise<User>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe()
      resolve(userAuth!)
    }, reject)
  })
}

export const userSignOut = () => signOut(auth)