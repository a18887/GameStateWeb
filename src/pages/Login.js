import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import img from "../img/logo.png";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
    if (localStorage.getItem("token")) navigate("/homepage");
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, setusername]);

  const handleSubmitlogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrMsg("Fill in all fields");
      return;
    }
    setErrMsg("");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/user/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        console.log(data);
        if (data.status == 200) {
          localStorage.setItem("id", data.id);
          localStorage.setItem("user", data.username);
          localStorage.setItem("token", data.token);
          navigate("/homepage");
          setErrMsg("");
        } else {
          setErrMsg(data.message);
        }
      } else {
        console.error("Request failed. Status:", xhr.status);
      }
    };
    xhr.onerror = () => {
      console.error("Request failed. Network error.");
    };
    const jsonData = {
      username,
      password,
    };

    const payload = JSON.stringify(jsonData);
    xhr.send(payload);
    setusername("");
    setpassword("");
  };

  const registerpage = () => {
    navigate("/register");
  };

  const forgotpasswordpage = () => {
    navigate("/forgotpassword");
  };

  return (
    <>
      <div className="App">
        <div className="App-main">
          <div className="firstdiv">
            <img src={img} alt="Logo GameState" className="logo"></img>
            <p>
              Login to access a lot of game reviews and get to make your OWN!
            </p>
          </div>
          <div className="login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handleSubmitlogin}>
              <div className="edittext">
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autocomplete="off"
                  ref={userRef}
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="edittext">
                <label>
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autocomplete="off"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="newgamestate">
                <p className="forgetp">
                  Forgot your password? Reset it{" "}
                  <a onClick={forgotpasswordpage}>here</a>
                </p>
              </div>
              <div className="editbutton">
                <input type="submit" name="log" id="log" value="Login" />
                <p className="registerbutton">
                  New to GameState? <a onClick={registerpage}>Click here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
