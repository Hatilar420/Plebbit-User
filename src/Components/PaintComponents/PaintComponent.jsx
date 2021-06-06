import {React,useRef,useEffect} from 'react'
import ToolBarComponent from './ToolBarComponent'
import TextComponent from './TextComponent'
import ParticipantComponent from './ParticipantComponent'

export default function PaintComponent() {
    useEffect(() => {
        DrawCanvas()
    }, [])
    let ctx
    const DrawingBoardRef = useRef(null)
    let firstTime = false
    let oldX
    let oldY
    const CanvasRef = useRef(null)
    /*const [mousepos,setMousePos] = useState({
        x : 0,
        y : 0
    })*/
    //const [IsDrawing,setDrawing] = useState(false)
    let IsDrawing = false
    const DrawCanvas = () =>{
        let DrawingBoardStyle = getComputedStyle(DrawingBoardRef.current)
        let DrawingHeight = DrawingBoardStyle.getPropertyValue("height")
        let DrawingWidth = DrawingBoardStyle.getPropertyValue("width")
        console.log(DrawingHeight)
        CanvasRef.current.width = parseInt(DrawingWidth);
        CanvasRef.current.height = parseInt(DrawingHeight);
        ctx = CanvasRef.current.getContext("2d")
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
        }
        oldX = x
        oldY = y
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
                        <ToolBarComponent ClearCanvas={ClearCanvas} changeColor={ChangeColorStroke} Changestroke={ChangeStrokeSize}/>
                </div>
                    <div ref={DrawingBoardRef} className="p-0" style={{backgroundColor:"white",height:"74vh"}}>
                        <canvas ref={CanvasRef} onMouseUp={CaptureMouseUp} onMouseMove={onMouseMoveCanvas} onMouseDown={CaptureMouseDown}></canvas>
                    </div>                                
                </div>
                <div style={{height:"85vh"}} className="col-5 p-1">
                    <TextComponent/>
                </div>
            </div>
        </div>
    )
}
