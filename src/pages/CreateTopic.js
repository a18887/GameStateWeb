import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import styles from "./createTopic.module.css";
import Grid from "@mui/material/Unstable_Grid2";

import god from "../img/godofwar.png";

export default function CreateTopic() {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <div className="Appprinicipal">
        <Grid container spacing={10} className={styles.createTopic}>
          <Grid xs={12} sm={6}>
            <h1>New Topic</h1>
            <form>
              <div>
                <h3>Topic Title</h3>
                <input
                  placeholder="Write your topic title"
                  type="text"
                  id={styles.text}
                ></input>
              </div>
              <div>
                <h3>Topic Text</h3>
                <textarea
                  placeholder="Say something..."
                  id={styles.textarea}
                ></textarea>
              </div>
            </form>
          </Grid>
          <Grid sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <h1>The Last of Us Part II</h1>
            <div className={styles.game}>
              <img src={god} id={styles.game}></img>
              <label>
                <b>Released: </b>09/11/2022
              </label>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
