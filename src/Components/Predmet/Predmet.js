import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import './style.css'
import { firstCapittal } from '../Global/Global';

export function Predmet(){
    const { predmetVar } = useParams()
    document.title = firstCapittal(predmetVar)

    return(
        <div className="body">
            <Navbar />
        </div>
    )
}
