/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: 'AIzaSyCVp2oB32pTmvPltoJYCcyD6QqhL0bgtRI',
  authDomain: 'graphql-9fed6.firebaseapp.com',
  projectId: 'graphql-9fed6',
  storageBucket: 'graphql-9fed6.appspot.com',
  messagingSenderId: '570914250629',
  appId: '1:570914250629:web:2ac7e0d3a9f5e35dce6eec',
  measurementId: 'G-GK3FXJPKRS',
};

const isValidEmail = (email: string) => {
  return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
};

const isValidPassword = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      toast.error('Wrong password!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  if (isValidEmail(email) === true) {
    if (isValidPassword(password) === true) {
      toast.success(
        'You have successfully registered! You will be automatically redirected to the main page.',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name,
          authProvider: 'local',
          email,
        });
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    } else {
      toast.error(
        'Weak password The password must contain at least 8 characters, at least one capital letter, one number, one special character.',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  } else {
    toast.error('Email does not correct', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
};
