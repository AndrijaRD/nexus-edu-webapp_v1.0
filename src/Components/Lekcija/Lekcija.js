import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { firstCapittal } from "../Global/Global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
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

function DownloadButton({ url, fileName, children }) {
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={downloadFile} className="download">
      <FontAwesomeIcon icon={faFileDownload} className="download-icon" bounce />
      <span>{children}</span>
    </button>
  );
}

export function Lekcija(){
  const { predmetVar, lekcijaVar } = useParams();
  //document.title = firstCapittal(lekcijaVar.replace("-", " ").split(" ")[0]) + " " + firstCapittal(lekcijaVar.replace("-", " ").split(" ")[1]);
  const isAppended = useRef(false)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
        setLoading(false)
        setData(jsonData)
        if (jsonData['LectionTextBoxes'] !== undefined && !isAppended.current) {
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
            isAppended.current = true
        }
    };
    if(data['LectionName'] === undefined){
      fetchData();
    }
  }, [lekcijaVar, predmetVar, isAppended, loading, data]);   
  
  
  console.log(data)   
  console.log(isAppended.current)
  return(
      <div className="body">
          <div className="textbox-wrapper">
              <h1 className="lectio-title">{firstCapittal(lekcijaVar.replace("-", " ").split(" ")[0]) + " " + firstCapittal(lekcijaVar.replace("-", " ").split(" ")[1])}</h1>
          </div>
          {loading ? <div></div> : <DownloadButton link={data["File"]} fileName={lekcijaVar+".pdf"} children={data['File'] === "unavailable" ? "File Unavailable" : lekcijaVar+".pdf"} />}
          {loading ? <div>Loading...</div> : <CardList cards={data['Questions']} />}
      </div>
  )
}
