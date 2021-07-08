import React,{useState,useEffect,useContext} from 'react'
import { PaintContext } from './PaintHigherComponent'
import socket from '../../HelperServices/SocketHelper'
export default function TimerComponent() {

    const {id,IsPlayerDrawing,setIsPlayerDrawing} =  useContext(PaintContext)
    const [SecondsLeft, setSecondsLeft] = useState(60)
    const [StartTimer , setStartTimer] = useState(false)
    socket.on("timer" , ({timeLeft}) =>{
        
        setSecondsLeft(timeLeft)

    })
    useEffect(() => {
        if(IsPlayerDrawing && !StartTimer){
            reStartTimer()
        }
        if(StartTimer){
            SecondsLeft > 0 && setTimeout( () => {
                //console.log(SecondsLeft)
                setSecondsLeft(SecondsLeft-1)} , 1000 )
                socket.emit("TimerUpdate" , {
                    Gid : id,
                    timeLeft : SecondsLeft
                })
            if(SecondsLeft === 0){
                setStartTimer(false)
                setIsPlayerDrawing(false)
                socket.emit("updateTurn" , {
                    GameID : id
                } )
            }
        }
    }, [SecondsLeft, StartTimer,IsPlayerDrawing])

    const reStartTimer = () =>{
        setSecondsLeft(60)
        setStartTimer(true)
    }

    return (
        <div>
            <div>
                Time Left : {SecondsLeft}
            </div>
        </div>
    )
}
