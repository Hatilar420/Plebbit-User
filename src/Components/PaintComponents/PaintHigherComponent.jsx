import React , {useEffect,createContext,useState} from 'react'
import socket from '../../HelperServices/SocketHelper'
import LoginUtil from '../../HelperServices/LogInHelper'
import PaintComponent from './PaintComponent'
import { useLocation, useParams } from 'react-router-dom'
export const PaintContext = createContext(null)


export default function PaintHigherComponent() {
    const {id} = useParams()
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

        socket.on("turn", ({Gameid}) =>{
            console.log(Gameid)
            console.log(GameScoreId)
            console.log(TempGameScoreId)
            if(Gameid == TempGameScoreId._id){
                console.log("My turn")
                setIsPlayerDrawing(true)
            }
            else if( GameScoreId != null){
                if(GameScoreId._id == Gameid)
                {
                    console.log("My turn")
                    setIsPlayerDrawing(true)   
                }
            }
            else{
                setIsPlayerDrawing(false)
            }
        } )
        
    }, [])

    const SendMessage = (message) =>{
        console.log(message)
        socket.emit("grp" , {
            gid : id,
            message,
            GameScoreId
        })
    }

    return (
        <div>
        <PaintContext.Provider value={{SendMessage ,id,IsPlayerDrawing,setIsPlayerDrawing}}>
            <PaintComponent/>
        </PaintContext.Provider>
        </div>
    )
}
