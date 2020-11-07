import { db } from '../configs/firebase.js';

const addProduct = async (product) => {
  return await db
    .collection('products')
    .doc()
    .set({ ...product, createdAt: Date.now() });
};

const deleteProduct = async (id) => {
  return await db.collection('products').doc(id).delete();
};

const getAllProducts = async (observer) => {
  return await db.collection('products')
      .orderBy('name', 'asc')
      .onSnapshot(observer);
};

const updateProduct = async (currentId, product) => {
  return await db.collection('products').doc(currentId).update(product);
};

export { addProduct, deleteProduct, getAllProducts, updateProduct };
