import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header.js";
import "./createTopic.css";

export default function CreateTopic() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [developer, setDeveloper] = useState("");
  const [gameName, setGameName] = useState("");

  const [searchParams] = useSearchParams();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleFormOnSubmit = async (e) => {
    e.preventDefault();
    const forum_id = searchParams.get("id");
    const user_id = localStorage.getItem("id");
    if (!forum_id || !user_id) {
      alert("Unknown error");
      navigate("/homepage");
    }
    if (!name || !text) {
      setErrMsg("Fill in all fields");
      return;
    }
    setErrMsg("");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topics", true);
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
      name,
      text,
      user_id,
      forum_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  };

  function Error() {
    if (errMsg) {
      return (
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
          style={{ marginBottom: "10px" }}
        >
          {errMsg}
        </p>
      );
    } else return;
  }

  useEffect(() => {
    const id = searchParams.get("id");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/games/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (data.status === 200) {
          setGameName(data.message.name);
          console.log(data)
          if(data.message.developers.length > 0)
          setDeveloper(data.message.developers[0].name);
          if(data.message.image!=null && data.message.imageadd != null ){
            setImage(data.message.image);
            setBackgroundImage(data.message.imageadd);
          }
          else if(data.message.image!=null && data.message.imageadd == null )
          {
            setImage(data.message.image);
            setBackgroundImage(data.message.image);
          }
          else{
            setImage(null);
            setBackgroundImage(null);
          }
         
          
          setReleaseDate(data.message.release_date);
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

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <div className="col-lg-3">
          <div class="img-container">
          {image!=null &&(
            <div className="positionimgtopic">
              <h1 className="h2title">{gameName}</h1>
              <p className="texttitle">
                Released on <span className="textdata">{releaseDate} </span> by{" "}
                <span className="texttitle1">{developer} </span>
              </p>
            </div>
            )}
            {image!=null &&(
            <div className="imggametopic">
              <img
                src={image}
                className="imggame"
                width="330px"
                height="330px"
                alt="Logo Jogo"
              ></img>
            </div>
            )}
            <div className="imagebackground">
              <img
                src={backgroundImage}
                height="550px"
                className="gameimgback"
                alt="background"
              ></img>
            </div>
          </div>
        </div>
        <div className="createTopic">
          <h1>New Topic</h1>
          <Error />
          <form onSubmit={handleFormOnSubmit}>
            <div>
              <h3>Topic Title</h3>
              <input
                placeholder="Write your topic title"
                type="text"
                autoComplete="off"
                id="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <h3>Topic Text</h3>
              <textarea
                placeholder="Say something..."
                id="textarea"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div id="submit">
              <input
                type="submit"
                id="createTopicButton"
                value="Create Topic"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
