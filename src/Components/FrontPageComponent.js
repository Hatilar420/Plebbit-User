import React , {useState} from 'react'
import Card from '@material-ui/core/Card';
import '../Styles/FrontPageComponentStyle.css'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardActions, CardMedia } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
export default function FrontPageComponent() {

    const [PostState, setPostState] = useState([{
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false
    },{
        Title :"First Content",
        Content :"This is a temp content , Lorem ipsum",
        ImageUrl: "https://miro.medium.com/max/4038/1*KoZPn1bF5q29om6skmeENg.png",
        isLiked:false
    }

]);

   

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
                            <CardActionArea className="PlebCardContent" onMouseEnter={() => ShowContentOnHover(CardContentRef)} onMouseLeave={() => ShowContentOnMouseLeave(CardContentRef)}>
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
                        </Card>
                    )
    }

    const MapPostState = () =>{
        return PostState.map( (x,index) => <div className="col-3">{RenderCard(x,index)}</div>  )
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div>
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div className="row">
                        {MapPostState()}
                    </div>
                    
                </div>   
            </div>
        </div>
    )
}
