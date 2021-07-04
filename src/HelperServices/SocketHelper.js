import {io} from 'socket.io-client'
import ApiList from './API/ApiList'
import LoginUtil from './LogInHelper'

const socket = io(ApiList.BASE , {autoConnect : false})
export default socket

