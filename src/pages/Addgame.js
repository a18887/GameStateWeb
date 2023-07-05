import "./addgame.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import finished from "./../img/accept.png";
import pause from "./../img/pause.png";
import stillplaying from "./../img/playbutton.png";
import stop from "./../img/stop.png";

export default function Game() {
  const divisions = [];
  const [namegame, setnamegame] = useState("");
  const [data, setdata] = useState("");
  const [companyname, setcompanygame] = useState("");
  const [imagegame, setimagegame] = useState("");
  const [imagegamebackground, setimagegamebackground] = useState("");
  const [description, setdescription] = useState("");
  const [platforms, setplatforms] = useState("");
  const [rating, setRating] = useState(0);

  const [reviewtitle, setReviewTitle] = useState("");
  const [reviewtext, setReviewText] = useState("");

  const id = 3498;
  const game_id = 3498;
  const navigate = useNavigate();

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    // You can perform additional actions based on the selected rating
  };

  const handleTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  function removeHTMLTags(text) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function gamepage() {
    navigate("/gamepage");
  }

  useEffect(() => {
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/game/searchbyid", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        setnamegame(data.message.name);
        setdata(data.message.release_date);
        setdescription(removeHTMLTags(data.message.description));
        setcompanygame(data.message.developers.map((dev) => dev.name)[0]);
        const platforms = data.message.platforms.map(
          (item) => item.platform.name
        );
        setplatforms(platforms);
        setimagegame(data.message.image);
        setimagegamebackground(data.message.imageadd);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    const jsonData = {
      id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }, []);

  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="Appprinicipal">
          <div className="col-lg-3">
            <div class="img-container">
              <div className="positionimgtopic">
                <h1 className="h2title">{namegame}</h1>
                <p className="texttitle">
                  Released on <span className="textdata">{data} </span> by{" "}
                  <span className="texttitle1">{companyname} </span>
                </p>
              </div>
              <div className="imggametopic">
                <img
                  src={imagegame}
                  className="imggame"
                  width="330px"
                  height="330px"
                  alt="Logo Jogo"
                ></img>
              </div>
              <div className="imagebackground">
                <img
                  src={imagegamebackground}
                  height="550px"
                  className="gameimgback"
                  alt="background"
                ></img>
              </div>
            </div>
          </div>
          <div className="App-main">
            <div className="topicdivgame">
              <div className="gamepagebutton">
                <input
                  type="submit"
                  className="buttonsclasstopic"
                  onClick={gamepage}
                  name="log"
                  id="log"
                  value="GAME PAGE"
                />
              </div>
            </div>
            <div className="seconddivforum">
              <div className="forumbody">
                <div className="rectangles">
                  <h1>Review game:</h1>
                  <div className="rating-bar">
                    <div className="rating-inputs">
                      <h3>Rating (1-10)</h3>
                      <div className="rating-stars">
                        {[...Array(10)].map((_, index) => (
                          <span
                            key={index}
                            className={`star ${
                              rating >= index + 1 ? "filled" : ""
                            }`}
                            onClick={() => handleRatingChange(index + 1)}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                      <h3>Review title (optional)</h3>
                      <input
                        type="text"
                        placeholder="Title"
                        value={reviewtitle}
                        onChange={handleTitleChange}
                      />
                      <h3>Review text (optional)</h3>
                      <textarea
                        className="text_input"
                        type="text"
                        placeholder="Write a review"
                        value={reviewtext}
                        onChange={handleTextChange}
                      />
                      <div className="buttons-container">
                        <div className="button-item">
                          <button className="light-green">
                            <img
                              src={finished}
                              alt="Image 1"
                              width={25}
                              height={25}
                            />
                          </button>
                          <label>I’ve finished/beaten the game!</label>
                        </div>
                        <div className="button-item">
                          <button className="light-yellow">
                            <img
                              src={stillplaying}
                              alt="Image 1"
                              width={25}
                              height={25}
                            />
                          </button>
                          <label>I’m still playing. </label>
                        </div>
                        <div className="button-item">
                          <button className="light-orange">
                            <img
                              src={pause}
                              alt="Image 1"
                              width={25}
                              height={25}
                            />
                          </button>
                          <label>I paused for now.</label>
                        </div>
                        <div className="button-item">
                          <button className="light-red">
                            <img
                              src={stop}
                              alt="Image 1"
                              width={25}
                              height={25}
                            />
                          </button>
                          <label>I quit!</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
