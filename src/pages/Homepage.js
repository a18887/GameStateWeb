import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import styles from "./homepage.module.css";
import Grid from "@mui/material/Unstable_Grid2";

export default function Homepage() {
  const [popularGames, setPopularGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [recentlyReviewedGames, setRecentlyReviewedGames] = useState([]);
  const [popularImages, setPopularImages] = useState([]);
  const [popularID, setPopularID] = useState([]);
  const navigate = useNavigate();

  function getPopularGames() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/game/search", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) {
        const responseData = JSON.parse(xhr.responseText);
        const responseArray = responseData.populargames;
        setPopularGames(responseArray);
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };

    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr.send();
  }

  function getRecentlyReleasedGames() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/game/?ordering=releasedate", true);
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (data.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          const responseArray = responseData.message;
          setRecentGames(responseArray);
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

  function getUpcomingReleasedGames() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/game/?ordering=-releasedate", true);
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (data.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          const responseArray = responseData.message;
          setUpcomingGames(responseArray);
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

  function getRecentlyReviewedGames() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/reviews?ordering=releasedate", true);
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        if (data.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          const responseArray = responseData.message;
          const updatedArray = responseArray.slice(0, 9).map((item) => {
            const dateStr = item.createdAt;
            const date = new Date(dateStr).toISOString().split("T")[0];

            return {
              ...item,
              createdAt: date,
            };
          });
          setRecentlyReviewedGames(updatedArray);
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
    getPopularGames();
    getRecentlyReleasedGames();
    getUpcomingReleasedGames();
    getRecentlyReviewedGames();
  }, []);

  useEffect(() => {
    const filteredArray = popularGames.filter((_, index) => index % 2 === 0);
    const filteredArrayID = popularGames.filter((_, index) => index % 2 === 1);
    setPopularImages(filteredArray);
    setPopularID(filteredArrayID);
  }, [popularGames]);

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <div className={styles.popular}>
          <h1>Popular Games</h1>
          {popularImages.map((image, index) => (
            <div className={styles.frame} key={popularID[index]}>
              <img
                src={image}
                alt="game"
                id={styles.populargame}
                onClick={() => navigate(`/gamepage?id=${popularID[index]}`)}
              />
            </div>
          ))}
        </div>
        <div className={styles.recent}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} md={4}>
              <h1>Recently Released</h1>
              {recentGames.map((game, index) => (
                <div className={styles.frame2} key={index}>
                  <img
                    src={game.image}
                    alt="game"
                    id={styles.game}
                    onClick={() => navigate(`/gamepage?id=${game.id}`)}
                  />
                  <div>
                    <p className={styles.text}>{game.name}</p>
                    <p className={styles.date}>{game.released}</p>
                  </div>
                </div>
              ))}
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <h1>Upcoming Releases</h1>
              {upcomingGames.map((game) => (
                <div className={styles.frame2}>
                  <img
                    src={game.image}
                    alt="game"
                    id={styles.game}
                    onClick={() => navigate(`/gamepage?id=${game.id}`)}
                  />
                  <div>
                    <p className={styles.text}>{game.name}</p>
                    <p className={styles.date}>{game.released}</p>
                  </div>
                </div>
              ))}
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <h1>Recent Reviews</h1>
              {recentlyReviewedGames.map((review) => (
                <div className={styles.frame2}>
                  <div>
                    <p
                      className={styles.text}
                      onClick={() =>
                        navigate(`/gamepage?id=${review.forum_id}`)
                      }
                    >
                      {review.title}
                    </p>
                    <p className={styles.date}>{review.createdAt}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
