import { SidebarData } from './sidebarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export function Sidebar() {
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className={'nav-menu active'}>
                    <ul className='nav-menu-items'>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}