import axios from 'axios';

const url = 'http://localhost:3300/cart';

export const getCarts = () => axios.get('http://localhost:3300/cart');
export const createCart = (newPost) => axios.post(url, newPost);
export const deleteCart = (id) => axios.delete(`${url}/${id}`);