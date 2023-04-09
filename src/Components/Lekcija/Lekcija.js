import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firstCapittal } from "../Global/Global";
import './style.css'

const Card = ({ question, answer, onFlip, onNext }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    onFlip();
  };

  const handleNext = () => {
    setFlipped(false);
    onNext();
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`}>
      <div className={`card-inner`}>
        <div className="card-front">
          <p>{question}</p>
          <button className="flip-button" onClick={handleFlip}>
            Flip
          </button>
        </div>
        <div className="card-back">
          <p>{answer}</p>
        </div>
      </div>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

const CardList = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFlip = () => {
    // Nothing to do here
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="card-list">
      <Card
        question={currentCard.question}
        answer={currentCard.answer}
        onFlip={handleFlip}
        onNext={handleNext}
      />
    </div>
  );
};


const cards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { question: "What is the smallest country in the world?", answer: "Vatican City" },
];



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
                var style = document.createElement('style');
                style.innerText = jsonData['LectionStyle'];
                document.body.appendChild(style);
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
            <CardList cards={cards} />
        </div>
    )
}
