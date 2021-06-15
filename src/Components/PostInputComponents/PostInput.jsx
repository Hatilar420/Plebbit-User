import React, { useEffect,useRef, useState } from 'react'
import { BsFillImageFill  } from "react-icons/bs";
import FormData from 'form-data'
import LoginUtil from '../../HelperServices/LogInHelper';
import ApiList from '../../HelperServices/API/ApiList';
export default function PostInput({Group,cb}) {
    useEffect(() => {
        console.log(Group)
    }, [])

    const PreviewImageref = useRef(null)
    const [PostState, setPostState] = useState({
    })
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
        PostState.image = ImageFile
    }

    const PostTitleOnChange = (event) =>{
        PostState.Title = event.target.value
        setPostState(PostState)
    }

    const PostContentOnChange = (event) =>{
        PostState.Content = event.target.value
        setPostState(PostState)
    }

    const SubmitPost = async (event) =>{
        PostState.GroupId = Group._id
        console.log(PostState)
        await SubmitPostImageEndpoint(PostState)
    }


    const SubmitPostImageEndpoint = async (data) =>{
        let Formdata = new FormData();
        Formdata.append("Title",data.Title)
        Formdata.append("Content",data.Content)
        Formdata.append("GroupId",data.GroupId)
        Formdata.append("image",data.image)
        let axios = require('axios').default
        try {
            let result = await axios({method:"post",
            url:ApiList.PostContent,
            data:Formdata,
            headers:{"Content-Type":'multipart/form-data',
                        "Authorization":"Bearer " + LoginUtil.token}
            })
            console.log("Success")
            cb(result)   
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid m-0 p-1" style={{border:"1px solid white",height:"100%"}}>
            <div style={{color:"white",fontSize:"1.5rem"}}>
                Post Something
            </div>
            <div className="m-2">
            <label style={{color:"white"}}>Title:</label>
            <input onChange={PostTitleOnChange} type="text" value={PostState.Title} placeholder="Post title" style={{width:"100%"}} />
            </div>
            <div className="m-2">
                <label style={{color:"white"}}>Content</label>
                <textarea placeholder="type something" onChange={PostContentOnChange} value={PostState.Content} style={{width:"100%"}}></textarea>
            </div>
            <div className="row m-2" style={{width:"50%",border:"1px solid red"}}>
                <div className="col-4">
                    <input type="file" onChange={ListenToImageChange}  id="file" style={{opacity:0, width:"0.1px" , height:"0.1px",position:"absolute"}} />
                    <label for="file" className="btn btn-secondary"> <BsFillImageFill/> Select file</label>
                </div>
            </div>
            <div className="row m-2 justify-content-center p-2" style={{width:"100%"}}>
                 <img ref={PreviewImageref} style={{display:"none"}} className="col-6" alt="temp"></img>
            </div>
            <div className="d-flex m-0 p-3 flex-row-reverse" style={{width:"100%"}}>
                    <button onClick={SubmitPost} className="btn btn-primary"> Submit </button>
            </div>
        </div>
    )
}
