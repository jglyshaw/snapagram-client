import { useState } from "react";
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import formStyle from '../style/form.css'

function PostForm({onSubmitCall}) {
    
    const currentID = useSelector((state) => state.postReducer.currentID)
    const currentPost = useSelector((state) => state.postReducer.value).filter(post => post._id === currentID)[0]

    const [titleField, setTitleField] = useState(currentPost ? currentPost.title : "")
    const [imageField, setImageField] = useState(currentPost ? currentPost.image : "")
    const [descriptionField, setDescriptionField] = useState(currentPost ? currentPost.description : "")
    const [tagField, setTagField] = useState(currentPost ? currentPost.tags.toString() : "")
    const [showAlert, setAlert] = useState(false);

    const inputStyle = {
        marginBottom: "25px"
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (descriptionField === "" || titleField === "") {
            setAlert(true)
            return;
        }
        
        onSubmitCall(titleField, descriptionField, imageField, tagField ? tagField.split(',') : [])
        setDescriptionField("")
        setTitleField("")
        setImageField("")
        setTagField("")
        setAlert(false)

    }
    return ( <>
    
    <form onSubmit={(e) => onSubmit(e)} style={{ backgroundColor: "white", padding: "15px" }}>
            {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
            <br />
            <Grid container>
                <label>Title</label>
                <input style = {inputStyle} type='text' placeholder='' value={titleField} onChange={(e) => setTitleField(e.target.value)} />
                <label>Description</label>
                <input style = {inputStyle} type='text' placeholder='' value={descriptionField} onChange={(e) => setDescriptionField(e.target.value)} />
                <label>Image</label>
                <input style = {inputStyle} type='text' placeholder='' value={imageField} onChange={(e) => setImageField(e.target.value)} />
                <label>Tags</label>
                <input style = {inputStyle} type='text' placeholder='' value={tagField} onChange={(e) => setTagField(e.target.value)} />
                <input type='submit' value='Save Post' className='btn btn-block' />
            </Grid>
        </form>
    </> );
}

export default PostForm;