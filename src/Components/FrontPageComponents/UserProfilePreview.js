import React, { useEffect, useState } from 'react'
import LoginUtil from '../../HelperServices/LogInHelper'
import ApiList from '../../HelperServices/API/ApiList'
export default function UserProfilePreview({User,Posts}) {

    useEffect(() => {
        User.Posts = Posts.length
        console.log(User)
    }, [])

  
    const [userProfileState , SetUserProfileState] = useState(User)



    return (
        <div className="container-fluid p-1 card m-0" style={{height:"100%",borderRadius:"10px",backgroundColor:"rgb(23 60 134)"}}>
            <div className="row card-body" style={{height:"100%"}}>
                <div className="col-2" style = {{height:"100%",textAlign:"center",color:"white"}}>
                    <img src={ApiList.BASE+userProfileState.Avatar} alt="Name" className="rounded-circle mb-2" style={{width:"55%",height:"85%"}} />
                    <h5> {userProfileState.Username} </h5>
                </div>
                <div className="col row p-2" style={{height:"100%"}}>
                    <div className="row col-12" style={{color:"white"}}>
                        <div className="col">
                            <div style={{width:"100%",textAlign:"center"}}>
                                <h3>Posts</h3>
                                <div style={{fontSize:"1.2rem"}}>{userProfileState.Posts}</div>
                            </div>
                        </div>
                        <div className="col">
                            <div style={{width:"100%",textAlign:"center"}}>
                                <h3>Points</h3>
                                <div style={{fontSize:"1.2rem"}}>1200</div>
                            </div>
                        </div>
                        <div className="col">
                            <div style={{width:"100%",textAlign:"center"}}>
                                <h3>Achievements</h3>
                                <div style={{fontSize:"1.2rem"}}>8</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 row">
                        <div className="col row">
                            <a href="/profile" style={{backgroundColor:"rgb(52 84 214)", color:"white"}} className="btn">Edit profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
