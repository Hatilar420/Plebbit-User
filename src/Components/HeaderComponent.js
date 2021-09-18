import React , {useContext} from 'react'
import '../Styles/HeaderComponentStyle.css'
import {Button} from 'reactstrap';
 
  //import DialogContentText from '@material-ui/core/DialogContentText';
  import ApiList from '../HelperServices/API/ApiList';
  import LoginUtil from '../HelperServices/LogInHelper';
  import { useHistory } from "react-router-dom";
  import { PlebContext } from '../App';
import DialogComponent from './HeaderComponents/DialogComponent';


export default function HeaderComponent() {

    const history = useHistory()
    const [open, setOpen] = React.useState(false);
    const [credentials , setCredentials] = React.useState({
      "Username" : "", 
      "Password" :""
    })
    const {AuthUserState} = useContext(PlebContext)
    const [errorMessage,setErrorMessage] = React.useState(null)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleUsernameInput = (event) =>{

      credentials.Username = event.target.value

      setCredentials(credentials)

    }


    const [IsLogedIn,setLogIn] = React.useState(false)

    const Signout = (event) =>{
      LoginUtil.IsLogIn = false
      LoginUtil.token = null
      console.log(LoginUtil)
      setLogIn(false)
      history.push('/')
    }

    const handleRedirectSignUp =  (event) =>  {
          history.push("/signUp")
    }

    const handleUserPassword = (event) =>{
        credentials.Password = event.target.value

        setCredentials(credentials)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) =>{
        let axios = require('axios').default
        try{
          let result = await axios.post(ApiList.LoginRoute , credentials)
          console.log(result.data)
          LoginUtil.token = result.data.jwt
          LoginUtil.IsLogIn = true
          console.log(LoginUtil)
          setErrorMessage(null)
          setLogIn(true)
          handleClose()
          history.push('/profile')
        }catch(error){
          if(error.response){
            console.log(error.response)
            setErrorMessage(error.response.data.message)
          }
          setErrorMessage("Cannot connect to the server")
        }
    }

    return (
        <div>
        <div className="p-2 MainHeadContainer">
          {AuthUserState.IsAuthenticated ? (<div className="row ProfileViewHeader p-0 m-0">
              <div className="col p-1 m-0" style={{height:"100%",borderRight:"1px dotted #ffffff33"}}>
                  <img src={ApiList.BASE+AuthUserState.Avatar} alt="not present" className="rounded-circle mb-2" style={{width:"100%",height:"100%"}}></img>
              </div>
              <div className="col p-1 m-0" style={{color:"white",fontSize:"1.5rem"}}>
                  {AuthUserState.Username}
              </div>
            </div>) : (
                <div className="d-flex">
                <div  className="NavButtons">
                  <Button color="success" onClick={handleRedirectSignUp}>Sign Up</Button>
                </div>
                <div className="NavButtons">
                { IsLogedIn ? <Button color="danger" onClick={Signout}>Sign out</Button> : <Button color="primary" onClick={handleClickOpen}>Sign in</Button> }
                </div>
              </div>
            )}
      </div>
              <DialogComponent open={open} handleClose={handleClose} errorMessage={errorMessage} handleUsernameInput={handleUsernameInput} handleUserPassword={handleUserPassword} handleSubmit={handleSubmit}/>
        </div>    
    )
}
