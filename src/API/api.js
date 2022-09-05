import axios from 'axios';

const url = 'http://localhost:3300/cart';

export const fetchPosts = () => axios.get('http://localhost:3300/cart');