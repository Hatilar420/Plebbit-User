import React , {useState} from 'react'
import './styles/SideNavStyles.css'
import {GiAbstract066} from 'react-icons/gi'
import { SidebarData } from './SideBarData'
import { Link } from 'react-router-dom';
export default function SideNav() {

    const [Active, setActive] = useState(false)

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
                        <span className={item.BoxTextClassName}>{item.title}</span>
                    </div>
                </Link>
              );
        })

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
        </div>
    )
}
