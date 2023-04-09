import React from "react";
import { Navbar } from "../Navbar/Navbar";
import './style.css';
import { CreateBubble, FetchData } from "../Global/Global";

const JsonLink = "https://nexus-online-school-database.s3.eu-central-1.amazonaws.com/Data/Home.json";

export function Home(){
    document.title = "Nexus"
    const data = FetchData(JsonLink);

    return(
        <div className="body">
            <Navbar />
            <div className="bubble-wrapper">
                {data.map((data, index) => {
                    return(
                        <CreateBubble key={index} image={data.SubjectIcon} color={data.SubjectColor} title={data.SubjectName} linkPath={'/predmet/' + String(data.SubjectName).toLocaleLowerCase()} />
                    )
                })}
            </div>
        </div>
    )
}
