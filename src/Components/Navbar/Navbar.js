import React from "react";
import "./style.css";
import Logo from '../../assets/logo.png';

export function Navbar(){

    return(
        <div className="navbar">
            <img src={Logo} alt="Logo" />
        </div>
    )
}
