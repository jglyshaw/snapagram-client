import { Card, IconButton, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import frame from '../profile.png'


function Post({ title, description, onDelete, onLike, onEdit, image, tags, id, likes, date }) {

    const desc = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '15px'
    }
    
    const icon = {
        fontSize: "25px",
    }

    const imgToUse = image ? image : frame;
    return (
        <>
            <Card sx={{ minWidth: 200 }}  >
                <h2>{title}</h2>
                <p>{date.toString()}</p >
                <img src={imgToUse} alt="" width="200px" />
                <p style={desc}><b>Description</b>: {description}</p>
                <p style={desc}><b>Likes</b>: {likes}</p>
                {tags.length > 0 && tags[0] !== '' && <p style={desc}><b>Tags</b>:</p>}
                <p style={{ color: "blue" }}>
                    {tags[0] !== '' && tags.map((tag, id) => (
                        <span key={id}>#{tag} </span>))
                    }
                </p>


                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <FavoriteIcon style={icon}/>
                </IconButton>
                <span style={{marginRight: "10px", marginLeft: "10px"}}></span>
                <IconButton aria-label="add to favorites" onClick={() => onEdit(id)}>
                    <EditIcon  style={icon}/>
                </IconButton>
                <span style={{marginRight: "10px", marginLeft: "10px"}}></span>
                <IconButton aria-label="add to favorites" onClick={() => onDelete(id)}>
                    <DeleteForeverIcon style={icon} />
                </IconButton>
  
                <div style={{marginBottom: "10px"}}></div>
                
            </Card>

        </>
    );
}

export default Post;