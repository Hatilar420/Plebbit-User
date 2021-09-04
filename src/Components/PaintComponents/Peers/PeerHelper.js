import Peer from 'peerjs';


class PeerHelper{

    constructor(){
        this.peer = new Peer();
        this.peer.on("open" , this._IntializePeerId )
    }

    _IntializePeerId = (peerid) =>{
        this.PeerId = peerid
    }

}

const PeerObj = new PeerHelper()

export default PeerObj