import Peer from 'peerjs';


class PeerHelper{

    constructor(){
        this.peer = new Peer();
        this.peer.on("open" , this._IntializePeerId )
    }

    _IntializePeerId = (peerid) =>{
        this.PeerId = peerid
    }

    CallPeer = (destPeerId , mediaStream) =>{
        this.peer.call(destPeerId,mediaStream)
    }

    receievePeerCall = (Playercb) =>{
        this.peer.on("call" ,(call) =>{
            console.log("Receieved call from", this.peer.id)
            call.answer()
            call.on("stream",(MediaStream) =>{
                console.log("streaming")
                Playercb(this.peer.id,MediaStream)
            })
        })

    }

}

const PeerObj = new PeerHelper()

export default PeerObj