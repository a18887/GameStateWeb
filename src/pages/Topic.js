import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./topic.css";
import pfp from "./../img/user.png";
import like from "../img/like.png";
import dislike from "../img/dislike.png";
import Header from "./Header";
var enter = 0;
var enter1 = 0;
export default function Topico() {
  const [namegame, setnamegame] = useState("");
  const [data, setdata] = useState("");
  const [companyname, setcompanygame] = useState("");
  const [imagegame, setimagegame] = useState("");
  const [topictext, settopictext] = useState("");
  const [topictitle, settopictitle] = useState("");
  const [like, setlike] = useState("");
  const [dislike, setdislike] = useState("");
  const username = localStorage.getItem("user");
  var likedislike = 0;
  const [usernameLD, setusernameLD] = useState("");
  const [usernametopic, setusernametopic] = useState("");
  const [text, settext] = useState("");
  const [commenttext, setcommenttext] = useState([]);
  const divisions = [];
  const [commentusername, setcommentusername] = useState([]);
  const [commentuserid, setcommentuserid] = useState("");
  const [commentdate, setcommentdate] = useState([]);
  const [imagegamebackground, setimagegamebackground] = useState("");
  const [searchParams] = useSearchParams();
  const [timedata, settimedata] = useState("");
  const navigate = useNavigate();
  const topic_id = "649c164f3f46c9ce0b95d05d";

  function gamepage() {
    navigate(`/gamepage?id=${searchParams.get("id")}`);
  }

  useEffect(() => {
    const id = searchParams.get("id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/game/searchbyid", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 200) {
          setnamegame(data.message.name);
          setdata(data.message.release_date);
          setcompanygame(data.message.developers.map((dev) => dev.name)[0]);
          setimagegame(data.message.image);

          if (data.message.imageadd != null) {
            setimagegamebackground(data.message.imageadd);
          } else {
            setimagegamebackground(data.message.image);
          }
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
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topic/searchbytopicid", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 200) {
          console.log(data);
          const createddata = data.message.topics.createdAt;
          const date = new Date(createddata);

          const formattedDate = {
            day: date.getDate(),
            month: convertmesday(date.getMonth() + 1),
            year: date.getFullYear(),
          };
          settimedata(formattedDate);
          settopictext(data.message.topics.text);
          settopictitle(data.message.topics.name);
          setcommentuserid(data.message.topics.user_id);
          setusernametopic(data.message.topics.username + ",");
          if (enter == 0) {
            for (let i = 0; i < data.message.topics.comments.length; i++) {
              setcommenttext((prevArray) => [
                ...prevArray,
                data.message.topics.comments[i].text,
              ]);
              setcommentusername((prevArray) => [
                ...prevArray,
                data.message.topics.comments[i].username,
              ]);
              const createddata = data.message.topics.comments[i].createdAt;
              const date = new Date(createddata);
              const formattedDate = {
                day: date.getDate(),
                month: convertmesday(date.getMonth() + 1),
                year: date.getFullYear(),
              };
              setcommentdate((prevArray) => [...prevArray, formattedDate]);
            }

            for (let i = 0; i < data.message.topics.likeDislike.length; i++) {
              if (data.message.topics.likeDislike[i].username == username) {
                setusernameLD(username);
              }
            }
          }
          setlike(data.message.topics.likes);
          setdislike(data.message.topics.dislikes);
          enter = 1;
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    const jsonData = {
      topic_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }, [topic_id]);

  for (let i = 0; i < commenttext.length; i++) {
    divisions.push(<div key={i}></div>);
  }

  const commentinput = async (e) => {
    e.preventDefault();
    const user_id = commentuserid;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topic/createcomment", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 200) {
          console.log(data);
          setcommenttext((prevArray) => [...prevArray, text]);
          setcommentdate((prevArray) => [...prevArray, "just now"]);
          setcommentusername((prevArray) => [
            ...prevArray,
            localStorage.getItem("username"),
          ]);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    const jsonData = {
      text,
      user_id,
      topic_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  };

  useEffect(() => {
    if (like == 0 && dislike == 0) {
      likedislike = 0;
    } else {
      likedislike = 1;
    }
    likedislikefunc();
  }, [like, dislike]);

  function likefunction() {
    setlike((prevLike) => (prevLike + 1) % 2);
    setdislike(0);
  }

  const likedislikefunc = () => {
    const likes = like;
    const dislikes = dislike;
    const likeDislike = likedislike;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topic/likedislike", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    const jsonData = {
      topic_id,
      likes,
      dislikes,
      likeDislike,
      username,
      usernameLD,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  };

  function dislikefunction() {
    setdislike((prevLike) => (prevLike + 1) % 2);
    setlike(0);
  }

  return (
    <>
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
          <div className="seconddivtopic">
            <div className="topicbody">
              <div className="topiccommentmain">
                <div className="topiccomment">
                  <div className="topictitle">
                    <h1 className="topictexth1">{topictitle}</h1>
                  </div>
                  <div className="topicdesc">
                    <p className="topictext">
                      <span className="topictextname">{usernametopic}</span>{" "}
                      {timedata.day} {timedata.month} {timedata.year}
                    </p>
                  </div>
                </div>
                <p className="topictextreview">{topictext}</p>
              </div>
              <div className="btnlikesdislikes">
                <button class="like__btn" onClick={likefunction}>
                  <span id="icon">
                    <i class="fa fa-thumbs-up"></i>
                  </span>
                  <span id="count">{like}</span>
                </button>
                <button class="dislike__btn" onClick={dislikefunction}>
                  <span id="icon">
                    <i class="fa fa-thumbs-down"></i>
                  </span>
                  <span id="count">{dislike}</span>
                </button>
              </div>
              <div className="edittexttopic">
                <textarea
                  rows="9"
                  cols="10"
                  placeholder="Write a comment"
                  id="buttoncomment"
                  autocomplete="off"
                  onChange={(e) => settext(e.target.value)}
                  value={text}
                />
              </div>
              <div className="commentbuttondivmain">
                <div className="editbuttoncomment">
                  <input
                    type="submit"
                    id="buttoncommentadd"
                    name="log"
                    onClick={commentinput}
                    value="ADD COMMENT"
                  />
                </div>
              </div>

              <div className="rectanglestopic">
                <h3>Comments:</h3>
              </div>
              <div className="commentssection">
                {divisions.map((division, index) => (
                  <React.Fragment key={index}>
                    {division}
                    <div className="commentsflex">
                      <div className="userimage">
                        <img
                          src={pfp}
                          alt="profile picture"
                          width="40"
                          height="40"
                          style={{ borderRadius: "50%", marginRight: "10px" }}
                        />
                        <div className="divcomment">
                          <p className="topictextuser" key={index}>
                            {commentusername[index]}
                          </p>
                          <p className="textcomment" key={index}>
                            {commenttext[index]}
                          </p>
                        </div>
                      </div>
                      <div className="userimage">
                        <p className="textdatatopiccomment" key={index}>
                          {typeof commentdate[index] !== "string" ? (
                            <>
                              {commentdate[index].day}{" "}
                              {commentdate[index].month}{" "}
                              {commentdate[index].year}
                            </>
                          ) : (
                            commentdate[index]
                          )}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
