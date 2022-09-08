import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import EditForm from "../components/EditForm";
import Confirmation from "../components/Confirmation";
import { createPost, editPost } from "../API/api";
import { getPosts, deletePost, likePost } from "../API/api";
import { useDispatch } from 'react-redux'
import { setCurrentPost } from '../redux/posts'

function PostPage() {

    const backdrop = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const [items, setItems] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
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

    const reload = async () => {
        const result = await getPosts()
        setItems(result.data);
    }

    const deletePostById = async (id) => {
        await deletePost(id)
        const result = await getPosts()
        setItems(result.data);
        setShowDelete(false);
    }

    const likePostById = async (id) => {
        await likePost(id)
        const result = await getPosts()
        setItems(result.data);
    }

    const onAddPost = async (title, description, image, tags) => {
        await createPost({
            title: title,
            description: description,
            image: image,
            tags: tags
        })
        reload()
    }

    const onEditPost = async (id, title, description, image, tags) => {
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
        dispatch(setCurrentPost({id: id, title: title, description: description, image: image, tags: tags}))
        setShowEdit(true);
    }

    const showDeleteScreen = (id) => {
        dispatch(setCurrentPost({id: id}));
        setShowDelete(true);
    }

    return (
        <div style={backdrop}>
            {showEdit && <EditForm show={showEdit} setShow={setShowEdit} onSubmitCall={onEditPost}/>}
            {showDelete && <Confirmation onClose = {() => setShowDelete(false)} onDelete= {deletePostById} />}

            <PostForm onSubmitCall={onAddPost}/>
            <br />

            <Grid container alignItems="center">
                {items.map((item, id) => (
                    <Grid key = {id} sm={12} md={4} style={{ padding: "10px" }}>
                        <Post title={item.title} description={item.description} id={item._id} date={item.date}
                            onDelete={() => showDeleteScreen(item._id)} onLike={likePostById} 
                            onEdit={() => showEditScreen(item._id, item.title, item.description, item.image, item.tags.toString())}
                            likes={item.likes} image={item.image} tags={item.tags} />
                    </Grid>
                ))}
            </Grid>

      

          

        </div>
    );
}

export default PostPage;