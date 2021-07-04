import React, { useEffect,useReducer } from 'react'
import { useParams } from 'react-router-dom'
import ApiList from '../../HelperServices/API/ApiList'
import LoginUtil from '../../HelperServices/LogInHelper'
import GroupPost from './GroupPost'
import { Link } from 'react-router-dom'
import PostInput from '../PostInputComponents/PostInput'
import socket from '../../HelperServices/SocketHelper'
import { BsFillPlusCircleFill } from "react-icons/bs";
import {gameReducer,gameState,setGameSuccess,setGameError} from './Reducers/GameReducer'
import { genralReducer , genralState, setGenralError , setGenralSuccess } from './Reducers/GenralReducer'
import { useHistory } from 'react-router'
export default function GroupLanding() {
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        getGroupByRoute(setGroupByRoute)
        getGroupUsersByRoute(setGroupUsers)
        getGroupPostsByRoute(setPostGroups)
        getGamesByGroupId()
        socket.auth = {jwt : LoginUtil.token}
        socket.connect()
        socket.onAny((event , ...args) =>{
            console.log(event,args)
        })
        console.log(socket)
    }, [])

    const [PostsState, PostDispatch] = useReducer(genralReducer, genralState)
    const [GameState, gameDispatch] = useReducer(gameReducer, gameState)
    const [GroupUsersState, GroupUsersDispatch] = useReducer(genralReducer,genralState)
    const [GroupState, GroupDispatch] = useReducer(genralReducer,genralState)
    
    const getGroupByRoute = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.returnGetGroupById(id) ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
            GroupDispatch(setGenralError(error.response))
            console.log(error)
        } )
    }
    
    const getGroupUsersByRoute = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.returnGetUsersByGroup(id) ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
            console.log(error)
            GroupUsersDispatch(setGenralError(error.response))
        } )
    }

    const getGroupPostsByRoute = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.returnGroupPosts(id) ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
            console.log(error)
            PostDispatch(setGenralError(error.response))
        } )
    }

    const getGamesByGroupId = () =>{

        let axios = require('axios').default
        axios.get(ApiList.GroupGameBase + `${id}` ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            console.log(response.data)
            gameDispatch(setGameSuccess(response.data))
        } ).catch( (error) => {
            console.log(error)
            gameDispatch(setGameError(error.response))
        } )

    }

    const setGroupByRoute = (data) => {
        console.log(data)
        GroupDispatch(setGenralSuccess(data))
        //setGroupState(data)
        //setIsGroupLoaded(true)
    }

    const setGroupUsers = (data) =>{
        console.log(data)
        GroupUsersDispatch(setGenralSuccess(data))
        //setGroupUsersState(data)
        //setIsGroupUserLoaded(true)
    }

    const setPostGroups = (data) =>{
        console.log(data)
        PostDispatch(setGenralSuccess(data))
        //setPostsState(data)
        //setIsPostsLoaded(true)
    }

    const MapGroupPosts = () =>{

        let temp =  PostsState.data.map( x => {
            console.log(x)
            return (<GroupPost key={x._id} Post={x} />) 
        } )
        return temp

    }

    const CallBackPostSuccess = (data) =>{
        console.log(data)
        getGroupPostsByRoute(setPostGroups)
    }

    const createGameOnClick  = async (event) =>{
        let axios = require('axios').default
        let createData = {
            GroupId : id
        }
        try{
            let result = await axios({method:"post",
            url:ApiList.GroupGameBase,
            data:createData,
            headers:{
                "Authorization":"Bearer " + LoginUtil.token}
            })
            console.log(result.data)
        }catch(error){
            console.log(error.response)
        }
        getGamesByGroupId()
    }


    const MapGames = (data) =>{
        let map = data.map( x => <GameLinks key={x._id} data={x}/>)
        return map
    }

    const GameLinks = ({data}) =>{

        return(
            <div onClick={ (event) => history.push(`/paint/${data._id}`)  }>
                <div>
                    {data._id}
                </div>
                <div>
                    {data.GameOver}
                </div>
            </div>
        )
    }

    return  (
        <div className="container-fluid">
            <div className="p-2" style={{color:"wheat"}}>
                <h1>{!GroupState.isLoading ?  GroupState.data.Name : null}</h1>
                <Link to={`/paint/${GroupState._id}`} > Go to Paint </Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-3 m-2" style={{backgroundColor:"white" ,minHeight:"40vh"}}>
                    <div className="row p-1" style={{borderBottom:"1px solid black"}}>
                        <div className="col">
                            Games
                        </div>
                        <div className="col row justify-content-center">
                            <button onClick={createGameOnClick} className="btn btn-primary"> <BsFillPlusCircleFill/> Create Game </button>
                        </div>
                    </div>
                    <div>
                        {!GameState.isLoading ? MapGames(GameState.data) : <div> games are not loaded </div> }
                    </div>
                </div>
                <div className="col-3 m-2" style={{backgroundColor:"white",minHeight:"40vh"}}>
                    Scores
                </div>
                <div className="col-3 m-2" style={{backgroundColor:"white",minHeight:"40vh"}}>
                    Members
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 p-1">
                    <PostInput cb={CallBackPostSuccess} Group={GroupState}/>                                    
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">
                    {!PostsState.isLoading ? MapGroupPosts()  : null}
                </div>                                
            </div>
        </div>
    )
}
