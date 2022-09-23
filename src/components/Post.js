import { Card, IconButton, Chip, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import frame from '../images/profile.png'
import moment from 'moment'
import CommentIcon from '@mui/icons-material/Comment';

function Post({ onDelete, onLike, onEdit, postData, isOwner }) {

    const desc = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: "5px",
        fontSize: '14px',
    }

    const intro = {
        margin: '10px'
    }

    const buttonPadding = { marginRight: "7px", marginLeft: "7px" }

    const icon = {
        fontSize: "25px",
    }

    let { title, description, date, likes, tags, image, username, _id: id, creatorID } = postData;
    const imgToUse = image ? image : frame;
    let user = JSON.parse(localStorage.getItem('profile')).account;


    return (
        <Card style={{ position: "relative", height: "100%", backgroundColor: "#fffffd" }}  >
            <h2>{title}</h2>
            <p style={intro}>{username}</p>
            <p style={intro}>{moment(date).format("MMMM Do YYYY, h:mm a")}</p >
            <img src={imgToUse} alt="" width="100%" />
            <br />
            <p style={desc}><b>Description</b>: {description}</p>
            <p style={desc}><b>Likes</b>: {likes}</p>
            {tags[0] !== '' && tags.map((tag, id) => (
                <Chip key ={id} style={{ margin: "5px"}} label={tag} variant="Filled" />))
            }

            <div style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}>

                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <FavoriteIcon style={icon} />
                </IconButton>
                <span style={buttonPadding}></span>

                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <CommentIcon style={icon} />
                </IconButton>


                {isOwner && <>
                    <span style={buttonPadding}></span>

                    <IconButton aria-label="add to favorites" onClick={() => onEdit(id)}>
                        <EditIcon style={icon} />
                    </IconButton>
                    <span style={buttonPadding}></span>
                    <IconButton aria-label="add to favorites" onClick={() => onDelete(id)}>
                        <DeleteIcon style={icon} />
                    </IconButton>
                </>}
            </div>
            <div style={{ marginBottom: "60px" }}></div>

        </Card >
    );
}

export default Post;