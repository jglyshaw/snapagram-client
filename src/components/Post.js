import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import frame from '../profile.png'


function Post({ title, description, onDelete, onLike, onEdit, image, tags, id, likes, date}) {

    const desc = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px'
    }
    const imgToUse = image ? image : frame;
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <h1>{title}</h1>
                <p>{date.toString()}</p >
                <img src = {imgToUse} alt = "could not load image" width = "300px"/>
                <p style = {desc}><b>Description</b>: {description}</p>
                <p style = {desc}><b>Likes</b>: {likes}</p>
                {tags.length > 0 && tags[0] !== '' &&  <p style = {desc}><b>Tags</b>:</p>}
                <p style={{color: "blue"}}>
                {tags[0] !== '' && tags.map((tag, id) => (
                    <span key={id}>#{tag} </span> ))
                }
                </p>
                <Button onClick={() => onLike(id)}>Like</Button>
                <Button onClick= {() => onEdit(true)}>Edit</Button>
                <Button onClick={() => onDelete(id)}>Delete</Button>
            </Card>

        </>
    );
}

export default Post;