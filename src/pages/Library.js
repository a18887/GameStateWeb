import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import styles from "./library.module.css";
import Grid from "@mui/material/Unstable_Grid2";

import god from "../img/godofwar.png";
import icon from "../img/accept.png";
import star from "../img/star.png";

import questionmark from "../img/questionmark.png";
import accept from "../img/accept.png";
import playbutton from "../img/playbutton.png";
import pause from "../img/pause.png";
import stop from "../img/stop.png";

export default function Library() {
  const [subscribedGames, setSubscribedGames] = useState([]);
  const [subscribedImages, setSubscribedImages] = useState([]);
  const [subscribedRatings, setSubscribedRatings] = useState([]);
  const [subscribedStatus, setSubscribedStatus] = useState([]);
  const [subscribedID, setSubscribedID] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicImages, setTopicImages] = useState([]);
  const [topicGameNames, setTopicGameNames] = useState([]);
  const navigate = useNavigate();

  function getSubscribedGames() {
    const user_id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/reviews/getreviewsbyuser", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const responseData = JSON.parse(xhr.responseText);
        const subscribedGames = responseData.subscribedgames;
        const subscribedRatings = responseData.ratings;
        const subscribedStatus = responseData.gameStatus;
        setSubscribedGames(subscribedGames.subscribedgames);
        setSubscribedRatings(subscribedRatings.ratings);
        setSubscribedStatus(subscribedStatus.gameStatus);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    const jsonData = {
      user_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }

  function getReviews() {
    const user_id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/reviews/searchbyuser", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const responseData = JSON.parse(xhr.responseText);
        const reviews = responseData.reviewsbyusernames;
        setReviews(reviews);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    const jsonData = {
      user_id,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }

  function getTopics() {
    const username = localStorage.getItem("user");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/topic/searchbyid", true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const responseData = JSON.parse(xhr.responseText);
        const topics = responseData.message.topics;
        const names = responseData.message.names;
        const images = responseData.message.images;
        setTopics(topics);
        setTopicGameNames(names);
        setTopicImages(images);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    const jsonData = {
      username,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
  }

  useEffect(() => {
    getSubscribedGames();
    getReviews();
    getTopics();
  }, []);

  useEffect(() => {
    const images = subscribedGames.filter((_, index) => index % 2 === 0);
    const id = subscribedGames.filter((_, index) => index % 2 === 1);
    setSubscribedImages(images.slice(0, 6));
    setSubscribedID(id.slice(0, 6));
  }, [subscribedGames]);

  const statusIcon = (code) => {
    switch (code) {
      case 0:
        return questionmark;
      case 1:
        return accept;
      case 2:
        return playbutton;
      case 3:
        return pause;
      case 4:
        return stop;
      default:
        return questionmark;
    }
  };

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <div className={styles.subscribed}>
          <h1>Subscribed Games</h1>
          {subscribedImages.map((image, index) => (
            <div
              className={styles.frame}
              onClick={() => navigate(`/gamepage?id=${subscribedID[index]}`)}
              key={subscribedID[index]}
            >
              <div className={styles.frameGameImage}>
                <img src={image} alt="game" id={styles.subscribedGames} />
              </div>
              <div className={styles.frameStatusIcon}>
                <img
                  src={statusIcon(subscribedStatus[index])}
                  alt="game"
                  id={styles.statusIcon}
                />
              </div>
              <div className={styles.rating}>
                <p id={styles.text}>{subscribedRatings[index]}</p>
                <img src={star} alt="game" id={styles.star} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.review}>
          <Grid container spacing={5}>
            <Grid xs={12} sm={6}>
              <h1>Reviews</h1>
              <Grid container spacing={5}>
                {reviews.map((review) => (
                  <Grid xs={12} sm={6} key={review._id}>
                    <div className={styles.frame2}>
                      <img src={review.image} alt="game" id={styles.game} />
                      <div>
                        <p className={styles.text}>{review.title}</p>
                        <p className={styles.date}>{review.game_name}</p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6}>
              <h1>Topics</h1>
              <Grid container={"true"} spacing={5}>
                {topics.map((topic, index) => (
                  <Grid item={"true"} xs={12} md={12} key={topic._id}>
                    <div className={styles.frame2}>
                      <img
                        src={topicImages[index]}
                        alt="game"
                        id={styles.game}
                        onClick={() => navigate(`/topicpage?id=${topic._id}`)}
                      />
                      <div>
                        <p className={styles.text}>{topic.name}</p>
                        <p className={styles.date}>{topicGameNames[index]}</p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
