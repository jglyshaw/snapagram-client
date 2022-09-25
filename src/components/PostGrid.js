import { Grid, CircularProgress} from '@mui/material/';
import Post from './Post';

function PostGrid({ posts }) {
    return (<>

        {posts === null && <CircularProgress />}

        <Grid container style = {{padding: "20px"}}>
            {posts !== null && posts.map((post, id) => (
                <Grid item key={id} xs={12} sm={6} md={4} style={{ padding: "15px" }}>
                    <Post postData={post} />
                </Grid>
            ))}
        </Grid>

    </>);
}

export default PostGrid;