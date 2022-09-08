import { useState } from "react";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { Dialog } from "@mui/material";
import { useSelector } from 'react-redux'
import css from './form.css'


function EditForm({ show, setShow, onSubmitCall}) {
    const currentPost = useSelector((state) => state.posts.value)
    const onSubmit = async (e) => {
        e.preventDefault()

        if (descriptionField === "" || titleField === "") {
            setAlert(true)
            return;
        }
        onSubmitCall(currentPost.id, titleField, descriptionField, imageField, tagField.split(','))
        setShow(false)
        setDescriptionField("")
        setTitleField("")
        setImageField("")
        setTagField("")
        setAlert(false)
    }

    const [titleField, setTitleField] = useState(currentPost ? currentPost.title : "")
    const [imageField, setImageField] = useState(currentPost ? currentPost.image : "")
    const [descriptionField, setDescriptionField] = useState(currentPost ? currentPost.description : "")
    const [tagField, setTagField] = useState(currentPost ? currentPost.tags : "")
    const [showAlert, setAlert] = useState(false);

    return (<>
        <Dialog open={show} onClose={() => setShow(false)}>
            <form onSubmit={(e) => onSubmit(e)} style={{ backgroundColor: "white", padding: "15px" }}>
                {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
                <br />
                <Grid container>
                    <label>Title</label>
                    <input type='text' placeholder='' value={titleField} onChange={(e) => setTitleField(e.target.value)} />
                    <label>Description</label>
                    <input type='text' placeholder='' value={descriptionField} onChange={(e) => setDescriptionField(e.target.value)} />
                    <label>Image</label>
                    <input type='text' placeholder='' value={imageField} onChange={(e) => setImageField(e.target.value)} />
                    <label>Tags</label>
                    <input type='text' placeholder='' value={tagField} onChange={(e) => setTagField(e.target.value)} />
                    <input type='submit' value='Edit Post' className='btn btn-block' />
                </Grid>
            </form>
        </Dialog>
    </>);
}

export default EditForm;