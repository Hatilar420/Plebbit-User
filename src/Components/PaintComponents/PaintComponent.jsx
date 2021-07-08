import {React,useRef,useEffect,useContext} from 'react'
import ToolBarComponent from './ToolBarComponent'
import TextComponent from './TextComponent'
import ParticipantComponent from './ParticipantComponent'
import socket from '../../HelperServices/SocketHelper'
import { PaintContext } from './PaintHigherComponent'
export default function PaintComponent() {

    const {id,IsPlayerDrawing} =  useContext(PaintContext)
    useEffect(() => {
        DrawCanvas()
    }, [IsPlayerDrawing])
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
        ctx.lineWidth = 25;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#000";
        
    }
    const ChangeColorStroke = (color) =>{
            ctx.strokeStyle = color
    }
    const ClearCanvas = () =>{
        ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height);
        socket.emit("painting" , {
            gid : id,
            data : returnCanvasImage
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
    return (
        <div className="container-fluid p-1" style={{height:"100%",backgroundColor:"#282c34"}}>
            <div className="row m-0 p-0 space-between" id="Board" >
                <div style={{height:"85vh"}} className="col-2">
                    <ParticipantComponent/>
                </div>
                <div style={{height:"85vh"}}  className="col-5 p-1">
                <div className="p-0 card" style={{backgroundColor:"white",height:"10vh",width:"100%"}}>
                    {IsPlayerDrawing ? (<ToolBarComponent ClearCanvas={ClearCanvas} changeColor={ChangeColorStroke} Changestroke={ChangeStrokeSize}/>)
                    : <div>
                        Someone else if drawing
                    </div>}
                </div>
                    <div ref={DrawingBoardRef} className="p-0" style={{backgroundColor:"white",height:"74vh"}}>
                        {IsPlayerDrawing ? (<canvas ref={CanvasRef} onMouseUp={CaptureMouseUp} onMouseMove={onMouseMoveCanvas} onMouseDown={CaptureMouseDown}></canvas>) : 
                        <canvas ref={CanvasRef}></canvas>}
                    </div>                                
                </div>
                <div style={{height:"85vh"}} className="col-5 p-1">
                    <TextComponent/>
                </div>
            </div>
        </div>
    )
}
