import React, {Component} from 'react';
import '../styles/navbar.sass';
import { Link } from "react-router-dom";
import {NavDropdown} from 'react-bootstrap';

class NavbarComponent extends Component{
    render(){
        return(
            <div className="navbar">
                <Link to="/" className="navbar__home">Fake Taxi</Link>

                <NavDropdown title="Меню" id="collasible-nav-dropdown" className="right-side">
                    <NavDropdown.Item className="point">
                        <Link to="/buy" className="point-text">Купить</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="point">
                        <Link to="/order" className="point-text">Заказать</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="point">
                        <Link to="/map" className="point-text">Карта</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        )
    }
}

export default NavbarComponent;