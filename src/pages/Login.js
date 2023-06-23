import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import img from "../img/logo.png";

export default function Login() {

    const userRef = useRef();
    const errRef = useRef();
    const [username,setusername] = useState('');
    const[password,setpassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
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
    setErrMsg('');
    console.log(username,password);
    const url = 'http://localhost:3000/user/login'; // Update with your API endpoint URL
  
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            username,
            password
          }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.status === 200)
            {
                localStorage.setItem("user",data);
                navigate('/homepage')
                setErrMsg('');
            }
            else{
                setErrMsg(data.message);
            }
        // Handle additional logic based on the response
      })
      .catch((error) => console.error(error));
    setusername("");
    setpassword("");
  };

  //localStorage.setItem("user",data);
  // navigate('/userDetails');
  // setloginauto(true);
  // if(loginauto==true)
  //{
  //   localStorage.setItem("token",data.data);
  // }

    const registerpage = () =>{
        navigate('/register');
    }

    const forgotpasswordpage = () =>{
        navigate('/forgotpassword');
    }

  return (
    <>   
    <div className="App">
      <div className="App-main">
        <div className='firstdiv'>
            <img src={img} alt="Logo GameState" className='logo'></img>
            <p >Login to access a lot of game reviews and get to make your OWN!</p>
        </div>
        <div className="login">
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
            <form  onSubmit={handleSubmitlogin}>
                <div className='edittext'>
                    <label><b>Username</b></label>   
                    <input type="text" name="username" id="username" placeholder="Username" autocomplete="off" ref={userRef}  onChange={(e)=>setusername(e.target.value)} value={username}/>
                </div>
                <div className='edittext'>
                    <label><b>Password</b></label>    
                    <input type="password" name="password" id="password" placeholder="Password" autocomplete="off"  onChange={(e)=>setpassword(e.target.value)} value={password}/>
                </div>
                <div className='newgamestate'>
                    <p className="forgetp">Forgot your password? Reset it <a onClick={forgotpasswordpage}>here</a></p>
                </div>
                <div className='editbutton'>
                    <input type="submit" name="log" id="log" value="Login" />   
                    <p className='registerbutton'>New to GameState? <a onClick={registerpage}>Click here</a></p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
