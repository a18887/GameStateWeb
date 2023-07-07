import { useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./forum.css";
import kazzio from "../img/kazzio.png";
import pfp from "./../img/user.png";
import Header from "./Header";
import mapImg from "../img/mapImg.png";

export default function Forum() {
  const [topictext, settopictext] = useState([]);
  const [topictitle, settopictitle] = useState([]);
  const [topics, settopics] = useState([]);
  const [topicuser, settopicuser] = useState("");
  const [commentdate, setcommentdate] = useState([]);
  const divisions = [];
  const [namegame, setnamegame] = useState("");
  const [data, setdata] = useState("");
  const [ratings_count, setrating] = useState("");
  const [companyname, setcompanygame] = useState("");
  const [imagegame, setimagegame] = useState("");
  const [searchParams] = useSearchParams();
  const [imagegamebackground, setimagegamebackground] = useState("");
  const [description, setdescription] = useState("");
  const [platforms, setplatforms] = useState("");
  const [gameId, setGameId] = useState("");

  const navigate = useNavigate();

  const topic_id = "649db41b60116fbbd903d104";

  function removeHTMLTags(text) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function gamepage() {
    navigate(`/gamepage?id=${searchParams.get("id")}`);
  }

  function createTopic() {
    navigate(`/createtopic?id=${searchParams.get("id")}`);
  }

  useEffect(() => {
    const id = searchParams.get("id");
    setGameId(id);
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/games/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 200) {
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
  }, []);

  function convertmesday(mes) {
    if (mes == 1) {
      return "Jan";
    } else if (mes == 2) {
      return "Fev";
    } else if (mes == 3) {
      return "Mar";
    } else if (mes == 4) {
      return "Apr";
    } else if (mes == 5) {
      return "May";
    } else if (mes == 6) {
      return "Jun";
    } else if (mes == 7) {
      return "Jul";
    } else if (mes == 8) {
      return "Aug";
    } else if (mes == 9) {
      return "Sep";
    } else if (mes == 10) {
      return "Oct";
    } else if (mes == 11) {
      return "Nov";
    } else if (mes == 12) {
      return "Dec";
    }
  }

  function getTopics() {
    const id = searchParams.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/games/${id}/topics`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("teste");
        console.log(data);
        if (data.status === 200) {
          settopics(data.topics);
          console.log("ola" + topics);

          for (let i = 0; i < data.topics.length; i++) {
            settopictitle((prevArray) => [...prevArray, data.topics[i].name]);
            settopictext((prevArray) => [...prevArray, data.topics[i].text]);
            const createddata = data.topics.createdAt;
            const date = new Date(createddata);
            const formattedDate = {
              day: date.getDate(),
              month: convertmesday(date.getMonth() + 1),
              year: date.getFullYear(),
            };
            setcommentdate((prevArray) => [...prevArray, formattedDate]);
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
  }

  useEffect(() => {
    getTopics();
  }, []);

  for (let i = 0; i < topics.length; i++) {
    divisions.push(<div key={i}></div>);
  }

  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="Appprinicipal">
          <div className="col-lg-3">
            <div class="img-container">
              {imagegame != null && (
                <div className="positionimgtopic">
                  <h1 className="h2title">{namegame}</h1>
                  <p className="texttitle">
                    Released on <span className="textdata">{data} </span> by{" "}
                    <span className="texttitle1">{companyname} </span>
                  </p>
                </div>
              )}
              {imagegame != null && (
                <div className="imggametopic">
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
                <div className="forumtitle">
                  <h1 className="forumtext">Forum</h1>
                </div>
                <div className="dropdownbox">
                  <select size={1}>
                    <option value="option1">Trending</option>
                    <option value="option2">New</option>
                    <option value="option3">Most liked</option>
                  </select>
                  <div className="linedropdownbox"></div>
                </div>
                <div className="createtopicbutton">
                  <input
                    type="submit"
                    className="buttonsclasscreatetopic"
                    onClick={createTopic}
                    n
                    name="log"
                    id="log"
                    value="CREATE TOPIC"
                  />
                </div>
                <div className="rectangles">
                  <h3>Topics:</h3>
                  {topics.map((topic) => (
                    <div
                      className="rectanglecomments"
                      id="rectanglecommentsForum"
                      onClick={() =>
                        navigate(`/topicpage?id=${topic._id}&game_id=${gameId}`)
                      }
                    >
                      <h3>{topic.name}</h3>
                      <p className="pmargin0">{topic.text}</p>
                      <div className="seconddivimage">
                        <img
                          img
                          id="imgsource"
                          src={kazzio}
                          width="30"
                          height="30"
                          className="imagereview"
                        ></img>
                        <p className="pmargin0">{topic.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
