import "./addgame.css";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header";
import finished from "./../img/accept.png";
import pause from "./../img/pause.png";
import stillplaying from "./../img/playbutton.png";
import stop from "./../img/stop.png";
import { Rating } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const [searchParams] = useSearchParams();
  const [title, setReviewTitle] = useState("");
  const [text, setReviewText] = useState("");
  const [gameStatus, setGameStatus] = useState("0");

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleRatingChange = (e, value) => {
    setRating(value);
    console.log(value);
    // You can perform additional actions based on the selected rating
  };

  const handleTitleChange = (e) => {
    setReviewTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleGameStatusChange = (e) => {
    const alt = e.target.alt;
    if (alt == "Image 1") {
      setGameStatus("1");
    } else if (alt == "Image 2") {
      setGameStatus("2");
    } else if (alt == "Image 3") {
      setGameStatus("3");
    } else if (alt == "Image 4") {
      setGameStatus("4");
    }
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
    const id = searchParams.get("id");
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

  const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          root: {
            "& .MuiRating-iconFilled": {
              color: "#FFD700", // Gold color
              fontSize: "90px", // Increase the size of the filled stars
            },
            "& .MuiRating-iconEmpty": {
              fontSize: "90px", // Increase the size of the empty stars
            },
          },
        },
      },
    },
  });

  const createReview = async (e) => {
    e.preventDefault();
    const forum_id = searchParams.get("id");
    const user_id = localStorage.getItem("id");
    if (!forum_id || !user_id) {
      alert("Unknown error");
      navigate("/homepage");
    }
    if (!rating) setErrMsg("");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/reviews/create", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        if (data.status === 200) {
          navigate(-1);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    const jsonData = {
      title,
      text,
      rating,
      user_id,
      forum_id,
      gameStatus,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
    console.log("Enviado!");
  };

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
                        <ThemeProvider theme={theme}>
                          <Rating
                            name="customized-10"
                            defaultValue={0}
                            max={10}
                            precision={0.5}
                            color="#FFD700"
                            onChange={handleRatingChange}
                          />
                        </ThemeProvider>
                      </div>
                      <h3>Review title (optional)</h3>
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                      />
                      <h3>Review text (optional)</h3>
                      <textarea
                        className="text_input"
                        type="text"
                        placeholder="Write a review"
                        value={text}
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
                              onClick={handleGameStatusChange}
                            />
                          </button>
                          <label>I’ve finished/beaten the game!</label>
                        </div>
                        <div className="button-item">
                          <button className="light-yellow">
                            <img
                              src={stillplaying}
                              alt="Image 2"
                              width={25}
                              height={25}
                              onClick={handleGameStatusChange}
                            />
                          </button>
                          <label>I’m still playing. </label>
                        </div>
                        <div className="button-item">
                          <button className="light-orange">
                            <img
                              src={pause}
                              alt="Image 3"
                              width={25}
                              height={25}
                              onClick={handleGameStatusChange}
                            />
                          </button>
                          <label>I paused for now.</label>
                        </div>
                        <div className="button-item">
                          <button className="light-red">
                            <img
                              src={stop}
                              alt="Image 4"
                              width={25}
                              height={25}
                              onClick={handleGameStatusChange}
                            />
                          </button>
                          <label>I quit!</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    id="reviewButton"
                    value="Create Topic"
                    onClick={createReview}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
