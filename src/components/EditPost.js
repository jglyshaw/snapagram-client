import Dialog from '@mui/material/Dialog';
import PostForm from './PostForm';

function EditPost({show, setShow, onSubmitCall}) {
    return ( <>
        <Dialog open={show} onClose={() => setShow(false)}>
            <PostForm onSubmitCall={onSubmitCall} newPost={false}/>    
        </Dialog>    
    </> );
}

export default EditPost;