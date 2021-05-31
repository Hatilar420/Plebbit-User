import {React,useRef,useEffect, useState} from 'react'
import ToolBarComponent from './ToolBarComponent'


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
        <div className="container-fluid" style={{height:"100%",backgroundColor:"white"}}>
            <div className="row" id="Board" >
                <div style={{border:"1px solid red",height:"85vh"}}  className="col-7 p-0">
                <div className="p-0" style={{border:"1px solid pink",height:"10vh"}}>
                        <ToolBarComponent ClearCanvas={ClearCanvas} changeColor={ChangeColorStroke} Changestroke={ChangeStrokeSize}/>
                </div>
                    <div ref={DrawingBoardRef} className="p-0" style={{border:"1px solid green",height:"75vh"}}>
                        <canvas ref={CanvasRef} onMouseUp={CaptureMouseUp} onMouseMove={onMouseMoveCanvas} onMouseDown={CaptureMouseDown}></canvas>
                    </div>                                
                </div>
                <div style={{border:"1px solid black",height:"85vh"}} className="col-5">
                    bye!
                </div>
            </div>
        </div>
    )
}
