import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "countries-list";
import Dropdown from "./Dropdown.js";
import "./login.css";
import img from "../img/logo.png";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.sort().map((code) => {
    const country = countries.countries[code];
    return { value: code, label: country.name };
  });

  const options = countryNames.sort((a, b) =>
    a.label > b.label ? 1 : b.label > a.label ? -1 : 0
  );
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const login = () => {
    navigate("/");
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !email || !password) {
      setError("Fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    const url = "http://localhost:3000/user/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        country: country ? country : undefined,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 203) {
          setError(data.message);
          setUsername("");
          setPassword("");
          setEmail("");
          setCountry("");
        } else {
          setError(null);
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="App">
        <div className="App-main">
          <div className="firstdiv">
            <img src={img} alt="Logo GameState" className="logo"></img>
            <p>
              Don't have a GameState account? Don't know what you're missing!
            </p>
          </div>
          <div className="register">
            <p
              ref={errRef}
              className={error ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {error}
            </p>
            <form onSubmit={handleSubmitRegister}>
              <div className="edittext">
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="edittext">
                <label>
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => {
                    if (
                      !isValidEmail(e.target.value) &&
                      e.target.value !== ""
                    ) {
                      setError("Please type a valid email");
                    } else {
                      setError(null);
                    }
                    setEmail(e.target.value);
                  }}
                  value={email}
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
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="edittext">
                <label>
                  <b>Country</b>
                </label>
                <Dropdown
                  placeHolder="Select..."
                  options={options}
                  onChange={(e) => setCountry(e.label)}
                />
              </div>
              <div className="editbutton">
                <input
                  type="submit"
                  name="register"
                  id="register"
                  value="Register"
                />
                <p className="registerbutton">
                  Already have an account? <a onClick={login}>Log in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
