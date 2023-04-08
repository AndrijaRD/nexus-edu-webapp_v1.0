import React from "react";
import { Navbar } from "../Navbar/Navbar";
import './style.css'
//import { firstCapittal } from '../Global/Global';


function SubjectBubble({ image, color, title }){
    var imageStyle = {
        'backroundColor': color
    }

    const [imagePath, setImagePath] = React.useState(null);

    React.useEffect(() => {
        import(`../../assets/SubjectIcons/${image}`)
        .then((image) => setImagePath(image))
        .catch((error) => console.log(error));
    }, [image]);
    
    return (
        <div className="subjectBubble" id={title}>
            <img src={imagePath} alt="" style={imageStyle}/>
            <h1>{title}</h1>
        </div>
    );
}

//Home.json
var HomeJSON = [
    {
        "SubjectName": "Anatomija",
        "SubjectColor": "rgb(203, 48, 125)",
        "SubjectImage": "anatomija.png"
    }
]

const SubjectImagePath = "../../assets/SubjectIcons/"

export function Home(){
    document.title = "Nexus"


    return(
        <div className="body">
            <Navbar />
            {HomeJSON.map((data, index) => {
                console.log(data)
                return(
                    <SubjectBubble key={index} image={SubjectImagePath + data.SubjectImage} color={data.SubjectColor} title={data.SubjectName} />
                )
            })}
        </div>
    )
}
