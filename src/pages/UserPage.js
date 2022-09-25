import { useParams } from "react-router-dom";
import PostGrid from "../components/PostGrid";
import { useSelector } from 'react-redux'

function UserPage() {
    const params = useParams();
    const posts = useSelector((state) => state.postReducer.value)
    return (
        <>
            {posts && <PostGrid posts={posts.filter((item) => item.creatorID === params.userID)}/>}
        </>
    );
}

export default UserPage;