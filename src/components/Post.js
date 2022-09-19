import { Card, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import frame from '../images/profile.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

function Post({onDelete, onLike, onEdit, id}) {

    const desc = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '15px',
    }
    
    const icon = {
        fontSize: "25px",
    }
    
    const post = useSelector((state) => state.postReducer.value).filter(post => post._id === id)[0]
    let {title, description, date, likes, tags, image} = post;
    const imgToUse = image ? image : frame;
    return (
            <Card style={{height:"100%"}}  >
                <h2>{title}</h2>
                <p>{moment(date).format("MMMM Do YYYY, h:mm a")}</p >
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
                    <DeleteIcon style={icon} />
                </IconButton>
  
                <div style={{marginBottom: "10px"}}></div>
                
            </Card>
    );
}

export default Post;