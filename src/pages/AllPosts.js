// Local Components
import PostGrid from "../components/PostGrid";

// External Imports
import { useSelector } from 'react-redux'

function AllPosts() {

  // --- React Hooks --- //
  const posts = useSelector((state) => state.postReducer.value)

  // --- Main Return --- //
  return (
  <>
    <div>
      <PostGrid posts={posts} />
    </div>
  </>
  );
  
}
export default AllPosts;