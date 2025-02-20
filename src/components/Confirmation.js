// External MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Confirmation({onDelete, onClose, open, id}) {
    
    // --- Main Return --- //
    return ( 
    <>
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                
                <DialogTitle id="alert-dialog-title">
                    Delete Post?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onDelete(id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
        </Dialog>
    </> 
    );
}

export default Confirmation;