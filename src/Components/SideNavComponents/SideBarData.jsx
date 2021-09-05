import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import './styles/SideNavStyles.css'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome className="NavBody-Icon"/>,
    BoxClassName : 'NavBody-LinkBox', 
    BoxTextClassName : 'NavBody-LinkText'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper className="NavBody-Icon" />,
    BoxClassName : 'NavBody-LinkBox',
    BoxTextClassName : 'NavBody-LinkText'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus className="NavBody-Icon" />,
    BoxClassName : 'NavBody-LinkBox',
    BoxTextClassName : 'NavBody-LinkText'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople className="NavBody-Icon" />,
    BoxClassName : 'NavBody-LinkBox',
    BoxTextClassName : 'NavBody-LinkText'
  }
];