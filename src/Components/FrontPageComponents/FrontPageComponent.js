import React , {useEffect,useReducer,useContext} from 'react'
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
import ApiList from '../../HelperServices/API/ApiList';
import LoginUtil from '../../HelperServices/LogInHelper';
import GroupPreview from './GroupPreview';
import { genralReducer, genralState, setGenralSuccess } from './Reducers/genralReducer';
import { PlebContext } from '../../App';
export default function FrontPageComponent() {

    useEffect(  () => {
        GetUserPosts(setPost)
        getUser(setUser)
        GetUserGroups(setUserGroups)
    } , [])

    const {setAuthUserState,setGroupGlobalState,GroupGlobalState} = useContext(PlebContext)
    const [UserState, UserStateDispatch] = useReducer(genralReducer,genralState)
    const [UserGropState, UserGroupDispatch] = useReducer(genralReducer, genralState)
    const [PostState, PostStateDispatch] = useReducer(genralReducer,genralState)
    const GetUserPosts = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.GetUserPosts,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
                cb(response.data)
        } ).catch( (error) => {
            console.log(error)
        } )
    }

    const GetUserGroups = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.GroupBase,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
                cb(response.data)
        } ).catch( (error) => {
            console.log(error)
        } )
    }

    const getUser = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.UserBase,{
            headers: {
                "Authorization" : "Bearer " + LoginUtil.token 
            }
        }).then( (response) =>{
            cb(response.data)
        } ).catch( (error) => {
            console.log(error)
        } )
    }

    const setUserGroups = (data) =>{
        //console.log(data)
        setGroupGlobalState(data)
        UserGroupDispatch(setGenralSuccess(data))
    }

    const setUser = (data) =>{
        data.Points =  1200 //Temporary
        data.Achievements = 8 //Temporary
        console.log(data)
        UserStateDispatch(setGenralSuccess(data))
    }

    useEffect( () =>{

        if(!UserState.isLoading){
            let temp = UserState.data
            temp.IsAuthenticated = true
            setAuthUserState(temp)
        }

    },[UserState,setAuthUserState] )

    const setPost = (data) =>{
        data.isLiked = false
        data.DialogOpen =  false
        console.log(data)
        PostStateDispatch(setGenralSuccess(data))
    }


    const ShowFullWidthDialog = (post,index)=>{
        post.DialogOpen = true;
        PostState.data[index] = post
        PostStateDispatch(setGenralSuccess(PostState.data))
        console.log(PostState.data[index])
    }

    const CloseFullWidthDialog = (post,index) =>{
        post.DialogOpen = false;
        PostState.data[index] = post
        PostStateDispatch(setGenralSuccess(PostState.data))
        console.log(PostState.data[index])
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
        PostState.data[index] = post
        PostStateDispatch(setGenralSuccess(PostState.data))
    }
    
    const RenderCard = (post,index) =>{
        let CardContentRef = React.createRef();
        return(
            <Card className="PlebCardBody" variant="outlined" style={{backgroundColor:"#4e56696c"}}>
                            <CardMedia
                                        image={ApiList.BASE+post.imageUrl}
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
        return PostState.data.map( (x,index) => <div key={x._id} className="col-3">{RenderCard(x,index)}</div>  )
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                {!UserState.isLoading ?  (<div className="mt-4" style={{height:"25vh"}}>
                     <UserProfilePreview User={UserState.data} Posts={PostState} />
                </div>) : null  }
                <div>
                    <div className="card mt-2 mb-4" style={{borderRadius:"10px",backgroundColor:"#411969"}}>
                    <div className="card-body">
                        <div style={{color:"white"}}><h1> My Posts</h1></div>
                    </div>
                    <div className="row card-body">
                        {!PostState.isLoading ?  MapPostState() : null}
                    </div>
                    </div>
                </div> 
            </div>
        </div>
    ) 
}
