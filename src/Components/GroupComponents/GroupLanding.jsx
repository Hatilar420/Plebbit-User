import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiList from '../../HelperServices/API/ApiList'
import LoginUtil from '../../HelperServices/LogInHelper'
import GroupPost from './GroupPost'
import { Link } from 'react-router-dom'
import PostInput from '../PostInputComponents/PostInput'
export default function GroupLanding() {
    const {id} = useParams()

    useEffect(() => {
        getGroupByRoute(setGroupByRoute)
        getGroupUsersByRoute(setGroupUsers)
        getGroupPostsByRoute(setPostGroups)
    }, [])

    const [PostsState, setPostsState] = useState(null)
    const [IsPostsLoaded, setIsPostsLoaded] = useState(false)
    const [GroupUsersState, setGroupUsersState] = useState(null)
    const [IsGroupUserLoaded, setIsGroupUserLoaded] = useState(false)
    const [GroupState, setGroupState] = useState(null)
    const [IsGroupLoaded, setIsGroupLoaded] = useState(false)
    const getGroupByRoute = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.returnGetGroupById(id) ,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
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
        } )
    }

    const setGroupByRoute = (data) => {
        console.log(data)
        setGroupState(data)
        setIsGroupLoaded(true)
    }

    const setGroupUsers = (data) =>{
        console.log(data)
        setGroupUsersState(data)
        setIsGroupUserLoaded(true)
    }

    const setPostGroups = (data) =>{
        console.log(data)
        setPostsState(data)
        setIsPostsLoaded(true)
    }

    const MapGroupPosts = () =>{

        let temp =  PostsState.map( x => {
            console.log(x)
            return (<GroupPost key={x._id} Post={x} />) 
        } )
        return temp

    }

    const CallBackPostSuccess = (data) =>{
        console.log(data)
        getGroupPostsByRoute(setPostGroups)
    }

    return IsGroupLoaded && IsPostsLoaded && IsGroupUserLoaded ?   (
        <div className="container-fluid">
            <div className="p-2" style={{color:"wheat"}}>
                <h1>{GroupState.Name}</h1>
                <Link to={`/paint/${GroupState._id}`} > Go to Paint </Link>
            </div>
            <div className="row">
                <div className="col">

                </div>
                <div className="col">

                </div>
                <div className="col">

                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 p-0">
                    <PostInput cb={CallBackPostSuccess} Group={GroupState}/>                                    
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10">
                    {IsPostsLoaded && IsGroupUserLoaded && IsGroupLoaded ? MapGroupPosts()  : null}
                </div>                                
            </div>
        </div>
    ) : null
}
