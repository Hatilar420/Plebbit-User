import React, { useState , useRef } from 'react'


export default function TextComponent() {

    const [Message,setMessage] = useState([])

    const TextRef = useRef(null)
    const MessageBoxRef = useRef(null)    


    const OnEnterPress = (event) =>{
        if(event.key === 'Enter'){
            SendMessageOnClick(null)
        }
    }

    const CompareFunc = (a,b) =>{
        if(a.Time < b.Time){
            return -1
        }else if(a.Time > b.Time ){
            return 1;
        }
        return 0
    }

    const PushMessage  = (MessageObj) =>{
        Message.push(MessageObj)
        Message.sort(CompareFunc)
        setMessage([...Message])
        console.log(Message)
    }    

    const SendMessageOnClick = (event) =>{
        let obj = {
            Text : TextRef.current.value,
            Time : Date.now(),
            User : { Name : "Akash" }
        }
        TextRef.current.value = ""
        console.log(obj)
        PushMessage(obj)
        console.log(MessageBoxRef.current)
        //Send message through webSockets
    }

    const MessageBlock = (userName, Message , TimeStamp ) =>{
                let t = new Date(TimeStamp)

                return(
                <div className="row">
                        <div className="col">
                            <span><b>{userName}</b>:</span>
                            <span>{Message}</span>
                        </div>
                        <div className="col" style={{textAlign:"right",fontSize:"10px"}}>
                                {t.getHours()}:{t.getMinutes()}:{t.getSeconds()}
                        </div>
                </div>)
    }

    const RenderMessage = () =>{
        return Message.map( x => MessageBlock(x.User.Name,x.Text,x.Time) )
    }

    return (
        <div className="container-fluid card m-0 p-2" style={{color:"white",height:"100%",backgroundColor:"rgb(47 56 72)"}}>
            <div ref={MessageBoxRef} className="container-fluid" style={{height:"90%",overflowX:"hidden",overflowY:"auto"}}>
                <RenderMessage/>
            </div>
            <div className="container-fluid p-1" style={{height:"10%"}}>
                <div className="row m-0 p-0" style={{width:"100%",height:"100%"}}>
                        <div className="col-10 p-1 m-0" style={{height:"100%"}}>
                            <input onKeyDown={OnEnterPress} ref={TextRef} type="text" placeholder="Type something" style={{backgroundColor:"#282c34",color:"white"}} className="form-control"></input>
                        </div>
                        <div className="col-2 pt-1 m-0">
                                <button onClick={SendMessageOnClick} className="btn btn-primary">Send</button>
                        </div>
                </div>
            </div>            
        </div>
    )
}

