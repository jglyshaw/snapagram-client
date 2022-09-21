import axios from 'axios';

const postUrl = 'https://snapagram-server.herokuapp.com/posts';
const accountUrl = 'https://snapagram-server.herokuapp.com/account';

export const getPosts = (accountID) => axios.get(`${postUrl}/${accountID}`);
export const getAllPosts = () => axios.get(postUrl);
export const createPost = (newPost) => axios.post(postUrl, newPost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postUrl}/like/${id}`);
export const editPost = (id, editPost) => axios.patch(`${postUrl}/edit/${id}`, editPost);

export const signin = (account) => axios.post('https://snapagram-server.herokuapp.com/account/login', account);
export const signup = (account) => axios.post('https://snapagram-server.herokuapp.com/account/signup', account);
