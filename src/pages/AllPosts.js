import Post from "../components/Post";
import { Grid, CircularProgress, Dialog, Button } from '@mui/material/';
import { useSelector } from 'react-redux'

function AllPosts() {
    const backdrop = {
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
    }
    const posts = useSelector((state) => state.postReducer.value)

    return (
        <div style={backdrop}>
            {posts === null && <CircularProgress />}
            <Grid container>
                {posts !== null && posts.map((post, id) => (
                    <Grid item key={id} xs={12} sm={6} md={4} style={{ padding: "15px" }}>
                        <Post postData={post} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AllPosts;