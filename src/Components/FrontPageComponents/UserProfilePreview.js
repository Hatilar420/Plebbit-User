import React, { useState } from 'react'

export default function UserProfilePreview() {

    const [userProfileState , SetUserProfileState] = useState({
        Name:"Akash", 
        url:"https://pickaface.net/gallery/avatar/unr_random_180527_1151_2bcb7h9.png",
        Posts:2
    })



    return (
        <div className="container-fluid p-1 card m-0" style={{height:"100%",borderRadius:"10px",backgroundColor:"rgb(23 60 134)"}}>
            <div className="row card-body" style={{height:"100%"}}>
                <div className="col-2" style = {{height:"100%",textAlign:"center",color:"white"}}>
                    <img src={userProfileState.url} alt="Name" className="rounded-circle mb-2" style={{width:"55%",height:"85%"}} />
                    <h5> {userProfileState.Name} </h5>
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
