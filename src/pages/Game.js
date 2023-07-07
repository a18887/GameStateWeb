import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./gamepage.css";
import kazzio from "../img/kazzio.png";
import wishlist from "../img/buttonwishlist.png";
import Header from "./Header";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

var enter = 0;

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function Game() {
  const [namegame, setnamegame] = useState("");
  const [data, setdata] = useState("");
  const [ratings_count, setrating] = useState("");
  const [ratings_media, setratings_media] = useState("");
  const [companyname, setcompanygame] = useState("");
  const [imagegame, setimagegame] = useState("");
  const [ratingarray, setratingarray] = useState([]);
  const [imagegamebackground, setimagegamebackground] = useState("");
  const [description, setdescription] = useState("");
  const [platforms, setplatforms] = useState("");
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const data1 = Array(10).fill(0);

  const graph = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Rating per star",
        data: ratingarray,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0, // Set the minimum value for the y-axis
        max: ratings_count, // Set the maximum value for the y-axis
      },
      x: {
        min: 0, // Set the minimum value for the y-axis
        max: 10, // Set the maximum value for the y-axis
      },
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  function removeHTMLTags(text) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function forumpage() {
    navigate(`/forum?id=${searchParams.get("id")}`);
  }

  function reviewgamepage() {
    navigate(`/reviewgame?id=${searchParams.get("id")}`);
  }

  function removeWishlistGame() {
    const game_id = searchParams.get("id");
    const user_id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "DELETE",
      `http://localhost:3000/users/${user_id}/wishlist/${game_id}`,
      true
    );
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
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
    xhr.open("POST", `http://localhost:3000/users/${user_id}/wishlist`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
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
    xhr.open("GET", `http://localhost:3000/games/${id}/reviews`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          setrating(responseData.numberOfReviews);
          var soma = 0;

          for (let i = 0; i < responseData.reviewsgame.length; i++) {
            soma = soma + responseData.reviewsgame[i].rating;
          }

          const media = Math.round(soma / responseData.reviewsgame.length);
          setratings_media(media);

          if (enter == 0) {
            for (let i = 0; i < responseData.reviewsgame.length; i++) {
              switch (responseData.reviewsgame[i].rating) {
                case 1:
                  data1[0] = data1[0] + 1;
                  break;
                case 2:
                  data1[1] = data1[1] + 1;
                  break;
                case 3:
                  data1[2] = data1[2] + 1;
                  break;
                case 4:
                  data1[3] = data1[3] + 1;
                  break;
                case 5:
                  data1[4] = data1[4] + 1;
                  break;
                case 6:
                  data1[5] = data1[5] + 1;
                  break;
                case 7:
                  data1[6] = data1[6] + 1;
                  break;
                case 8:
                  data1[7] = data1[7] + 1;
                  break;
                case 9:
                  data1[8] = data1[8] + 1;
                  break;
                case 10:
                  data1[9] = data1[9] + 1;
                  break;
                default:
                  break;
              }
              //if(responseData.reviewsgame[i].rating)
              setratingarray(data1);
            }
          }
          enter = 1;
        } else if (responseData.status === 203) {
          setrating(0);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr.send();
  }, [searchParams]);

  useEffect(() => {
    const id = searchParams.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/games/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 200) {
          setnamegame(data.message.name);
          setdata(data.message.release_date);
          setdescription(removeHTMLTags(data.message.description));
          setcompanygame(data.message.developers.map((dev) => dev.name)[0]);
          const platforms = data.message.platforms.map(
            (item) => item.platform.name
          );
          setplatforms(platforms);
          if (data.message.image != null && data.message.imageadd != null) {
            setimagegame(data.message.image);
            setimagegamebackground(data.message.imageadd);
          } else if (
            data.message.image != null &&
            data.message.imageadd == null
          ) {
            setimagegame(data.message.image);
            setimagegamebackground(data.message.image);
          } else {
            setimagegame(null);
            setimagegamebackground(null);
          }
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    xhr.send();
  }, [searchParams]);

  function getReviews() {
    const gameId = searchParams.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/games/${gameId}/reviews`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          const reviews = responseData.reviewsgame;
          setReviews(reviews);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr.send();
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <div className="col-lg-3">
          <div class="img-container">
            {imagegame != null && (
              <div className="positioning" id="positionimgid">
                <h1 className="h2title">{namegame}</h1>
                <p className="texttitle">
                  Released on <span className="textdata">{data} </span> by{" "}
                  <span className="texttitle1">{companyname} </span>
                </p>
              </div>
            )}
            {imagegame != null && (
              <div className="positionimggame" id="imagedivdisplay">
                <img
                  src={imagegame}
                  className="imggame"
                  width="330px"
                  height="330px"
                  alt="Logo Jogo"
                ></img>
              </div>
            )}
            <div className="imagebackground">
              <img
                src={imagegamebackground}
                height="550px"
                className="gameimgback"
              ></img>
            </div>
          </div>
          <div className="App-main">
            <div className="firstdivgame">
              <div className="divgame">
                <div className="divdescription">
                  <div className="rating-stars">
                    {[...Array(10)].map((_, index) => (
                      <span
                        key={index}
                        className={`stargame ${
                          ratings_media >= index + 1 ? "filled" : ""
                        }`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
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
                    onClick={() => addWishlistGame()}
                    width="35"
                    height="35"
                    name="log"
                  />
                </div>
                <div className="graph">
                  <div>
                    <Bar data={graph} options={options} />
                  </div>
                  {ratings_count !== null &&
                  ratings_count !== "" &&
                  ratings_count !== undefined ? (
                    <p className="pgraph">Total Ratings: {ratings_count}</p>
                  ) : (
                    <p className="pgraph">Total Ratings: 0</p>
                  )}
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
                      {reviews.map((review) => (
                        <div className="rectanglecomments">
                          <h3>{review.title}</h3>
                          <p className="pmargin0">{review.text}</p>
                          <div className="seconddivimage">
                            <img
                              img
                              id="imgsource"
                              src={kazzio}
                              width="30"
                              height="30"
                              className="imagereview"
                            ></img>
                            <p className="pmargin0">{review.username}</p>
                          </div>
                        </div>
                      ))}
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
