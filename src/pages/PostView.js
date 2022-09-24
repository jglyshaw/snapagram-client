import { useParams } from "react-router-dom";
import { createPost, editPost, getAllPosts, deletePost, likePost, getPosts, getPost } from "../api/routes";
import { useEffect, useState } from "react";
import { Card, Snackbar, Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import Post from "../components/Post";

function PostView() {
    const params = useParams();


    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getPost(params.postId)
                setPost(result.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [params.postId]);

    const [post, setPost] = useState()

    return (<>
        <div style={{paddingTop: "20px", paddingBottom: "20px", display: "flex", margin:"0 auto",  maxWidth: "80%", width: "500px"}}>
            {post && <Post postData={post} />}
        </div>
    </>);
}

export default PostView;