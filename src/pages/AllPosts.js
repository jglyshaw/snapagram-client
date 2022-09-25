import PostGrid from "../components/PostGrid";
import { useSelector } from 'react-redux'

function AllPosts() {
    const backdrop = {
    
    }
    const posts = useSelector((state) => state.postReducer.value)

    return (
        <div style={backdrop}>
            <PostGrid posts={posts}/>
        </div>
    );
}
export default AllPosts;