import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import EditForm from "../components/EditForm";
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
    }

    const likePostById = async (id) => {
        await likePost(id)
        const result = await getPosts()
        setItems(result.data);
    }

    const onAddPost = async (title, description, image) => {
        await createPost({
            title: title,
            description: description,
            image: image
        })
        reload()
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

    const showEditScreen = (id, title, description, image) => {
        dispatch(setCurrentPost({id: id, title: title, description: description, image: image}))
        setShowEdit(true);
    }

    return (
        <div style={backdrop}>
            {showEdit && <EditForm show={showEdit} setShow={setShowEdit} onSubmitCall={onEditPost} title = "hi"/>}
            <PostForm onSubmitCall={onAddPost}/>
            <br />

            <Grid container>
                {items.map((item) => (
                    <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                        <Post title={item.title} description={item.description} id={item._id} date={item.date}
                            onDelete={deletePostById} onLike={likePostById} 
                            onEdit={() => showEditScreen(item._id, item.title, item.description, item.image)}
                            likes={item.likes} image={item.image} />
                    </Grid>
                ))}
            </Grid>

      

          

        </div>
    );
}

export default PostPage;