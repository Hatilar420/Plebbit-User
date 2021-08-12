import React , {useEffect,createContext,useState} from 'react'
import socket from '../../HelperServices/SocketHelper'
import LoginUtil from '../../HelperServices/LogInHelper'
import PaintComponent from './PaintComponent'
import { useLocation, useParams } from 'react-router-dom'
import ApiList from '../../HelperServices/API/ApiList'
export const PaintContext = createContext(null)


export default function PaintHigherComponent() {
    const {id} = useParams()
    const [Noun, setNoun] = useState(null)
    const [IsMyTurn, setIsMyTurn] = useState(false) 
    const [Players,SetPlayers] = useState({
        IsLoaded : false ,
        players : []
    })
    const [IsPlayerLoaded, setIsPlayerLoaded] = useState(false)
    const [Adjective, setAdjective] = useState(null)
    const [Animal, setAnimal] = useState(null)
    const {userMap} = useLocation()
    let TempGameScoreId = null
    const [GameScoreId, setGameScoreId] = useState(null)
    //let IsPlayerDrawing = false
    const [IsPlayerDrawing, setIsPlayerDrawing] = useState(false)
    
    useEffect(() => {
        socket.auth = {jwt : LoginUtil.token}
        socket.connect()
        socket.emit("join" , {
            userMap,
            roomId : id
        })  
        socket.on("GameId", (obj) =>{
            console.log(obj)
            TempGameScoreId = obj
            setGameScoreId(
                obj)
            //GameScoreId = obj
        } )


        socket.on("GameOver",({Gameid}) =>{
            console.log("Gameover", Gameid)
            socket.disconnect()
        })

        socket.on("turn", ({Gameid}) =>{
            //console.log(Gameid)
            /*console.log(GameScoreId)
            console.log(TempGameScoreId)*/
            
            if(Gameid == TempGameScoreId._id){
                //console.log("My turn",Gameid)
                //setIsPlayerDrawing(true)*/
                setIsMyTurn(true)
            }
            else if( GameScoreId != null){
                if(GameScoreId._id == Gameid)
                {
                    //console.log("My turn",Gameid)
                    //setIsPlayerDrawing(true)*/
                    setIsMyTurn(true) 
                }
            }
            else{
                //console.log("Not my turn")
                setIsMyTurn(false)
                setIsPlayerDrawing(false)
            }
        } )

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
                        if(tempPlayers[i].GameId == gameScoreId){
                            tempPlayers[i].Score += score
                            break   
                        }
                    }
                    SetPlayers({...Players , players:tempPlayers})
            }
        })

    }, [IsPlayerLoaded] )


    useEffect( async () =>{

        await GetNounWordAsync(setNoun)
        await GetAdjectiveWordAsync(setAdjective)
        await GetAnimalWordAsync(setAnimal)
    },[IsPlayerDrawing])  

    const GetNounWordAsync = async (cb) =>{
        let axios = require('axios').default
        try {
            let result = await axios.get(ApiList.GetNoun)
            cb(result.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const GetAdjectiveWordAsync = async(cb) =>{

        let axios = require('axios').default
        try {
            let result = await axios.get(ApiList.GetAdjective)
            cb(result.data[0])
        } catch (error) {
            console.log(error)
        }

    }


    const GetAnimalWordAsync = async(cb) =>{

        let axios = require('axios').default
        try {
            let result = await axios.get(ApiList.GetAnimal)
            cb(result.data[0])
        } catch (error) {
            console.log(error)
        }

    }

    const SendMessage = (message) =>{
        console.log(message)
        socket.emit("grp" , {
            gid : id,
            message,
            GameScoreId
        })
    }

    const UpdateWord = (word) => { 
        console.log(word)
        socket.emit("UpdateWord" , {
            gid : id,
            word
        })
    }

    return (
        <div>
        <PaintContext.Provider value={{SendMessage ,id,IsPlayerDrawing,setIsPlayerDrawing,Noun,Adjective,Animal,IsMyTurn,setIsMyTurn,UpdateWord,Players}}>
            <PaintComponent/>
        </PaintContext.Provider>
        </div>
    )
}
