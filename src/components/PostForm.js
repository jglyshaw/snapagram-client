import { useState } from "react";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from './form.css'

function PostForm({ onSubmitCall }) {
    const onSubmit = async (e) => {
        e.preventDefault()

        if (descriptionField === "" || titleField === "") {
            setAlert(true)
            return;
        }

        console.log(tagField)
        onSubmitCall(titleField, descriptionField, imageField, tagField.split(','))
        
        setDescriptionField("")
        setTitleField("")
        setImageField("")
        setTagField("")
        setAlert(false)
    }

    const [titleField, setTitleField] = useState('')
    const [imageField, setImageField] = useState('')
    const [descriptionField, setDescriptionField] = useState('')
    const [tagField, setTagField] = useState('')
    const [showAlert, setAlert] = useState(false);

    const inputStle = {
        marginBottom: "25px"
    }

    return (
    <Accordion  >
    <AccordionSummary style = {{justifyContent: 'center'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <h1>Create New Post</h1>
        </AccordionSummary>

        <form onSubmit={(e) => onSubmit(e)} style={{ backgroundColor: "white", padding: "15px" }}>
            {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
            <br />
            <Grid container>
                <label>Title</label>
                <input style = {inputStle}type='text' placeholder='' value={titleField} onChange={(e) => setTitleField(e.target.value)} />
                <label>Description</label>
                <input style = {inputStle} type='text' placeholder='' value={descriptionField} onChange={(e) => setDescriptionField(e.target.value)} />
                <label>Image</label>
                <input style = {inputStle} type='text' placeholder='' value={imageField} onChange={(e) => setImageField(e.target.value)} />
                <label>Tags</label>
                <input style = {inputStle}type='text' placeholder='' value={tagField} onChange={(e) => setTagField(e.target.value)} />
                <input type='submit' value='Save Post' className='btn btn-block' />
            </Grid>
        </form>
        </Accordion>
        );
}

export default PostForm;