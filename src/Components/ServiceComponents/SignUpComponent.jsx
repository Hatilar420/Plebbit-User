import React, { useState , useRef } from 'react'
import { BsFillImageFill  } from "react-icons/bs";
import ApiList from '../../HelperServices/API/ApiList';
import FormData from 'form-data'
import LoginUtil from '../../HelperServices/LogInHelper';
import { useHistory} from "react-router-dom";
export default function SignUpComponent() {

    const [RegisterUserState, setRegisterUserState] = useState({Username:"",
        Password : "",
        email : "",
        image : null})
    const [IsFormError,SetFormError] = useState({})
    const PreviewImageref = useRef(null)
    const history = useHistory()
    const userNameOnChange = event =>{
        setRegisterUserState({...RegisterUserState , Username: event.target.value})
    }

    const PasswordOnChange = event =>{
        setRegisterUserState({...RegisterUserState , Password: event.target.value})
    }

    const EmailOnChange  = event =>{
        setRegisterUserState({...RegisterUserState , email: event.target.value})
    }

    const ListenToImageChange = (event) =>{
        let ImageFile = event.target.files[0];
        if(ImageFile){
            let reader = new FileReader();
            reader.readAsDataURL(ImageFile)
            reader.onload = (eve) => {
                PreviewImageref.current.src = eve.target.result
                PreviewImageref.current.style.display = "block"
            }
        }
        /*this.setState({ShowSelectedImage:true,ImageFiledata:ImageFile},() =>{
            this.FileChange(this.state.ImageFiledata)
        })*/
        setRegisterUserState({...RegisterUserState , image : ImageFile})
    }

    const SubmitRegister = async (event) => {
        console.log(RegisterUserState)
        await SubmitPostImageEndpoint(RegisterUserState)
    }

    const SubmitPostImageEndpoint = async (data) =>{
        let Formdata = new FormData();
        Formdata.append("Username",data.Username)
        Formdata.append("Password",data.Password)
        Formdata.append("email",data.email)
        Formdata.append("avatar",data.image)
        let axios = require('axios').default
        try {
            let result = await axios({method:"post",
            url:ApiList.RegisterRoute,
            data:Formdata,
            headers:{"Content-Type":'multipart/form-data'}
            })
            console.log("Success")
            console.log(result.data.jwt)
            LoginUtil.IsLogIn = true
            LoginUtil.token = result.data.jwt
            history.push('/profile')
            //cb(result)   
        } catch (Error) {
            if(Error.response){
                SetFormError(Error.response.data.error)
                console.log(Error.response.data.error)
            }
            console.log(Error)
        }
    }




    return (
        <div className="row justify-content-center align-items-center" style={{height:"100%"}}>
            <div className="col-6 m-0 p-0" style={{border:"1px solid #ffffff2b"}}>
                <div style={{color:"white",fontSize:"2rem",marginBottom:"10px"}}>
                    <div style={{backgroundColor:"#0099ff",padding:"10px"}}>
                        Sign Up
                    </div>
                </div>
                <div className="p-2">
                {IsFormError.message ? (
                <div className="alert alert-danger" role="alert">
                    {IsFormError.message}
                </div>
                ) : null  }
                <div className="mb-2 mt-2">
                    <input onChange={userNameOnChange} type="text" placeholder="Username" style={{width:"100%",backgroundColor:"inherit",border:"1px solid #ffffff29",color:"white"}} />
                </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Password" onChange={PasswordOnChange} style={{width:"100%",backgroundColor:"inherit",border:"1px solid #ffffff29",color:"white"}}/>
            
                    </div>
                    <div className="mb-2">
                        <input type="email" placeholder="Email" onChange={EmailOnChange} style={{width:"100%",backgroundColor:"inherit",border:"1px solid #ffffff29",color:"white"}}/>
                    </div>
                    <div className="row m-0" style={{width:"50%"}}>
                        <div className="col-4 m-0 p-0">
                            <input type="file" onChange={ListenToImageChange}  id="file" style={{opacity:0, width:"0.1px" , height:"0.1px",position:"absolute"}} />
                            <label for="file" className="btn btn-secondary"> <BsFillImageFill/>   Avatar</label>
                        </div>
                    </div>
                    <div className="row m-2 justify-content-center p-2" style={{width:"100%",maxHeight:"50vh"}}>
                        <img ref={PreviewImageref} style={{display:"none",maxHeight:"50vh"}} className="col-6" alt="temp"></img>
                    </div>
                    <div className="d-flex m-0 p-3 flex-row-reverse" style={{width:"100%"}}>
                            <button onClick={SubmitRegister} className="btn btn-primary"> Submit </button>
                    </div>
                </div>
                
                </div>
        </div>
    )
}
