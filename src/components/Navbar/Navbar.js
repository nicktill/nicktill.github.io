import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css'

class Navbar extends Component {

    //initialize state to false
    state = { clicked: false }

    render() {
        return (
            <nav className="NavbarItems">
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} target="_blank" href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>





            </nav>

        )
    }
}

export default Navbar