import React from "react";
import { Navbar } from "../Navbar/Navbar";
import './style.css'

const link = "https://nexus-online-school-database.s3.eu-central-1.amazonaws.com/Data/Home.json"


function SubjectBubble({ image, color, title }){
    var imageStyle = {
        'backroundColor': color
    }
    
    return (
        <div className="subjectBubble" id={title}>
            <img src={image} alt="" style={imageStyle}/>
            <h1>{title}</h1>
        </div>
    );
}


export function Home(){
    document.title = "Nexus"
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
            const fetchData = async () => {
            const response = await fetch(link);
            const jsonData = await response.json();
            setData(jsonData);
        };

        fetchData();
    }, []);

    return(
        <div className="body">
            <Navbar />
            {data.map((data, index) => {
                console.log(data)
                return(
                    <SubjectBubble key={index} image={data.SubjectImage} color={data.SubjectColor} title={data.SubjectName} />
                )
            })}
        </div>
    )
}
