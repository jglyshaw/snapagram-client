import axios from 'axios';

const url = 'https://snapagram-server.herokuapp.com/posts';

export const getPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/like/${id}`);
export const editPost = (id, editPost) => axios.patch(`${url}/edit/${id}`, editPost);