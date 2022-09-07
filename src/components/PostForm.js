import { useState } from "react";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import css from './form.css'

function PostForm({ onSubmitCall }) {
    const onSubmit = async (e) => {
        e.preventDefault()

        if (descriptionField === "" || titleField === "") {
            setAlert(true)
            return;
        }

        onSubmitCall(titleField, descriptionField, imageField)
        
        setDescriptionField("")
        setTitleField("")
        setImageField("")
        setAlert(false)
    }

    const [titleField, setTitleField] = useState('')
    const [imageField, setImageField] = useState('')
    const [descriptionField, setDescriptionField] = useState('')
    const [showAlert, setAlert] = useState(false);

    return (<>
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
                <input type='submit' value='Save Post' className='btn btn-block' />
            </Grid>
        </form>



    </>);
}

export default PostForm;