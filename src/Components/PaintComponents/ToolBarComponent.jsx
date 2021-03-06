import {React,useState} from 'react'
import { ChromePicker } from 'react-color'
export default function ToolBarComponent({changeColor,Changestroke,ClearCanvas}){

      const [background, setbackground] = useState("#000")
      const [ShowColorPicker,hidePicker] = useState(false)
      const [strokeSize,SetStrokeSize] = useState(5)
      //let stroke
      const ShowColorPickerOnClick = (event) =>{
        if(ShowColorPicker){
          console.log("click")
          hidePicker(false)
        }
        else{
          hidePicker(true)
        }
      }
      const handleChangeComplete = (color) => {
        //this.setState({ background: color.hex });
        setbackground(color.hex);
        changeColor(color.hex)
      };
      const HandleStrokeSizeChange = (event) =>{
        //console.log(event.target.value)
        SetStrokeSize(event.target.value)
        Changestroke(event.target.value)
      }
      const ActivateEraser = event =>{
        changeColor("#ffffff")
      }
    
    return (
        <div className="container-fluid p-1" style={{borderBottom:"1px solid black",width:"100%",height:"100%"}}>
          <div className="row p-0 m-0" style={{width:"100%",height:"100%"}}>
          <div className="col-3 pb-2" style={{height:"100%"}}>
                <div style={{textAlign:"center",fontSize:"0.8rem"}}>
                  Color
                </div>
                <div style={{height:"60%", position:"relative"}}>
                  <div onClick={ShowColorPickerOnClick} style={{ height:"100%",backgroundColor:background}}>
                  {ShowColorPicker ? <div style={{position:"absolute"}}>
                    <ChromePicker
                      color={ background }
                      onChange={ handleChangeComplete }/>
                  </div> : null} 
                  </div>
                </div>
            </div>
            <div className="col-5 row justify-content-center align-items-center p-0 m-0" style={{height:"100%"}}>
              <div className="col-7">
                <label style={{fontSize:"0.8rem"}}>Stroke size</label>
                <input type="range" onChange={HandleStrokeSizeChange} min="1" value={strokeSize} className="form-range" max="25"/>
              </div>
              <div className="col-5 mb-1 d-flex justify-content-center align-items-center" style={{border:"1px solid black",height:"100%"}} >
                      <div className="rounded-circle" style={{height:`${strokeSize}px`,width:`${strokeSize}px`,backgroundColor:background}}>
                      </div>
              </div>
            </div>
            <div style={{height:"100%"}} className="col-4 row justify-content-center align-items-center m-0 p-0">
                  <div className="col-6 row p-0 justify-content-center align-items-center" style={{height:"100%"}}>
                      <div>
                        <button onClick={ActivateEraser} style={{fontSize:"0.8rem"}} type="button" class="btn btn-primary">Eraser</button>
                      </div>
                  </div>
                  <div className="col-6 row p-0 justify-content-center align-items-center" style={{height:"100%"}}>
                      <div>
                        <button style={{fontSize:"0.8rem"}} onClick={ (event) => ClearCanvas()} type="button" class="btn btn-primary">clear</button>
                      </div>
                  </div>
            </div>
          </div>
        </div>
    )
}
