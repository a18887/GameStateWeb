import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import pfp from "./../img/user.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius + 5,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&::placeholder": {
      color: "white",
      opacity: 0.7,
    },
  },
}));

const SearchResultList = styled(List)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 9999,
  width: "100%",
  borderRadius: theme.shape.borderRadius + 5,
  background: "#24292F",
  boxShadow: theme.shadows[5],
  marginTop: theme.spacing(1),
}));

const SearchResultItemText = styled(ListItemText)(({ theme }) => ({
  color: "black",
}));

export default function PrimarySearchAppBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchResultsID, setSearchResultsID] = React.useState([]);
  const [username, setUsername] = React.useState("user");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleListItemClick = (id) => {
    navigate(`/gamepage?id=${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.username);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/game/search", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status === 201) {
          const responseData = JSON.parse(xhr.responseText);
          const responseArray = responseData.game;
          const responseArrayID = responseData.id;
          if (responseArray == "Game not found") {
            setSearchResults(["No Results..."]);
            setSearchResultsID([0]);
          } else {
            setSearchResults(responseArray.slice(0, 5));
            setSearchResultsID(responseArrayID.slice(0, 5));
          }
        } else {
          console.error("Request failed. Status:", xhr.status);
        }
      };

      xhr.onerror = () => {
        console.error("Request failed. Network error.");
      };

      const jsonData = {
        name: searchValue,
      };

      const payload = JSON.stringify(jsonData);
      xhr.send(payload);
    };

    const delayTimer = setTimeout(() => {
      if (searchValue !== "") {
        fetchData();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchValue]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#24292F" }}>
        <Toolbar>
          <img
            src={pfp}
            alt="profile picture"
            width="40"
            height="40"
            style={{
              borderRadius: "50%",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profilepage")}
          ></img>
          <Typography
            variant="h9"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {username}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a game..."
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
            {searchValue && (
              <SearchResultList>
                {searchResults.map((result, index) => (
                  <ListItem key={searchResultsID[index]}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        onClick={() => {
                          if (searchResultsID[index] !== 0) {
                            handleListItemClick(searchResultsID[index]);
                          }
                        }}
                        style={{ textTransform: "none" }}
                      >
                        <SearchResultItemText primary={result} />
                      </Button>
                    </div>
                  </ListItem>
                ))}
              </SearchResultList>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <a style={{ color: "white", marginLeft: "16px" }}>Logout</a>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
