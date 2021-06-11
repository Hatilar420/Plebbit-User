import React , {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import '../../Styles/FrontPageComponentStyle.css'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardActions, CardMedia } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import FullScreenDialog from './FullScreenDialog';
import UserProfilePreview from './UserProfilePreview';
export default function FrontPageComponent() {

    const [PostState, setPostState] = useState([{
        id:124,
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false,
        DialogOpen:false
    },{
        id:2134,
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false,
        DialogOpen:false
    },
    {
        id:124,
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false,
        DialogOpen:false
    },
    {
        id:124,
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false,
        DialogOpen:false
    },
    {
        id:124,
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false,
        DialogOpen:false
    }

]);


    const ShowFullWidthDialog = (post,index)=>{
        post.DialogOpen = true;
        PostState[index] = post
        setPostState([...PostState])
        console.log(PostState[index])
    }

    const CloseFullWidthDialog = (post,index) =>{
        post.DialogOpen = false;
        PostState[index] = post
        setPostState([...PostState])
        console.log(PostState[index])
    }

    const ShowContentOnHover = (ref) =>{
       ref.current.style.display="block"
    }
    
    const ShowContentOnMouseLeave = (ref) =>{
       ref.current.style.display="none"
    }

    const OnFavouriteClick = (event ,  post , index) =>{
        if(!post.isLiked){
            event.target.style.color = "red"
            post.isLiked = true
        }else{
            event.target.style.color = "white"
            post.isLiked = false
        }
        PostState[index] = post
        setPostState(PostState)
    }
    
    const RenderCard = (post,index) =>{
        let CardContentRef = React.createRef();
        return(
            <Card className="PlebCardBody" variant="outlined" style={{backgroundColor:"#4e56696c"}}>
                            <CardMedia
                                        image={post.ImageUrl}
                                        className="PlebCardMedia"   
                                /> 
                            <CardActionArea onClick={ (event) => ShowFullWidthDialog(post,index) } className="PlebCardContent" onMouseEnter={() => ShowContentOnHover(CardContentRef)} onMouseLeave={() => ShowContentOnMouseLeave(CardContentRef)}>
                                <CardContent ref={CardContentRef} style={{display:"none"}}>
                                   <Typography gutterBottom variant="h5" style={{color:"white"}} component="h2">
                                            {post.Title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <IconButton onClick={(event) => OnFavouriteClick(event,post,index) }>
                                    <FavoriteIcon style={{color:"white",fontSize:"25px"}} />
                                </IconButton>
                                <IconButton>
                                    <ShareIcon style={{color:"white",fontSize:"25px"}} />
                                </IconButton>
                            </CardActions>
                            <FullScreenDialog Post={post} Index={index} handleClose={CloseFullWidthDialog}/>
                        </Card>
                    )
    }


    const MapPostState = () =>{
        return PostState.map( (x,index) => <div key={x.id} className="col-3">{RenderCard(x,index)}</div>  )
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="mt-4" style={{height:"25vh"}}>
                    <UserProfilePreview/>
                </div>
                <div>
                    <div className="card mt-2 mb-4" style={{borderRadius:"10px",backgroundColor:"#411969"}}>
                    <div className="card-body">
                        <div style={{color:"white"}}><h1> My Posts</h1></div>
                    </div>
                    <div className="row card-body">
                        {MapPostState()}
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    )
}
