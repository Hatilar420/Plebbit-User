import {React,useEffect,useRef,useState} from 'react'
import { BsArrowUp,BsArrowDown } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './Styles/GroupPostStyles.css'
import ApiList from '../../HelperServices/API/ApiList';
import LoginUtil from '../../HelperServices/LogInHelper';
export default function GroupPost({Post}) {
    useEffect(() => {
        getUserByRoute(setUser)
    }, [])

    const getUserByRoute = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.returnUserById(Post.UserId) ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
            console.log(error)
        } )
    }

    const setUser = (data) =>{
        setUserState(data)
    }

    const [UserState, setUserState] = useState({})
    const UpArrowRef = useRef(null)
    const DownArrowRef = useRef(null)
    const [PointState, setPointState] = useState(0)
    const onUpArrowClick = (event) =>{
        if(PointState === -1){
            DownArrowRef.current.style.color = "white"
        }
        else if(PointState === 1){
            UpArrowRef.current.style.color = "white"
            setPointState(0)
            return
        }
        UpArrowRef.current.style.color = "orange"
        setPointState(1)
    }
    const onDownArrowClick = (event) =>{
        if(PointState === 1){
            UpArrowRef.current.style.color = "white"
        } else if(PointState === -1){
            DownArrowRef.current.style.color = "white"
            setPointState(0)
            return
        }
        DownArrowRef.current.style.color = "purple"
        setPointState(-1)
    }
    return (
        <div className="row container p-0 m-3 pt-2 postStyles" style={{color:"white",backgroundColor:"rgb(29 29 41)"}}>
            <div className="col-1" style={{textAlign:"center"}}>
                <div ref={UpArrowRef}>
                    <BsArrowUp onClick={onUpArrowClick}  style={{fontSize:"2rem"}}/> 
                </div>
                <div className="p-2">
                    90
                </div>
                <div ref={DownArrowRef}>
                    <BsArrowDown onClick={onDownArrowClick} style={{fontSize:"2rem"}}/>
                </div>          
            </div>
            <div className="col m-2" style={{backgroundColor:"#151923"}}>
                <div className="mt-2">
                    <span> <img src={ApiList.BASE+UserState.Avatar} className="rounded-circle" style={{height:"2em",width:"1.8rem"}} alt="randomImage"/> </span>
                    {UserState.Username}
                </div>
                <div>
                    <div>
                        <p style={{fontSize:"1.5rem"}}>{Post.Title}</p>
                    </div>
                    <div className="row p-2 justify-content-center align-items-center">
                        <img className="col-12" src={ApiList.BASE+Post.imageUrl} style={{height:"100%"}} alt="meme" />
                    </div>
                </div>
            </div>
        </div>
    )
}
