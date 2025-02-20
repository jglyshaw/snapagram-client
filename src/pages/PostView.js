// Local Components
import Post from "../components/Post";

// Local APIs
import { getPost } from "../api/routes";

// External Imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PostView() {

    // --- React Hooks --- //
    const [post, setPost] = useState()

    
    const params = useParams();
        // 1. postID: An ID for a specific post

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

    
    // --- Main Return --- //
    return (
    <>

        <div style={{paddingTop: "20px", paddingBottom: "20px", display: "flex", margin:"0 auto",  maxWidth: "80%", width: "500px"}}>
            {post && <Post postData={post} />}
        </div>

    </>
    );
}

export default PostView;