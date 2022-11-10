/** @format */

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { createContext } from 'react';
import db from '../config/firebase';

export const getProducts = async () => {
  const collectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((rawDocs) => {
    return { id: rawDocs.id, ...rawDocs.data() };
  });
};

export const getCart = async () => {
  const collectionRef = collection(db, 'cart');
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((rawDocs) => {
    return { id: rawDocs.id, ...rawDocs.data() };
  });
};

export const addToCart = async (identification, qty) => {
  const compareItem = await getProductById(identification);
  const currentCart = await getCart();
  const cartIds = currentCart.map((item) => item.id);
  if (cartIds.includes(identification)) {
    console.log('in cart');
    const docRef = doc(db, 'cart', identification);
    console.log(docRef);
    await updateDoc(docRef, { quantity: increment(qty) });
    return true;
  } else {
    compareItem.quantity = qty;
    const newDoc = await setDoc(doc(db, 'cart', identification), compareItem);
    console.log('Item was added');
    console.log(newDoc);
    return newDoc;
  }
};

export const changeToFavourite = async (id) => {
  const product = await getProductById(id);
  console.log(product);
  const docRef = doc(db, 'products', id);
  console.log(docRef);
  if (!product.favourite) {
    await updateDoc(docRef, { favourite: true });
  } else {
    await updateDoc(docRef, { favourite: false });
  }
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
  const querySnapshot = await getDoc(docRef);
  if (!querySnapshot.exists()) {
    throw new Error(`Product ${id} does not exist`);
  }
  return { id: querySnapshot.id, ...querySnapshot.data() };
};

export const getCartProductById = async (id) => {
  const docRef = doc(db, 'cart', id);
  const querySnapshot = await getDoc(docRef);
  if (!querySnapshot.exists()) {
    return;
  }
  return { id: querySnapshot.id, ...querySnapshot.data() };
};

export const getProductBySearchTerm = async (terms) => {
  const searchTerms = terms.toLowerCase().split('+');
  console.log(searchTerms);
  let searchTermArray = [];
  const productList = await getProducts();

  for (let product of productList) {
    for (let term of searchTerms) {
      if (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.manufacturer.toLowerCase().includes(term)
      ) {
        searchTermArray.push(product);
        break;
      }
    }
  }

  return searchTermArray;
};

export const getProductByFavourites = async () => {
  const productList = await getProducts();

  return productList.filter((product) => product.favourite == true);
};

export const deleteCartProductById = async (id) => {
  const docRef = doc(db, 'cart', id);
  await deleteDoc(docRef);
};

export const getProductByCategory = async (category) => {
  const productList = await getProducts();
  const catProducts = productList.filter((item) => item.category == category);
  return catProducts;
};

export const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const cartContext = createContext();

export const searchContext = createContext();
