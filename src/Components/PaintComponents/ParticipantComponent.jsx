import React, { useEffect,useState } from 'react'
import ApiList from '../../HelperServices/API/ApiList'
import socket from '../../HelperServices/SocketHelper'

export default function ParticipantComponent() {

    const [IsPlayerLoaded, setIsPlayerLoaded] = useState(false)
    const [Players,SetPlayers] = useState({
        IsLoaded : false ,
        players : []
    })
    //const {Players} = useContext(PaintContext)
    /*const [scoreCardState, setScoreCardState] = useState([{
        User:{
            Name : "Akash",
            url : "https://miro.medium.com/max/2625/1*KoZPn1bF5q29om6skmeENg.png"
        },
        Score : 300
    }])*/

    useEffect(() => {
        

        socket.on("Players" , ({Players}) =>{
            console.log(Players)
            let obj = []
            for(let i of Players){
                let temp = {
                    GameId:i.GameScoreId,
                    User:{
                        id:i.User._id,
                        Name : i.User.Username,
                        url : `${ApiList.BASE}${i.User.imageUrl}`
                    },
                    Score : i.score
                }
                obj.push(temp)
            }
            console.log(obj)
            SetPlayers({
                ...Players,
                IsLoaded : true,
                players : obj
            })
            setIsPlayerLoaded(true)
        })

    }, [])


    useEffect(  () =>{

        socket.on("score", async ({gameScoreId,score}) =>{
            console.log(gameScoreId)
            let tempPlayers = Players.players
            console.log(IsPlayerLoaded)
            if (Players.IsLoaded) {
                    console.log(Players)
                    for(let i = 0 ; i<tempPlayers.length; i++){
                        if(tempPlayers[i].GameId === gameScoreId){
                            tempPlayers[i].Score += score
                            break   
                        }
                    }
                    SetPlayers({...Players , players:tempPlayers})
            }
        })

    }, [IsPlayerLoaded] )


    //Call for some function to set ScoreCard

    const RenderScoreCard = ({User,Score}) =>{
        return (
            <div className="row m-0 pt-1 mt-1" style={{height:"10vh",width:"100%"}}>
                    <div className="col-6">
                        <img alt="temp" className="rounded-circle" style={{height:"100%",width:"100%"}} src={User.url}></img>
                    </div>
                    <div className="col">
                        <div style={{fontSize:"0.9rem"}}><b>{User.Name}</b></div>
                        <div>
                            <span style={{fontSize:"0.9rem"}}>Score:</span>
                            <span style={{fontSize:"0.9rem"}}>{Score}</span>
                        </div>
                    </div>
                </div>
        )
    }

    const RenderScoreCards = () =>{

        return Players.players.map(x => <RenderScoreCard key={x.User.id} User={x.User} Score={x.Score}/>)
    }

    return (
        <div className="container-fluid p-0 card" style={{color:"white",backgroundColor:"rgb(47 56 72)",border:"1px solid white",height:"100%"}}>
            <div className="card-header">
                <h5>Participants</h5>
            </div>
            <div className="card-body m-1 p-0" style={{overflowY:"auto"}}>
                { Players.IsLoaded ?  RenderScoreCards() : null}
            </div>      
        </div>
    )
}
