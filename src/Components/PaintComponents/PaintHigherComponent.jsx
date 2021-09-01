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
    const [Adjective, setAdjective] = useState(null)
    const [Animal, setAnimal] = useState(null)
    const {userMap} = useLocation()
    let TempGameScoreId = null
    const [GameScoreId, setGameScoreId] = useState(null)
    const [isGameScoreLoaded , setGameScoreLoaded] = useState(false)
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
            setGameScoreId(obj)
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

    }, [])


    useEffect( () =>{
        setGameScoreLoaded(true)

    },[GameScoreId] )

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
        <PaintContext.Provider value={{SendMessage ,id,IsPlayerDrawing,setIsPlayerDrawing,Noun,Adjective,Animal,IsMyTurn,setIsMyTurn,UpdateWord,GameScoreId,isGameScoreLoaded}}>
            <PaintComponent/>
        </PaintContext.Provider>
        </div>
    )
}
