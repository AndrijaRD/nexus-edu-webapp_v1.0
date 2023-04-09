import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firstCapittal } from "../Global/Global";
import './style.css'

export function Lekcija(){
    const { predmetVar, lekcijaVar } = useParams();
    //document.title = firstCapittal(lekcijaVar.replace("-", " ").split(" ")[0]) + " " + firstCapittal(lekcijaVar.replace("-", " ").split(" ")[1]);
    var appended = false
    useEffect(() => {
        console.log("1. UseEffect")
        const fetchData = async () => {
            var link =
                "https://nexus-online-school-database.s3.eu-central-1.amazonaws.com/Data/Lections/" +
                firstCapittal(predmetVar) +
                "/" +
                lekcijaVar +
                ".json";
            const response = await fetch(link);
            const jsonData = await response.json();
            document.title = jsonData.LectionName;
            console.log("2. Before If")
            if (jsonData['LectionTextBoxes'] !== undefined && !appended) {
                console.log("3. Inside If")
                jsonData['LectionTextBoxes'].forEach((element) => {
                    var textbox = document.createElement('div');
                    textbox.className = 'textbox';
                    textbox.innerHTML = element;
                    document.getElementsByClassName('textbox-wrapper')[0].appendChild(textbox);
                });
                appended = true
            }
            else{
                console.log("Failed")
                console.log(jsonData['LectionTextBoxes'] !== undefined)
                console.log(!appended)
            }
        };
      
        fetchData();
      }, [lekcijaVar, predmetVar, appended]);      

    return(
        <div className="body">
            <div className="textbox-wrapper">
                <h1 className="lectio-title">{firstCapittal(lekcijaVar.replace("-", " ").split(" ")[0]) + " " + firstCapittal(lekcijaVar.replace("-", " ").split(" ")[1])}</h1>
            </div>
        </div>
    )
}
