import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiList from '../../HelperServices/API/ApiList'
import LoginUtil from '../../HelperServices/LogInHelper'
export default function GroupLanding() {
    const {id} = useParams()

    useEffect(() => {
        getGroupByRoute(setGroupByRoute)
        getGroupUsersByRoute(setGroupUsers)
        getGroupPostsByRoute(setPostGroups)
    }, [])


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
    }

    const setGroupUsers = (data) =>{
        console.log(data)
    }

    const setPostGroups = (data) =>{
        console.log(data)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">

                </div>
                <div className="col">

                </div>
                <div className="col">

                </div>
            </div>
            <div className="row justify-content-center">
                                
            </div>
        </div>
    )
}
