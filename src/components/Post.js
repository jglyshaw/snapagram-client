
import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import frame from '../profile.png'



function Post({ title, description, onDelete, id, likes}) {

    const desc = {
        textAlign: 'left',
        padding: '20px'
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <Button onClick={() => onDelete(id)}>Delete</Button>
                <h1>{title}</h1>
                <img src = {frame} alt = "could not load" width = "300px"/>
                <p style = {desc}><b>Description</b>: {description}</p>
                <p style = {desc}><b>Likes</b>: {likes}</p>
            </Card>

        </>
    );
}

export default Post;