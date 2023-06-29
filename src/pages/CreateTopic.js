import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header.js";
import styles from "./createTopic.module.css";
import Grid from "@mui/material/Unstable_Grid2";

import god from "../img/godofwar.png";

export default function CreateTopic() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [searchParams] = useSearchParams();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  function removeHTMLTags(text) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || "";
  }

  const handleFormOnSubmit = async (e) => {
    e.preventDefault();
    const forum_id = searchParams.get("game_id");
    const user_id = localStorage.getItem("id");
    if (!forum_id || !user_id) {
      navigate("/homepage");
    }
    if (!name || !text) {
      setErrMsg("Fill in all fields");
      return;
    }
    setErrMsg("");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topic/create", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        if (data.status == 200) {
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
        >
          {errMsg}
        </p>
      );
    } else return;
  }

  useEffect(() => {
    const id = searchParams.get("game_id");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/game/searchbyid", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        if (data.status == 200) {
          setImage(data.message.image);
          setReleaseDate(data.message.release_date);
          setDescription(removeHTMLTags(data.message.description));
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
  }, []);

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <Grid container spacing={10} className={styles.createTopic}>
          <Grid xs={12} sm={6}>
            <h1>New Topic</h1>
            <Error />
            <form onSubmit={handleFormOnSubmit}>
              <div>
                <h3>Topic Title</h3>
                <input
                  placeholder="Write your topic title"
                  type="text"
                  autoComplete="off"
                  id={styles.text}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <h3>Topic Text</h3>
                <textarea
                  placeholder="Say something..."
                  id={styles.textarea}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div id={styles.submit}>
                <input type="submit" value="Create Topic"></input>
              </div>
            </form>
          </Grid>
          <Grid
            sm={6}
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ maxHeight: "200px" }}
          >
            <h1>The Last of Us Part II</h1>
            <div className={styles.game}>
              <img src={image} id={styles.game}></img>
              <label>
                <b>Released: </b>
                {releaseDate}
              </label>
            </div>
            <p>{description}</p>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
