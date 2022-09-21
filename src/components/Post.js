import { Card, IconButton, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import frame from '../images/profile.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

function Post({ onDelete, onLike, onEdit, postData, isOwner }) {

    const desc = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '14px',
    }

    const buttonPadding = { marginRight: "15px", marginLeft: "15px" }

    const icon = {
        fontSize: "25px",
    }

    let { title, description, date, likes, tags, image, username, _id: id } = postData;
    const imgToUse = image ? image : frame;

    return (
        <Card style={{ position: "relative", height: "100%" }}  >
            <h2>{title}</h2>
            <p>{username}</p>
            <p>{moment(date).format("MMMM Do YYYY, h:mm a")}</p >
            <img src={imgToUse} alt="" width="250px" />
            <p style={desc}><b>Description</b>: {description}</p>
            <p style={desc}><b>Likes</b>: {likes}</p>
            {tags.length > 0 && tags[0] !== '' && <p style={desc}><b>Tags</b>:</p>}
            <p style={{ color: "blue", fontSize: "13px", margin: 0 }}>
                {tags[0] !== '' && tags.map((tag, id) => (
                    <span key={id}>#{tag} </span>))
                }
            </p>

            <div style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}>

            {! isOwner && <>
                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <FavoriteIcon style={icon} />
                </IconButton> </>}
                {isOwner && <>

                
                    <IconButton aria-label="add to favorites" onClick={() => onEdit(id)}>
                        <EditIcon style={icon} />
                    </IconButton> </>}
                    {isOwner && <>
                <span style={buttonPadding}></span>
                
                    <IconButton aria-label="add to favorites" onClick={() => onDelete(id)}>
                        <DeleteIcon style={icon} />
                    </IconButton> </>}
            </div>
            <div style={{ marginBottom: "60px" }}></div>

        </Card>
    );
}

export default Post;