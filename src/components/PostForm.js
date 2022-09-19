import { useState } from "react";
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

function PostForm({ onSubmitCall }) {

    const currentID = useSelector((state) => state.postReducer.currentID)
    const currentPost = useSelector((state) => state.postReducer.value).filter(post => post._id === currentID)[0]

    const [titleField, setTitleField] = useState(currentPost ? currentPost.title : "")
    const [imageField, setImageField] = useState(currentPost ? currentPost.image : "")
    const [descriptionField, setDescriptionField] = useState(currentPost ? currentPost.description : "")
    const [tagField, setTagField] = useState(currentPost ? currentPost.tags.toString() : "")
    const [showAlert, setAlert] = useState(false);

    const inputStyle = { width: "100%", marginBottom: "20px" }
    const buttonStyle = {
        width: "100%",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "14px 20px",
        margin: "8px 0",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
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
    return (<>

        <form onSubmit={(e) => onSubmit(e)} style={{ backgroundColor: "white", padding: "15px" }}>
            {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
            <br />
            <Grid container>

                <label style={{ marginBottom: "5px" }}>Title</label>
                <TextField
                    value={titleField}
                    style={inputStyle}
                    onChange={(e) => setTitleField(e.target.value)}
                    size="small"
                />

                <label style={{ marginBottom: "5px" }}>Description</label>
                <TextField
                    multiline
                    maxRows={6}
                    value={descriptionField}
                    style={inputStyle}
                    onChange={(e) => setDescriptionField(e.target.value)}
                    size="small"
                />

                <label style={{ marginBottom: "5px" }}>Image</label>
                <TextField
                    value={imageField}
                    style={inputStyle}
                    onChange={(e) => setImageField(e.target.value)}
                    size="small"
                />

                <label style={{ marginBottom: "5px" }}>Tags</label>
                <TextField
                    value={tagField}
                    style={inputStyle}
                    onChange={(e) => setTagField(e.target.value)}
                    size="small"
                />

                <input type='submit' value='Save Post' style={buttonStyle} />
            </Grid>
        </form>
    </>);
}

export default PostForm;