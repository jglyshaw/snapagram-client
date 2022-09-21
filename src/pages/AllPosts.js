import Post from "../components/Post";
import PostForm from '../components/PostForm';
import Confirmation from "../components/Confirmation";
import { Card, Snackbar, Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import { createPost, editPost, getPosts, deletePost, likePost, getAllPosts } from "../api/routes";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setPosts, setCurrentID, setUserPosts} from '../redux/posts'


function AllPosts() {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer.value)

    const likePostById = async (id) => {
        await likePost(id)
        const allPosts = await getAllPosts()
        dispatch(setPosts(allPosts.data))
    }

    return (
        <div style={backdrop}>
            <Grid container alignItems="stretch" >
                {posts !== null && posts.map((post, id) => (
                    <Grid item key={id} xs={12} sm={6} md={4} style={{ padding: "10px", height: "100" }}>
                        <Post 
                            onDelete={() => {  }}
                            onLike={(id) => {likePostById(id)}}
                            onEdit={() => { }}
                            postData={post} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AllPosts;