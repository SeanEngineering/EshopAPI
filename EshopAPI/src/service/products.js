/** @format */

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import db from '../config/firebase';

export const getProducts = async () => {
  const collectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((rawDocs) => {
    return { id: rawDocs.id, ...rawDocs.data() };
  });
};

export const addProduct = async (productData) => {
  const { category, description, image, manufacturer, name, price } =
    productData;
  const newProduct = {
    category,
    description,
    image,
    manufacturer,
    name,
    price,
    favourite: false,
  };
  const collectionRef = collection(db, 'products');
  console.log(newProduct);
  console.log(collectionRef);
  const newDoc = await addDoc(collectionRef, newProduct);
  return newDoc;
};

export const getProductById = async (id) => {
  const docRef = doc(db, 'products', id);
  const querySnapshot = await getDocs(docRef);
  if (!querySnapshot.exists()) {
    throw new Error(`Product ${id} does not exist`);
  }
  return { id: querySnapshot.id, ...querySnapshot.data() };
};
