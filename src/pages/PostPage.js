import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Post from "../components/Post";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import css from './form.css'
import { getPosts, createPost, deletePost } from "../API/api";

function PostPage() {


    const backdrop = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const result = await getPosts()
                setItems(result.data);
            } catch (error) {
                console.log(error)
                alert("could not load data")
            }
        };
        fetchData();
    }, []);



    const [titleField, setTitleField] = useState('')
    const [descriptionField, setDescriptionField] = useState('')
    const [items, setItems] = useState([]);
    const [showAlert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);

    const addItem = async (e) => {
        
        e.preventDefault()

        console.log(showAlert)

        if (descriptionField === "" || titleField === "") {
            setAlert(true)
            return;
        }
        const post = await createPost({
            title: titleField,
            description: descriptionField
        })
        setItems([...items, post.data])
        setDescriptionField("")
        setTitleField("")
        setAlert(false)
    }

    const handleDelete = (id) => {
        setOpen(true)
    }

    const deletePostById = async (id) => {
        await deletePost(id)
        const result = await getPosts()
        setItems(result.data);
    }

    const handleClose = async (id) => {
        setOpen(false)
    }

    return (
        <div style={backdrop}>

            <form onSubmit={(e) => addItem(e)} style={{ backgroundColor: "white", padding: "15px" }}>
                {showAlert && <Alert severity="error">Invalid Form Data</Alert>}
                <br />
                <Grid container>
                    <label>Title</label>
                    <input type='text' placeholder='' value={titleField} onChange={(e) => setTitleField(e.target.value)} />
                    <label>Description</label>
                    <input type='text' placeholder='' value={descriptionField} onChange={(e) => setDescriptionField(e.target.value)} />
                    <input type='submit' value='Save Post' className='btn btn-block' />
                </Grid>
            </form>
            <br />

            <Grid container>
                {items.map((item) => (
                    <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                        <Post title={item.title} description={item.description} id={item._id} onDelete={deletePostById} likes={item.likes} />

                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={open}
                onClose={deletePostById}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    Delete Post?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This cannot be undone
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>
                    Delete
                </Button>
                </DialogActions>
                </Dialog>

        </div>
    );
}

export default PostPage;