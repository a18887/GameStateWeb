import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./gamepage.css";
import graph from "../img/graph.png";
import star from "../img/star.png";
import kazzio from "../img/kazzio.png";
import wishlist from "../img/buttonwishlist.png";
import Header from "./Header";

export default function Game() {
  const [namegame, setnamegame] = useState("");
  const [data, setdata] = useState("");
  const [ratings_count, setrating] = useState("");
  const [companyname, setcompanygame] = useState("");
  const [imagegame, setimagegame] = useState("");
  const [imagegamebackground, setimagegamebackground] = useState("");
  const [description, setdescription] = useState("");
  const [platforms, setplatforms] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function removeHTMLTags(text) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function forumpage() {
    navigate("/reviewgame");
  }

  function reviewgamepage() {
    navigate(`/topicpage?id=${searchParams.get("id")}`);
  }

  function removeWishlistGame() {
    const game_id = searchParams.get("id");
    const user_id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "DELETE",
      `http://localhost:3000/user/${user_id}/wishlist/${game_id}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        alert(data.message);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr.send();
  }

  function addWishlistGame() {
    const game_id = searchParams.get("id");
    const user_id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:3000/user/${user_id}/wishlist`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        if (data.status === 201) {
          alert(data.message);
        }
        if (data.status === 409) {
          //Game already in the wishlist
          removeWishlistGame();
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    const jsonData = {
      game_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }

  useEffect(() => {
    const id = searchParams.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/game/searchbyid", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        setnamegame(data.message.name);
        setrating(data.message.ratings_count);
        setdata(data.message.release_date);
        setdescription(removeHTMLTags(data.message.description));
        setcompanygame(data.message.developers.map((dev) => dev.name)[0]);
        const platforms = data.message.platforms.map(
          (item) => item.platform.name
        );
        setplatforms(platforms);
        setimagegame(data.message.image);
        if (data.message.imageadd != null) {
          setimagegamebackground(data.message.imageadd);
        } else {
          setimagegamebackground(data.message.image);
        }
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
  }, [searchParams]);

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <div className="col-lg-3">
          <div class="img-container">
            <div className="positioning">
              <h1 className="h2title">{namegame}</h1>
              <p className="texttitle">
                Released on <span className="textdata">{data} </span> by{" "}
                <span className="texttitle1">{companyname} </span>
              </p>
            </div>
            <div className="positionimggame">
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
              ></img>
            </div>
          </div>
        </div>
        <div className="App-main">
          <div className="firstdivgame">
            <div className="divgame">
              <div className="divdescription">
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
                <img
                  src={star}
                  alt="Profile Picture"
                  class="ppic"
                  width="20"
                  height="20"
                ></img>
              </div>
              <div className="reviewbutton">
                <input
                  type="submit"
                  className="buttonsclass"
                  onClick={forumpage}
                  n
                  name="log"
                  id="log"
                  value="Forum"
                />
              </div>
              <div className="reviewbutton">
                <input
                  type="submit"
                  className="buttonsclassreview"
                  onClick={reviewgamepage}
                  name="log"
                  id="log"
                  value="Review Game"
                />
                <input
                  type="image"
                  src={wishlist}
                  width="35"
                  height="35"
                  name="log"
                  onClick={() => addWishlistGame()}
                />
              </div>
              <div className="graph">
                <img
                  src={graph}
                  width="300px"
                  height="100px"
                  alt="Logo Jogo"
                ></img>
                <p className="pgraph">Total Ratings: {ratings_count}</p>
              </div>
            </div>
            <div className="seconddiv">
              <div>
                <div className="gamebio">
                  <p className="pmargin1" id="gamebio">
                    {description}
                  </p>
                </div>
                <div className="whereplay">
                  <div>
                    <h3>Playable on:</h3>
                  </div>
                  <div className="platforms">
                    {Array.isArray(platforms) &&
                      platforms.map((platform, index) => (
                        <React.Fragment key={index}>
                          <p className="pmargin1">{platform}</p>
                          {index !== platforms.length - 1 && (
                            <p className="pmargin1">,&nbsp;</p>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
                <div className="seconddivgame">
                  <div className="rectangles">
                    <h3>Reviews:</h3>
                    <div className="rectanglecomments">
                      <h3>Melhor Jogo de Sempre</h3>
                      <p className="pmargin0">
                        Melhor jogo de sempre e de todo o sempre mesmo a sério
                      </p>
                      <div className="seconddivimage">
                        <img
                          img
                          id="imgsource"
                          src={kazzio}
                          width="30"
                          height="30"
                          className="imagereview"
                        ></img>
                        <p className="pmargin0">kazzio</p>
                      </div>
                    </div>
                    <div className="rectanglecomments">
                      <h3>Melhor Jogo de Sempre</h3>
                      <p className="pmargin0">
                        Melhor jogo de sempre e de todo o sempre mesmo a sério
                      </p>
                      <div className="seconddivimage">
                        <img
                          img
                          id="imgsource"
                          src={kazzio}
                          width="30"
                          height="30"
                          className="imagereview"
                        ></img>
                        <p className="pmargin0">kazzio</p>
                      </div>
                    </div>
                    <div className="rectanglecomments">
                      <h3>Melhor Jogo de Sempre</h3>
                      <p className="pmargin0">
                        Melhor jogo de sempre e de todo o sempre mesmo a sério
                      </p>
                      <div className="seconddivimage">
                        <img
                          img
                          id="imgsource"
                          src={kazzio}
                          width="30"
                          height="30"
                          className="imagereview"
                        ></img>
                        <p className="pmargin0">kazzio</p>
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
