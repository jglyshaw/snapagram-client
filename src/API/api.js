import axios from 'axios';

const url = 'http://localhost:3300/posts';

export const getPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);