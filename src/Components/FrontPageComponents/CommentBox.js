import React from 'react'
import { Avatar} from '@material-ui/core';
export default function CommentBox({Comments}){

    //To-Do call the get user endpoint

    return (
        <div style={{width:"100%"}}>
            <div className="row mb-2 p-2" style={{width:"100%",borderBottom:"1px solid white"}}>
                <div style={{width:"80%"}} className="row">
                    <div className="col" style={{paddingLeft:"20px"}}>
                        <Avatar src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg" style={{height:"40px",width:"40px"}} />
                    </div>
                    <div className="col-10 p-0">
                        <div style={{fontSize:"20px"}}>
                            User Name
                        </div>
                        <div style={{fontSize:"10px"}}>
                            time posted
                        </div>
                    </div>
                </div>
                <div className="mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac felis et tellus feugiat semper et nec quam. Quisque condimentum accumsan arcu mattis dapibus. Pellentesque et facilisis libero, id sollicitudin lectus. Integer consectetur orci eget sapien lacinia condimentum. Phasellus nec erat lobortis, gravida erat dictum, euismod massa. Etiam ut ipsum sed diam vestibulum auctor. Donec hendrerit venenatis orci, vel mollis urna condimentum posuere. Praesent a semper massa. 
                </div>
            </div>
        </div>
    )
}
