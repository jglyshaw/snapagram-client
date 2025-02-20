// Local Components
import PostForm from '../components/PostForm';
import PostGrid from '../components/PostGrid';

// Local APIs
import { createPost, getAllPosts, getMyPosts } from "../api/routes";

// External Imports
import { Card, Dialog, Button } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { setPosts, setUserPosts } from '../redux/posts'
import { setText } from '../redux/snack'

function PostPage() {

    // --- Local Variables --- //
    let user = JSON.parse(localStorage.getItem('profile')).account;

    // --- React Hooks --- //
    const [showCreate, setShowCreate] = useState(false);
    const posts = useSelector((state) => state.postReducer.userPosts)
    const dispatch = useDispatch()

    // --- Supporting Functions --- //
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
      
        const result = await getMyPosts(user._id)
        const allPosts = await getAllPosts()
        dispatch(setUserPosts(result.data))
        dispatch(setPosts(allPosts.data))
    }

    // --- Main Return --- //
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