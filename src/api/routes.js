import axios from 'axios';

const baseUrl = 'https://snapagram-server.herokuapp.com';
const localUrl = 'http://localhost:5000';

const postUrl = `${baseUrl}/posts`

export const getPosts = (accountID) => axios.get(`${postUrl}/userposts/${accountID}`);
export const getPost = (id) => axios.get(`${postUrl}/${id}`);
export const getAllPosts = () => axios.get(`${postUrl}/allposts`);
export const createPost = (newPost) => axios.post(postUrl, newPost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postUrl}/like/${id}`);
export const editPost = (id, editPost) => axios.patch(`${postUrl}/edit/${id}`, editPost);
export const commentPost = (id, comment) => axios.patch(`${postUrl}/comment/${id}`, comment);

export const signin = (account) => axios.post(`${baseUrl}/account/login`, account);
export const signup = (account) => axios.post(`${baseUrl}/account/signup`, account);
