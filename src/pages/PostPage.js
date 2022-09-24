import Post from "../components/Post";
import PostForm from '../components/PostForm';
import Confirmation from "../components/Confirmation";
import { Card, Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import { createPost, editPost, getAllPosts, deletePost, getPosts } from "../api/routes";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { setPosts, setCurrentID, setUserPosts } from '../redux/posts'
import { setShow, setText } from '../redux/snack'

function PostPage() {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const posts = useSelector((state) => state.postReducer.userPosts)
    const currentID = useSelector((state) => state.postReducer.currentID)
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const dispatch = useDispatch()

    let user = JSON.parse(localStorage.getItem('profile')).account;

    const deletePostById = async (id) => {
        dispatch(setText("Post Deleted"));
        await deletePost(currentID)
        setShowDelete(false);
        reload()
    }

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
        reload()
    }

    const reload = async () => {
        const result = await getPosts(user._id)
        const allPosts = await getAllPosts()
        dispatch(setUserPosts(result.data))
        dispatch(setPosts(allPosts.data))
    }

    const onEditPost = async (title, description, image, tags) => {
        dispatch(setText("Post Changed"));
        await editPost(currentID, {
            title: title,
            description: description,
            image: image,
            tags: tags
        })
        setShowEdit(false)
        reload()
    }

    return (
        <div style={backdrop}>
            <Card style={{ marginBottom: "30px", margin: "15px", backgroundColor: "#fffffd" }}>
                {posts !== null && <h3>Posts: {posts.length} </h3>}
                <Button variant="" style={{ marginBottom: "15px" }} onClick={() => { dispatch(setCurrentID(0)); setShowCreate(true) }}>
                    Create new Post</Button>
            </Card>

            <Confirmation onClose={() => setShowDelete(false)} onDelete={deletePostById} open={showDelete} />

            <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
                <h1 style={{ textAlign: "center" }}>Create Post</h1>
                <PostForm onSubmitCall={onAddPost} />
            </Dialog>

            <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
                <h1 style={{ textAlign: "center" }}>Edit Post</h1>
                <PostForm onSubmitCall={onEditPost} />
            </Dialog>

            {posts === null && <CircularProgress />}
            {posts !== null && posts.length === 0 && <h3>You haven't created any posts</h3>}

            <Grid container alignItems="stretch" >
                {posts !== null && posts.map((post, id) => (
                    <Grid item key={id} xs={12} sm={6} md={4} style={{ padding: "15px" }}>
                        <Post
                            onDelete={() => { setShowDelete(true); dispatch(setCurrentID(post._id)) }}
                            onEdit={() => { setShowEdit(true); dispatch(setCurrentID(post._id)) }}
                            postData={post}
                            isOwner={true} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default PostPage;