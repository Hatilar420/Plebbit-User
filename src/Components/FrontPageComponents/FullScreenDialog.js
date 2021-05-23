import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { Avatar, DialogContent, TextField } from '@material-ui/core';
import CommentBox from './CommentBox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export default function FullScreenDialog({Post,Index,handleClose}) {

    //To Do Call Comments and Fetch user API

    return (
    <Dialog maxWidth="true" open={Post.DialogOpen} onClose={(event) => handleClose(Post,Index)}>
            <DialogContent style={{backgroundColor:"black",height:"90vh",overflowY:"hidden"}}> 
            <IconButton onClick={(event) => handleClose(Post,Index) } style={{position:"absolute",top:"5px",left:"5px"}}>
                <CloseIcon style={{color:"white"}}/>
            </IconButton>    
                <div className="row justify-content-center align-items-center" style={{width:"100%",height:"90%"}}>
                    <div className="col-6">
                        <h2 style={{color:"white"}}>{Post.Title}</h2>
                        <img alt={Post.Title} src={Post.ImageUrl} style={{width:"100%",height:"80%"}}></img>
                    </div>
                    <div className="col-6 align-self-start" style={{color:"white"}}>
                        <div style={{width:"80%"}} className="row pb-1">
                            <div className="col" style={{paddingLeft:"10px"}}>
                                <Avatar src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg" style={{height:"50px",width:"50px"}} />
                            </div>
                            <div className="col-10 p-0">
                                <div>
                                    User Name
                                </div>
                                <div>
                                    time posted
                                </div>
                            </div>
                        </div>
                        <div className="p-0" style={{height:"80vh",overflowY:"scroll"}}>
                        <div className="mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac felis et tellus feugiat semper et nec quam. Quisque condimentum accumsan arcu mattis dapibus. Pellentesque et facilisis libero, id sollicitudin lectus. Integer consectetur orci eget sapien lacinia condimentum. Phasellus nec erat lobortis, gravida erat dictum, euismod massa. Etiam ut ipsum sed diam vestibulum auctor. Donec hendrerit venenatis orci, vel mollis urna condimentum posuere. Praesent a semper massa.

Proin eget libero augue. Cras in turpis mi. Nullam sit amet maximus leo. Suspendisse justo est, hendrerit eget sagittis non, sodales vitae diam. Suspendisse et nibh sit amet orci pellentesque tincidunt eget et neque. Duis eros sapien, viverra eget venenatis consequat, ultricies fringilla eros. Donec ornare cursus dolor, ac finibus lectus vestibulum ac. Quisque suscipit pulvinar turpis eu fringilla. Quisque ac aliquam sapien. Mauris congue metus efficitur ante ultrices, lacinia hendrerit sapien sagittis.

Nunc pulvinar vel ligula vitae cursus. Sed a luctus orci, quis accumsan lorem. Suspendisse ut mauris facilisis, iaculis tellus eget, pulvinar orci. Quisque at erat eu diam aliquam viverra ut sed odio. Proin venenatis metus porta lorem tristique porta. Etiam id tellus sit amet metus luctus commodo quis sed sapien. Donec faucibus nibh non semper congue.

Mauris non diam vel arcu eleifend auctor. Etiam vitae ligula sit amet urna fringilla aliquam non vel sapien. In massa lacus, venenatis non mi sit amet, ullamcorper pretium justo. Etiam ut egestas ipsum, sit amet rhoncus est. Donec in facilisis ligula. Vivamus ac aliquam quam. Maecenas sed dictum augue, in porttitor lectus. Phasellus nec mi lobortis, euismod leo nec, sodales orci. Quisque imperdiet lobortis tempor. Suspendisse sed felis vitae nibh volutpat maximus. Praesent sodales libero eu nunc consectetur bibendum. Etiam et lectus vel ipsum luctus consequat ac euismod eros.

Proin sodales porta rutrum. Ut sit amet pretium orci. Morbi pulvinar massa nunc, eget porttitor felis aliquam at. Nunc condimentum aliquet leo, ut vehicula libero ullamcorper vel. Curabitur sed risus fermentum, venenatis ipsum sit amet, viverra risus. Fusce gravida elit tempor, molestie ipsum vitae, dapibus magna. Phasellus scelerisque ligula sem, ut imperdiet ligula rhoncus non. Sed id sagittis orci.
                            </div>
                        <div className="mt-3 p-1" style={{width:"100%",borderBottom:"1px solid white"}} >
                            <h3>Comments</h3>
                        </div>
                        <div className="mt-3">
                            <CommentBox/>
                            <CommentBox/>
                            <CommentBox/>
                            <CommentBox/>
                            <CommentBox/>
                            <CommentBox/>
                            <CommentBox/>
                        </div>   
                        </div>                      
                    </div>
                </div>
            </DialogContent>
    </Dialog>
    )
}
