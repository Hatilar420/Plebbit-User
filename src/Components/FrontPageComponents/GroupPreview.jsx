import React from 'react'
import './Styles/GroupPreviewStyles.css'
import { useHistory } from 'react-router'
export default function GroupPreview({Groups}) {

    const history = useHistory()

    const renderGroupCards = () =>{
        return Groups.map(x => <RenderGroupCard key={x._id} data={x.GroupId}/> )
        //console.log(Groups)
    }

    const CardRedirectOnClick = (id) =>{
        history.push(`/group/${id}`)
    }
    
    const RenderGroupCard = ({data,...rest}) =>{

        return(
            <div {...rest} onClick={ (event) => {CardRedirectOnClick(data._id)} } className="card col-3 m-1 showBorder" style={{backgroundColor:"rgb(39 41 54 / 70%)",borderRadius:"20px",color:"white",fontSize:"1.2rem"}}>
                    <span> <img className="rounded-circle" src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="temporary" style={{height:"2rem",width:"2rem"}} /> 
                        {`    ${data.Name}`}     
                    </span>
            </div>
        )

    }

    return (
        <div style={{border:"1px solid green",height:"100%",overflowY:"auto"}}>
            <div className="row m-0 p-0 justify-content-center">
                {renderGroupCards()}
            </div>
        </div>
    )
}
