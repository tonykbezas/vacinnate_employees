import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <>
        <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title">Menu</li>

                        <li className="sidebar-item  ">
                            <a href="admin" className='sidebar-link'>
                                <i className="bi bi-grid-fill"></i>
                                <span>Listado</span>
                            </a>
                        </li>
                        <li className="sidebar-item  ">
                            <a href="index.html" className='sidebar-link'>
                                <i className="bi bi-grid-fill"></i>
                                <span>Salir</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>
        </>
    )
}