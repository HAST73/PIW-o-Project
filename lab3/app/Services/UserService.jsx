import { auth, googleProvider } from './init';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider).then(res => res.user);

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = () => signOut(auth);

export const onUserChanged = (callback) => onAuthStateChanged(auth, callback);
