import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from 'reactstrap';

function DialogComponent({open,handleClose,errorMessage,handleUsernameInput,handleUserPassword,handleSubmit}) {
    return (
        <div>
            <Dialog open={open}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" 
        style={
          {
           backgroundColor:"rgb(28 28 224)",
           color:"white" 
          }}
        >
          <h3><b>Sign in</b></h3>
        </DialogTitle>
        <DialogContent  style={{overflowX:"hidden"}}>
        <svg style={{margin:"-25px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(28 28 224)" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,202.7C672,213,768,171,864,138.7C960,107,1056,85,1152,112C1248,139,1344,213,1392,250.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        {errorMessage ? <div className="alert alert-danger"> {errorMessage} </div> : null}
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            fullWidth
            onChange = {handleUsernameInput}
          />
          <TextField
          label="Password"
          type="password"
          fullWidth
          onChange = {handleUserPassword}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default DialogComponent
