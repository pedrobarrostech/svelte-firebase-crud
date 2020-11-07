import { db } from '../configs/firebase.js';

const addOrder = async (order) => {
  return await db
    .collection('orders')
    .doc()
    .set({ ...order, createdAt: Date.now() });
};

const deleteOrder = async (id) => {
  return await db.collection('orders').doc(id).delete();
};

const getAllOrders = async (observer) => {
  return await db.collection('orders')
      .onSnapshot(observer);
};

const updateOrder = async (currentId, order) => {
  return await db.collection('orders').doc(currentId).update(order);
};

export { addOrder, deleteOrder, getAllOrders, updateOrder };
