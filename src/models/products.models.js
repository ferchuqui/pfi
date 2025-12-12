import { db } from "../data/data.js";
import { collection, addDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

const COLLECTION_NAME = "products";

export const agregarProducto = async (product) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error al agregar producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

export const obtenerProductos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const obtenerProducto = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};