import Post from "../components/Post";
import FormBase from '../components/FormBase';
import Confirmation from "../components/Confirmation";
import { Card, Snackbar, Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import { createPost, editPost, getPosts, deletePost, likePost } from "../API/api";
import { useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { setCurrentPost } from '../redux/posts'

function PostPage() {
    const backdrop = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const [items, setItems] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPosts()
                setItems(result.data);
            } catch (error) {
                console.log(error)
                alert("could not load data")
            }
        };
        fetchData();
    }, []);

    const deletePostById = async (id) => {
        setSnackText("Post deleted")
        setShowSnack(true)
        await deletePost(id)
        setShowDelete(false);
        reload()
    }

    const likePostById = async (id) => {
        await likePost(id)
        reload()
    }

    const onAddPost = async (id, title, description, image, tags) => {
        setShowCreate(false)
        setSnackText("Post created")
        setShowSnack(true)
        await createPost({
            title: title,
            description: description,
            image: image,
            tags: tags
        })
        reload()
    }

    const reload = async () => {
        const result = await getPosts()
        setItems(result.data);
    }

    const onEditPost = async (id, title, description, image, tags) => {
        setSnackText("Updated post")
        setShowSnack(true)
        await editPost(id, {
            title: title,
            description: description,
            image: image,
            tags: tags
        })
        setShowEdit(false)
        reload()
    }

    const showEditScreen = (id, title, description, image, tags) => {
        dispatch(setCurrentPost({ id: id, title: title, description: description, image: image, tags: tags }))
        setShowEdit(true);
    }

    const showDeleteScreen = (id) => {
        dispatch(setCurrentPost({ id: id }));
        setShowDelete(true);
    }

    const showAddScreen = () => {
        dispatch(setCurrentPost({}));
        setShowCreate(true)
    }

    return (
        <div style={backdrop}>
            <Card style = {{marginBottom: "30px"}}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" 
                >
                    <Grid item sm={4}> <h1>Your Posts</h1> </Grid>
                    <Grid item sm={4}><Button variant="contained" onClick={() => showAddScreen()}>Create new Post</Button></Grid>
                    <Grid item sm={4}> {items !== null && <h2>Posts: {items.length} </h2>} </Grid>
                </Grid>
            </Card>

            <Snackbar
                open={showSnack}
                onClose={() => setShowSnack(false)}
                autoHideDuration={2000}
                message={snackText}
            />

            <Confirmation onClose={() => setShowDelete(false)} onDelete={deletePostById} open={showDelete} />

            <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
                <h1 style={{ textAlign: "center" }}>Create Post</h1>
                <FormBase onSubmitCall={onAddPost} />
            </Dialog>

            <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
                <h1 style={{ textAlign: "center" }}>Edit Post</h1>
                <FormBase onSubmitCall={onEditPost} />
            </Dialog>

            {items === null && <CircularProgress />}
            {items !== null && items.length === 0 && <h3>You haven't created any posts</h3>}

            <Grid container alignItems="center">
                {items !== null && items.map((item, id) => (
                    <Grid item key={id} sm={12} md={4} style={{ padding: "10px" }}>
                        <Post
                            onDelete={() => showDeleteScreen(item._id)}
                            onLike={likePostById}
                            onEdit={() => showEditScreen(item._id, item.title, item.description, item.image, item.tags.toString())}
                            title={item.title} description={item.description} id={item._id} date={item.date}
                            likes={item.likes} image={item.image} tags={item.tags} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default PostPage;