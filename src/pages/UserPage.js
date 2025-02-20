// Local Components
import PostGrid from "../components/PostGrid";

// External Imports
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

function UserPage() {

    // --- React Hooks --- //
    const params = useParams();
        // 1. userID: An ID for a specific user

    const posts = useSelector((state) => state.postReducer.value)


    // --- Main Return --- //
    return (
    <>

        {posts && <PostGrid posts={posts.filter((item) => item.creatorID === params.userID)}/>}
            
    </>
    );
}

export default UserPage;