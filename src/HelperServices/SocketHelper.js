import {io} from 'socket.io-client'
import ApiList from './API/ApiList'
import LoginUtil from './LogInHelper'

const socket = io(ApiList.BASE , {autoConnect : false})
socket.onAny((event , ...args) =>{
    console.log(event,args)
})
export default socket

