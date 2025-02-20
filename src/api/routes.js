import axios from 'axios';

// Replace with one of the two URLs above whether the server is local or online.
// const baseUrl = 'https://snapagram-server.herokuapp.com';
const baseUrl = 'http://localhost:5000';

const postUrl = `${baseUrl}/posts`

export const getAllPosts   = ()              => axios.get(`${postUrl}/allposts`);
export const getMyPosts    = (accountID)     => axios.get(`${postUrl}/userposts/${accountID}`);
export const getPost       = (id)            => axios.get(`${postUrl}/${id}`);

export const createPost    = (newPost)       => axios.post(postUrl, newPost);
export const deletePost    = (id)            => axios.delete(`${postUrl}/${id}`);
export const likePost      = (id)            => axios.patch(`${postUrl}/like/${id}`);
export const editPost      = (id, editPost)  => axios.patch(`${postUrl}/edit/${id}`, editPost);
export const commentPost   = (id, comment)   => axios.patch(`${postUrl}/comment/${id}`, comment);

export const signin        = (account)       => axios.post(`${baseUrl}/account/login`, account);
export const signup        = (account)       => axios.post(`${baseUrl}/account/signup`, account);
