import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import styles from "./profilpage.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import pfp from "./../img/user.png";
import questionmark from "../img/questionmark.png";
import accept from "../img/accept.png";
import playbutton from "../img/playbutton.png";
import pause from "../img/pause.png";
import stop from "../img/stop.png";
import star from "./../img/star1.png";

export default function Profile() {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const [usercountry, setusercountry] = useState([]);
  const [subscribedGames, setSubscribedGames] = useState([]);
  const [subscribedImages, setSubscribedImages] = useState([]);
  const [subscribedRatings, setSubscribedRatings] = useState([]);
  const [subscribedStatus, setSubscribedStatus] = useState([]);
  const [subscribedID, setSubscribedID] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lastreview, setLastReview] = useState([]);
  const [reviewlastdata, setreviewlastdata] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicImages, setTopicImages] = useState([]);
  const [lasttopic, setLastTopic] = useState([]);
  const [lasttopicimage, setLastTopicImage] = useState([]);
  const [topiclastdata, settopiclastdata] = useState([]);
  const [topicGameNames, setTopicGameNames] = useState([]);
  const [wislistuser, setwishlistuser] = useState([]);
  const [wishlistnumber, setwishlistnumber] = useState([]);

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
  function getUser() {
    const id = localStorage.getItem("id");
    console.log("ola" + id);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/${id}`, true);
    const token = localStorage.getItem("token");
    console.log("ola" + token);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          const createddata = responseData.message.createdAt;
          console.log("ola" + createddata);
          const date = new Date(createddata);
          const formattedDate = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          };
          setuserdata(formattedDate);
          setusercountry(responseData.message.country);
          console.log(responseData);
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

  function getSubscribedGames() {
    const id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/${id}/subscribedgames`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          const subscribedGames = responseData.subscribedgames;
          const subscribedRatings = responseData.ratings;
          const subscribedStatus = responseData.gameStatus;
          setSubscribedGames(subscribedGames.subscribedgames);
          setSubscribedRatings(subscribedRatings.ratings);
          setSubscribedStatus(subscribedStatus.gameStatus);
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

  function getReviews() {
    const id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/${id}/reviews`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          const reviews = responseData.reviewsbyusernames;
          if (reviews.length > 0) {
            const lastReview = reviews[reviews.length - 1];
            console.log(lastReview);
            const createddata = lastReview.createdAt;
            const date = new Date(createddata);
            const formattedDate = {
              day: date.getDate(),
              month: convertmesday(date.getMonth() + 1),
              year: date.getFullYear(),
            };
            setreviewlastdata(formattedDate);
            setLastReview(lastReview);
            setReviews(reviews);
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

  function getTopics() {
    const username = localStorage.getItem("user");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/${username}/topics`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);

        console.log(responseData);

        if (responseData.status === 200) {
          const topics = responseData.message.topics;
          if (topics.length > 0) {
            const lastTopic = topics[topics.length - 1];
            setLastTopic(lastTopic);
            const createddata = lastTopic.createdAt;
            const date = new Date(createddata);
            const formattedDate = {
              day: date.getDate(),
              month: convertmesday(date.getMonth() + 1),
              year: date.getFullYear(),
            };
            settopiclastdata(formattedDate);
            setTopics(topics);

            const names = responseData.message.names;
            const images = responseData.message.images;

            setTopicGameNames(names);

            setTopicImages(images);
            setLastTopicImage(images[images.length - 1]);
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

  function getWishlist() {
    const id = localStorage.getItem("id");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/users/${id}/wishlist`, true);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.status === 200) {
          if (responseData.wishlistbyusernames.length > 0) {
            const wishlist = responseData.wishlistbyusernames;
            setwishlistnumber(wishlist);
            for (let i = 0; i < responseData.wishlistbyusernames.length; i++) {
              console.log(responseData.wishlistbyusernames[i].image);
              setwishlistuser((prevArray) => [
                ...prevArray,
                responseData.wishlistbyusernames[i].image,
              ]);
            }
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
    getSubscribedGames();
    getReviews();
    getTopics();
    getUser();
    getWishlist();
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
        <div className={styles.popular}>
          <Grid container spacing={10}>
            <Grid xs={12} sm={12} md={4}>
              <div className={styles.divimg}>
                <img
                  src={pfp}
                  alt="profile picture"
                  width="88%"
                  height="80%"
                  style={{ borderRadius: "50%" }}
                ></img>
                <p className={styles.pclass}>{localStorage.getItem("user")}</p>

                <div className={styles.divflexinfo}>
                  <img
                    src={pfp}
                    alt="profile picture"
                    width="30px"
                    height="30px"
                    style={{ borderRadius: "50%" }}
                  ></img>
                  {usercountry !== undefined && (
                    <p className={styles.pclass1}>{usercountry}</p>
                  )}
                </div>

                <p className={styles.pclass1}>
                  Joined: {userdata.day}/{userdata.month}/{userdata.year}
                </p>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={4}>
              <h1>Most recent review</h1>

              <div className={styles.divflexgamesection}>
                <div className={styles.divflexgamesectionrating}>
                  <div className={styles.frame}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={lastreview.image}
                        alt="game"
                        id={styles.subscribedGames}
                        onClick={() =>
                          navigate(`/gamepage?id=${lastreview.forum_id}`)
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.rating}>
                    <p id={styles.text}>{lastreview.rating}</p>
                    <img src={star} alt="game" id={styles.star} />
                  </div>
                </div>
                <div className={styles.divflexgamesectiontext}>
                  <h3>{lastreview.title}</h3>
                  <p className={styles.pclass0}>{lastreview.text}</p>
                  <h5>
                    Posted {reviewlastdata.day} {reviewlastdata.month}{" "}
                    {reviewlastdata.year}
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <h1>Most recent topic</h1>
              <div className={styles.divflexgamesection}>
                <div className={styles.divflexgamesectionrating}>
                  <div className={styles.frame}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={lasttopicimage}
                        alt="game"
                        id={styles.subscribedGames}
                        onClick={() =>
                          navigate(
                            `/topicpage/${lasttopic._id}?game_id=${lasttopic.forum_id}`
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.divflexgamesectiontext}>
                  <h3>{lasttopic.name}</h3>
                  <p className={styles.pclass0}>{lasttopic.text}</p>
                  <h5>
                    Posted {topiclastdata.day} {topiclastdata.month}{" "}
                    {topiclastdata.year}
                  </h5>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.recent}>
          <Grid container spacing={10}>
            <Grid xs={12} sm={6} md={3}>
              <h1>Subscribed Games</h1>
              <Grid container spacing={5}>
                {subscribedImages.map((image, index) => (
                  <Grid xs={12} sm={6} key={subscribedID[index]}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={image}
                        alt="game"
                        id={styles.subscribedGames}
                        onClick={() =>
                          navigate(`/gamepage?id=${subscribedID[index]}`)
                        }
                      />
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
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <h1>Reviews</h1>
              <Grid container spacing={5}>
                {reviews.map((review) => (
                  <Grid xs={12} sm={6} key={review._id}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={review.image}
                        alt="game"
                        id={styles.subscribedGames}
                        onClick={() =>
                          navigate(`/gamepage?id=${review.forum_id}`)
                        }
                      />
                    </div>

                    <div className={styles.rating}>
                      <p id={styles.text}>{review.rating}</p>
                      <img src={star} alt="game" id={styles.star} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <h1>Wishlist</h1>
              <Grid container spacing={5}>
                {wishlistnumber.map((wishlist, index) => (
                  <Grid xs={12} sm={6} key={wishlist._id}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={wishlist.image}
                        alt="game"
                        id={styles.subscribedGames}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <h1>Topics</h1>
              <Grid container spacing={5}>
                {topics.map((topic, index) => (
                  <Grid item={"true"} xs={12} md={12} key={topic._id}>
                    <div className={styles.frameGameImage}>
                      <img
                        src={topicImages[index]}
                        alt="game"
                        id={styles.subscribedGames}
                        onClick={() =>
                          navigate(`/gamepage?id=${topic.forum_id}`)
                        }
                      />
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
