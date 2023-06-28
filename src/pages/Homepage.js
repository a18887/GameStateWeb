import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import styles from "./homepage.module.css";
import Grid from "@mui/material/Unstable_Grid2";

export default function Homepage() {
  const [popularGames, setPopularGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [popularImages, setPopularImages] = useState([]);
  const [popularID, setPopularID] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://localhost:3000/game/?ordering=releasedate", true);
    xhr1.onload = () => {
      if (xhr1.status === 200) {
        const responseData = JSON.parse(xhr1.responseText);
        const responseArray = responseData.message;
        setRecentGames(responseArray);
      } else {
        console.error("Request failed. Status:", xhr1.status);
      }
    };

    xhr1.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr1.send();

    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "http://localhost:3000/game/?ordering=-releasedate", true);
    xhr2.onload = () => {
      if (xhr2.status === 200) {
        const responseData = JSON.parse(xhr2.responseText);
        const responseArray = responseData.message;
        setUpcomingGames(responseArray);
      } else {
        console.error("Request failed. Status:", xhr1.status);
      }
    };

    xhr2.onerror = () => {
      console.error("Request failed. Network error.");
    };

    xhr2.send();
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
              {recentGames.map((game) => (
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
              <h1>Recently Reviewed</h1>
              <h1>TODO</h1>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
