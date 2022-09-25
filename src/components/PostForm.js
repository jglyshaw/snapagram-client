import { useState } from "react";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

function PostForm({ onSubmitCall, post }) {

    const [titleField, setTitleField] = useState(post ? post.title : "")
    const [imageField, setImageField] = useState(post ? post.image : "")
    const [descriptionField, setDescriptionField] = useState(post ? post.description : "")
    const [tagField, setTagField] = useState(post ? post.tags.toString() : "")
    const [showAlert, setAlert] = useState(false);

    const inputStyle = { width: "100%", marginBottom: "20px" }
    const buttonStyle = { width: "100%" }

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

                <Button type='submit' style={buttonStyle} variant="contained">Save Post</Button>
            </Grid>
        </form>
    </>);
}

export default PostForm;