import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import './style.css';
import { CreateBubble, firstCapittal } from '../Global/Global';

function Predmet() {
  const { predmetVar } = useParams();
  document.title = firstCapittal(predmetVar);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://nexus-online-school-database.s3.eu-central-1.amazonaws.com/Data/Subjects/Anatomija.json");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
      setLoading(false);
    };

    fetchData();
  }, []);
  var BC = ""
  var newLection = true;
  return (
    <div className="body">
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((item, index) => {
            console.log(data)
            if(index === 0){
              BC = item.SubjectColor
              return null;
            }
            var newPath = "/predmet/" + predmetVar + "/lekcija/" + String(item.LectionName).replace(" ", "-").toLocaleLowerCase()
            if(newLection){
              newLection = false
              return (
                <div key={index * 20000}>
                  <h1 key={index*1000} className='chapter'>{item.LectionChapter}</h1>
                  <CreateBubble key={index} title={item.LectionName} image={item.LectionIcon} linkPath={newPath} color={BC} />
                </div>
              )
            }
            if(item.isLast){
              newLection = true
            }
            return (
              <CreateBubble key={index} title={item.LectionName} image={item.LectionIcon} linkPath={newPath} color={BC} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export { Predmet };
