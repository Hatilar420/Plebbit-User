import {React,useState} from 'react'
import { ChromePicker } from 'react-color'
export default function ToolBarComponent({changeColor,Changestroke,IsEraser,ClearCanvas}){

      const [background, setbackground] = useState("#fff")

      const handleChangeComplete = (color) => {
        //this.setState({ background: color.hex });
        setbackground(color.hex);
      };
    
    return (
        <div className="container-fluid p-0">
            <div className="row" style={{border:"2px solid blue"}} style={{width:"50%"}}> 
                    <ChromePicker
                    color={ background }
                    onChangeComplete={ handleChangeComplete }/>
            </div>
        </div>
    )
}
