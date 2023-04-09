import { Link } from 'react-router-dom';
import React from 'react';

function firstCapittal(predmetVar){
    return predmetVar[0].toLocaleUpperCase() + predmetVar.substring(1)
}

function CreateBubble({ image, color, title, linkPath }){
    var imageStyle = {
        'backgroundColor': color
    }
    
    return (
        <Link to={linkPath} className="subjectBubble" id={title}>
            <img src={image} alt="" style={imageStyle}/>
            <h1>{title}</h1>
        </Link>
    );
}

function FetchData(link){
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const fetchFunc = async () => {
            const response = await fetch(link);
            const jsonData = await response.json();
            setData(jsonData);
        };
        fetchFunc();
    }, [link]);

    return data;
}
  

export { firstCapittal, CreateBubble, FetchData };