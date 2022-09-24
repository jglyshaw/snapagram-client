import { Card, IconButton, Chip, Dialog } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import emptyImage from '../images/profile.png'
import moment from 'moment'
import PostForm from './PostForm';
import CommentIcon from '@mui/icons-material/Comment';
import Confirmation from './Confirmation';
import { useState } from "react";
import { editPost, getAllPosts, deletePost, likePost, getPosts, commentPost } from "../api/routes";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { setText } from '../redux/snack'
import { setPosts, setUserPosts } from '../redux/posts'
import scrollCSS from "../style/scroll.css"

function Post({ postData }) {
    let { title, description, date, likes, tags, image, username, _id: id, comments } = postData;
    let user = JSON.parse(localStorage.getItem('profile')).account;
    const dispatch = useDispatch()

    const imgToUse = image ? image : emptyImage;
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const descStyle = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: "5px",
        fontSize: '14px',
    }

    const titleStyle = { color: "black", textDecoration: "none", textAlign: "center", margin: "5px" }
    const buttonPadding = { marginRight: "7px", marginLeft: "7px" }
    const topStyle = { margin: '5px', textAlign: "center" }
    const iconStyle = { fontSize: "25px" }

    const reload = async () => {
        const result = await getPosts(user._id)
        const allPosts = await getAllPosts()
        dispatch(setUserPosts(result.data))
        dispatch(setPosts(allPosts.data))
    }

    const onLike = async () => {
        dispatch(setText("Post Liked"));
        await likePost(id)
        reload()
    }

    const onDelete = async () => {
        dispatch(setText("Post Deleted"));
        await deletePost(id)
        setShowDelete(false);
        reload()
    }

    const onEdit = async (title, description, image, tags) => {
        dispatch(setText("Post Changed"));
        await editPost(id, {
            title: title,
            description: description,
            image: image,
            tags: tags
        })
        setShowEdit(false)
        reload()
    }

    const onComment = async () => {
        dispatch(setText("Saved Comment"));
        await commentPost(id, {username: user.username, text: "hello"})
        setShowEdit(false)
        reload()
    }


    return (<>
        <Confirmation onClose={() => setShowDelete(false)} onDelete={onDelete} open={showDelete} id = {id} />
        
        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <h1 style={{ textAlign: "center" }}>Edit Post</h1>
            <PostForm onSubmitCall={onEdit} id={id} />
        </Dialog>

        <Card style={{ position: "relative", height: "100%"}}  >
            <Link  style={titleStyle}to={`/post/${id}/`}><h2 style={titleStyle}>{title}</h2></Link>
            <p style={topStyle}>{username}</p>
            <p style={topStyle}>{moment(date).format("MMMM Do YYYY, h:mm a")}</p >
            <img src={imgToUse} alt="" width="100%" />
            <br />
            <p style={descStyle}><b>Description</b>: {description}</p>
            <p style={descStyle}><b>Likes</b>: {likes}</p>
            <p style={descStyle}><b>Comments</b>: {comments.length}</p>

            <div style={{ textAlign: "center", backgroundColor: "#FFFAF9", margin: "20px", overflow: "auto", maxHeight: "100px"}}>
                {comments.map((comment, id) => (
                    <p key = {id} style={descStyle}><b>{comment.username}</b>: {comment.text}</p>))
                }
            </div>

            <div style={{ textAlign: "center" }}>
                {tags[0] !== '' && tags.map((tag, id) => (
                    <Chip key={id} style={{ margin: "5px", textAlign: "center" }} label={tag} variant="Filled" />))
                }
            </div>

            <div style={{ marginBottom: "60px" }}></div>

            <div style={{ position: "absolute", textAlign: "center", bottom: 10, left: 0, right: 0 }}>
                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <FavoriteIcon style={iconStyle} />
                </IconButton>
                <span style={buttonPadding}></span>
                <IconButton aria-label="add to favorites" onClick={() => onComment(id)}>
                    <CommentIcon style={iconStyle} />
                </IconButton>
                {user.username === username && <>
                    <span style={buttonPadding}></span>

                    <IconButton aria-label="add to favorites" onClick={() => setShowEdit(true)}>
                        <EditIcon style={iconStyle} />
                    </IconButton>
                    <span style={buttonPadding}></span>
                    <IconButton aria-label="add to favorites" onClick={() => setShowDelete(true)}>
                        <DeleteIcon style={iconStyle} />
                    </IconButton>
                </>}
            </div>
        </Card >
    </>
    );
}

export default Post;