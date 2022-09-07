import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Post from "../components/Post";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostForm from "../components/PostForm";
import EditPost from "../components/EditPost";
import { createPost, editPost } from "../API/api";
import { getPosts, deletePost, likePost } from "../API/api";
import { useDispatch } from 'react-redux'
import { setID } from '../redux/posts'

function PostPage() {


    const backdrop = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
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

    const reload = async (id) => {
        const result = await getPosts()
        setItems(result.data);
    }

    const deletePostById = async (id) => {
        await deletePost(id)
        const result = await getPosts()
        setItems(result.data);
    }

    const likePostById = async (id) => {
        await likePost(id)
        const result = await getPosts()
        setItems(result.data);
    }

    const handleClose = async (id) => {
        setOpen(false)
    }

    const handleOpenEdit = (id) => {
        dispatch(setID(id))
        setShowEdit(true);
    }

    const onAddPost = async (title, description, image) => {
        await createPost({
            title: title,
            description: description,
            image: image
        })
    }

    const onEditPost = async (id, title, description, image) => {
        await editPost(id, {
            title: title,
            description: description,
            image: image
        })
        setShowEdit(false)
        reload()
    }

    return (
        <div style={backdrop}>
            <EditPost show={showEdit} setShow={setShowEdit} onSubmitCall={onEditPost} />
            <PostForm onSubmitCall={onAddPost} newPost={true}/>
            <br />

            <Grid container>
                {items.map((item) => (
                    <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                        <Post title={item.title} description={item.description} id={item._id} date={item.date}
                            onDelete={deletePostById} onLike={likePostById} onEdit={() => handleOpenEdit(item._id)}
                            likes={item.likes} image={item.image} />
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={open}
                onClose={deletePostById}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    Delete Post?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default PostPage;