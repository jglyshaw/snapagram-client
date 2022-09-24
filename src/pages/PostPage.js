import Post from "../components/Post";
import PostForm from '../components/PostForm';
import { Card, Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import { createPost, getAllPosts, getPosts } from "../api/routes";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { setPosts, setUserPosts } from '../redux/posts'
import {  setText } from '../redux/snack'

function PostPage() {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }

    const posts = useSelector((state) => state.postReducer.userPosts)
    const [showCreate, setShowCreate] = useState(false);
    const dispatch = useDispatch()

    let user = JSON.parse(localStorage.getItem('profile')).account;

    const onAddPost = async (title, description, image, tags) => {
        dispatch(setText("Post Created"));
        setShowCreate(false)
        await createPost({
            title: title,
            description: description,
            image: image,
            tags: tags,
            creatorID: user._id,
            username: user.username
        })
      
        const result = await getPosts(user._id)
        const allPosts = await getAllPosts()
        dispatch(setUserPosts(result.data))
        dispatch(setPosts(allPosts.data))
    }

    return (
        <div style={backdrop}>
            <Card style={{ marginBottom: "30px", margin: "15px" }}>
                {posts !== null && <h3>Posts: {posts.length} </h3>}
                <Button variant="contained" style={{ marginBottom: "15px" }} onClick={() => { setShowCreate(true) }}>
                    Create new Post</Button>
            </Card>

            <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
                <h1 style={{ textAlign: "center" }}>Create Post</h1>
                <PostForm onSubmitCall={onAddPost} />
            </Dialog>

            {posts === null && <CircularProgress />}
            {posts !== null && posts.length === 0 && <h3>You haven't created any posts</h3>}

            <Grid container alignItems="stretch" >
                {posts !== null && posts.map((post, id) => (
                    <Grid item key={id} xs={12} sm={6} md={4} style={{ padding: "15px" }}>
                        <Post postData={post}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default PostPage;