import logo from '../../assets/imgs/logo.png';
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import './index.css';

export function Sidebar() {
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className={'nav-menu active'}>
                    <ul className='nav-menu-items'>
                        {/* <img src={logo} /> */}

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