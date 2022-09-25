import PostForm from '../components/PostForm';
import PostGrid from '../components/PostGrid';
import { Card, Dialog, Button } from '@mui/material/';
import { createPost, getAllPosts, getPosts } from "../api/routes";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { setPosts, setUserPosts } from '../redux/posts'
import {  setText } from '../redux/snack'

function PostPage() {

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
       <>
            <Card style={{ marginBottom: "30px", margin: "15px", textAlign: "center" }}>
                {posts !== null && <h3>Posts: {posts.length} </h3>}
                <Button variant="contained" style={{ marginBottom: "15px" }} onClick={() => { setShowCreate(true) }}>
                    Create new Post</Button>
            </Card>

            <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
                <h1 style={{ textAlign: "center" }}>Create Post</h1>
                <PostForm onSubmitCall={onAddPost} />
            </Dialog>

            {posts !== null && posts.length === 0 && <h3>You haven't created any posts</h3>}
            <PostGrid posts={posts} />

       
        </>
    );
}

export default PostPage;