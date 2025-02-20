// Local Components
import Confirmation from './Confirmation';
import PostForm from './PostForm';

// Local APIs
import { editPost, getAllPosts, deletePost, likePost, getMyPosts, commentPost } from "../api/routes";

// Local Images
import emptyImage from '../images/profile.png'

// External MUI Imports
import { Card, IconButton, Chip, Dialog, Button, TextField } from '@mui/material';
import { Comment, Favorite, Delete, Edit } from '@mui/icons-material';

// External Imports
import { useState } from "react";
import moment from 'moment'
import { setText } from '../redux/snack'
import { setPosts, setUserPosts } from '../redux/posts'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";


function Post({ postData }) {

    
    // --- Local Variables --- //
    let { title, description, date, likes, tags, image, username, _id: id, comments, creatorID } = postData;
    let user = JSON.parse(localStorage.getItem('profile')).account;
    const latestComments = comments.slice(0, 3);
    const imgToUse = image ? image : emptyImage;


    // --- React Hooks --- //
    const [showDelete, setShowDelete]     = useState(false);
    const [showEdit, setShowEdit]         = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentField, setCommentField] = useState("")

    const dispatch = useDispatch()

    // --- Supporting Functions --- //
    const reload = async () => {
        const result = await getMyPosts(user._id)
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

    const onComment = async (e) => {
        e.preventDefault()
        dispatch(setText("Saved Comment"));
        await commentPost(id, { username: user.username, text: commentField })
        setCommentField("")
        reload()
    }


    // --- Style structures --- //
    const descStyle = {
        textAlign: 'left',
        paddingLeft: '20px',
        paddingRight: '20px',
        margin: "5px",
        fontSize: '14px',
    }

    const titleStyle = { color: "black", textDecoration: "none", textAlign: "center", margin: "0px" }
    const buttonPaddingStyle = { marginRight: "7px", marginLeft: "7px" }
    const topStyle = { margin: '3px', textAlign: "center" }
    const iconStyle = { fontSize: "25px" }

    // --- Main Return --- //
    return (
    <>
        <Confirmation onClose={() => setShowDelete(false)} onDelete={onDelete} open={showDelete} id={id} />

        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
            <h1 style={{ textAlign: "center" }}>Edit Post</h1>
            <PostForm onSubmitCall={onEdit} post={postData} />
        </Dialog>


        <Dialog open={showComments} fullWidth={true} onClose={() => setShowComments(false)}>
            <div style={{ textAlign: "center", backgroundColor: "#F8F8F8", margin: "10px", maxHeight: "90%", overflow: "auto" }}>
                {comments.map((comment, id) => (
                    <p key={id} style={descStyle}><b>{comment.username}</b>: {comment.text}</p>))
                }
            </div>
            <form onSubmit={(e) => onComment(e)} >
                <TextField multiline rows={4} style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
                    value={commentField} label="Comment"
                    placeholder="Comment" onChange={(e) => setCommentField(e.target.value)} size="small"
                />
                <Button type="submit" >Post</Button>
            </form>
        </Dialog>

        <Card style={{ position: "relative", height: "100%" }}  >
            <Link style={titleStyle} to={`/post/${id}/`}><p><b>{title}</b></p></Link>
            <Link style={titleStyle} to={`/user/${creatorID}/`}> <p style={topStyle}>{username}</p></Link>
            <p style={topStyle}>{moment(date).format("MMMM Do YYYY, h:mm a")}</p >
            <img src={imgToUse} alt="" width="100%" />

            <div style={{ textAlign: "center" }}>
                <IconButton aria-label="add to favorites" onClick={() => onLike(id)}>
                    <Favorite style={iconStyle} />
                </IconButton>
                <span style={buttonPaddingStyle}></span>
                <IconButton aria-label="add to favorites" onClick={() => setShowComments(true)}>
                    <Comment style={iconStyle} />
                </IconButton>
                {user.username === username && <>
                    <span style={buttonPaddingStyle}></span>
                    <IconButton aria-label="add to favorites" onClick={() => setShowEdit(true)}>
                        <Edit style={iconStyle} />
                    </IconButton>
                    <span style={buttonPaddingStyle}></span>
                    <IconButton aria-label="add to favorites" onClick={() => setShowDelete(true)}>
                        <Delete style={iconStyle} />
                    </IconButton>
                </>}
            </div>

            <p style={descStyle}><b>Description</b>: {description}</p>
            <p style={descStyle}><b>Likes</b>: {likes}</p>

            {comments.length > 3 && <p onClick={() => setShowComments(true)}
                style={{ cursor: "pointer", ...descStyle }}><b>View all {comments.length} comments</b></p>
            }

            <div style={{ textAlign: "center", backgroundColor: "#F8F8F8", margin: "10px" }}>
                {latestComments.map((comment, id) => (
                    <p key={id} style={descStyle}><b>{comment.username}</b>: {comment.text}</p>))
                }
            </div>

            <div style={{ textAlign: "center", marginBottom: "50px" }}>
                {tags[0] !== '' && tags.map((tag, id) => (
                    <Chip key={id} style={{ margin: "5px", textAlign: "center" }} label={tag} variant="Filled" />))
                }
            </div>

        </Card >
    </>
    );
}

export default Post;