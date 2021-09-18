import React , {useState,useContext,useEffect} from 'react'
import './styles/SideNavStyles.css'
import {GiAbstract066} from 'react-icons/gi'
import { SidebarData } from './SideBarData'
import { Link } from 'react-router-dom';
import {PlebContext} from '../../App'

export default function SideNav() {

    const {GroupGlobalState} = useContext(PlebContext)
    const [Active, setActive] = useState(false)
    
    useEffect(() => {
        if(GroupGlobalState != null){
            console.log(GroupGlobalState)
        }
    }, [GroupGlobalState])
    
    const onMouseEnterNav = (event) =>{

        setActive(true)

    }

    const onMouseLeaveNav = (event) =>{

        setActive(false)
    }

    const SideBarDataRender = () =>{

       return SidebarData.map((item,index) => {
            return (
                <Link to={item.path} style={{textDecoration:"none"}}>
                    <div key={index} className={item.BoxClassName}>
                    
                        <div style={{minWidth:"4vw",display:"inline-block",padding:"5px"}}>
                                {item.icon}
                        </div>
                        {
                            Active ? (<span className={item.BoxTextClassName}>{item.title}</span>):null 
                        }
                    </div>
                </Link>
              );
        })

    }

    const GroupDataRender = () =>{

        return GroupGlobalState.map( (data,index) =>{

            return(
                <Link to={`group/${data.GroupId._id}`} style={{textDecoration:"none"}}>
                    <div key={index} className="NavBody-LinkBox">
                        <div className="NavBody-Image">
                            <img className="rounded-circle NavBody-InnerImage" src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" alt="temporary"  /> 
                        </div>
                        {
                            Active ? (<span className="NavBody-LinkText">{data.GroupId.Name}</span>) :  null 
                        }
                    </div>
                </Link>
            )

        } )


    }
    return (
        <div className={Active ? "NavBody-Active" : "NavBody"} onMouseEnter={onMouseEnterNav} onMouseLeave={onMouseLeaveNav}>
            <div>
            <Link to="/" style={{textDecoration:"none"}}>
                    <div className="NavBody-Head">    
                        <div style={{minWidth:"4vw",display:"inline-block",padding:"5px"}}>
                                <GiAbstract066 className="NavBody-Icon"/>
                        </div>
                        <span className="NavBody-HeadText">Plebbit</span>
                    </div>
                </Link>
            </div>
            <div>
                {SideBarDataRender()}                
            </div>
            <div>
                { GroupGlobalState != null ?  GroupDataRender() : null}                
            </div>
        </div>
    )
}
