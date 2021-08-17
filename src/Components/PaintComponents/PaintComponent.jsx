import {React,useRef,useEffect,useContext} from 'react'
import ToolBarComponent from './ToolBarComponent'
import TextComponent from './TextComponent'
import ParticipantComponent from './ParticipantComponent'
import socket from '../../HelperServices/SocketHelper'
import { PaintContext } from './PaintHigherComponent'
import './Styles/PaintComponentStyle.css'
export default function PaintComponent() {

    const {id,IsPlayerDrawing,Noun,Adjective,Animal,setIsPlayerDrawing,IsMyTurn,setIsMyTurn,UpdateWord} =  useContext(PaintContext)
    useEffect(() => {
        DrawCanvas()
        socket.on("clearImage" , ({data}) =>{
            if(data){
                ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height);
            }
        })
    })
    const DrawingBoardRef = useRef(null)
    let firstTime = false
    let oldX
    let oldY
    const CanvasRef = useRef(null)
    let ctx
    /*const [mousepos,setMousePos] = useState({
        x : 0,
        y : 0
    })*/
    //const [IsDrawing,setDrawing] = useState(false)
    socket.on("canvasData" , (obj) =>{
        try {
            //console.log(obj.data)
            //console.log(ctx)
            var image = new Image();
            image.onload = () =>{
                if(ctx !== undefined && obj.data !== undefined){
                    ctx.drawImage(image , 0 , 0)
                }
            }
            image.src = obj.data   
        } catch (error) {
            console.log(error)
        }
    })
    let IsDrawing = false
    const DrawCanvas = () =>{
        let DrawingBoardStyle = getComputedStyle(DrawingBoardRef.current)
        let DrawingHeight = DrawingBoardStyle.getPropertyValue("height")
        let DrawingWidth = DrawingBoardStyle.getPropertyValue("width")
        console.log(DrawingHeight)
        CanvasRef.current.width = parseInt(DrawingWidth);
        CanvasRef.current.height = parseInt(DrawingHeight);
        ctx =  CanvasRef.current.getContext("2d")
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#000";
        
    }
    const ChangeColorStroke = (color) =>{
            ctx.strokeStyle = color
    }
    const ClearCanvas = () =>{
        ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height);
        socket.emit("clear" , {
            gid : id,
            data : true
        })
    }
    const ChangeStrokeSize = (size) =>{
        ctx.lineWidth = size
    }
    const CaptureMouseDown = (event) =>{
        //console.log(event.target)
        IsDrawing = true       
    }
    const CaptureMouseUp = (event) =>{
        IsDrawing = false
    }


    const returnCanvasImage  = () => {
        return CanvasRef.current.toDataURL("image/png")
    }

    const onMouseMoveCanvas = event =>{     
        let x =  parseInt(event.pageX-DrawingBoardRef.current.getBoundingClientRect().left)
        let y =  parseInt(event.pageY-DrawingBoardRef.current.getBoundingClientRect().top)
        if(firstTime){
            firstTime = false
            oldX = x
            oldY = y
        }   
        if(IsDrawing){
            ctx.beginPath();
            ctx.moveTo(oldX,oldY);
            ctx.lineTo(x,y);
            ctx.closePath();
            ctx.stroke();
            socket.emit("painting" ,  {
                gid : id,
                data : returnCanvasImage()
            })
        }
        oldX = x
        oldY = y
        socket.emit("painting" , {
            gid : id,
            data : returnCanvasImage
        })
        //mousepos.x = x
        //mousepos.y = y
        //setMousePos(mousepos)
        //console.log(mousepos)        
    }

    const ClickChooseWord = (event) =>{
        //console.log(event.target.innerHTML)
        //Send the word to backend
        UpdateWord(event.target.innerHTML)
        setIsMyTurn(false)
        setIsPlayerDrawing(true)
    }

    return (
        <div className="container-fluid p-1" style={{height:"100%",backgroundColor:"#282c34"}}> 
            <div className="row m-0 p-0 space-between" id="Board" >
                <div style={{height:"85vh"}} className="col-2">
                    <ParticipantComponent/>
                </div>
                <div style={{height:"85vh"}}  className="col-5 p-1">
                    <div style={{position:"relative"}}>
                        {IsMyTurn ? (
                                <div style={{backgroundColor:"#000000c4",position:"absolute",zIndex:"2",height:"100%",width:"100%"}}>
                                <div className="p-3" style={{height:"10%",width:"100%",color:"white",fontSize:"2rem",textAlign:"center"}}>
                                    Choose a word
                                </div>
                                <div className="row justify-content-center align-items-center WordChooseStyleDiv">
                                    <div className="col WordChoose">
                                       <p onClick={ClickChooseWord}>
                                           {Adjective}
                                        </p>  
                                    </div>
                                    <div className="col WordChoose" >
                                    <p onClick={ClickChooseWord}>
                                           {Noun}
                                        </p>
                                    </div>
                                    <div className="col WordChoose">
                                    <p onClick={ClickChooseWord}>
                                           {Animal}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )  : null}
                        <div className="p-0 card" style={{backgroundColor:"white",height:"10vh",width:"100%"}}>
                            {IsPlayerDrawing ? (<ToolBarComponent ClearCanvas={ClearCanvas} changeColor={ChangeColorStroke} Changestroke={ChangeStrokeSize}/>)
                            : <div style={{textAlign:'center',paddingTop:"20px"}}>
                                Someone else if drawing
                            </div>}
                        </div>
                            <div ref={DrawingBoardRef} className="p-0" style={{backgroundColor:"white",height:"74vh"}}>
                                {IsPlayerDrawing ? (<canvas ref={CanvasRef} onMouseUp={CaptureMouseUp} onMouseMove={onMouseMoveCanvas} onMouseDown={CaptureMouseDown}></canvas>) : 
                                <canvas ref={CanvasRef}></canvas>}
                            </div> 
                    </div>                               
                </div>
                <div style={{height:"85vh"}} className="col-5 p-1">
                    <TextComponent/>
                </div>
            </div>
        </div>
    )
}
