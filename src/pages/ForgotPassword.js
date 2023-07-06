import { useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './forgotpass.css';
import img from '../img/logo.png'

export default function Forgotpassword() {
    const userRef = useRef();
    const errRef = useRef();
    const [email,setemail] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {
        userRef.current.focus();
        },[])
    useEffect(()=> {
        document.getElementById('error').style.color = "red";
        setErrMsg('');
    },[email])

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

   const handleSubmitforgotpassword = async (e) => {
        e.preventDefault();
        if (!email ) {
            setErrMsg("Fill in all fields");
            return;
        }
        if (!isValidEmail(email)) {
            setErrMsg("Please enter a valid email");
            return;
        }
        setErrMsg('');
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/users/forgotpwd", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status === 201) {
                console.log(data)
                if (data.status == 200){
                    document.getElementById('error').style.color = "black";
                    setErrMsg(data.message);
                }
                else{
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
            email
        };     
        const payload = JSON.stringify(jsonData);
        xhr.send(payload);
        setemail('');
    }


  return (
    <>   
    <div className="App">
      <div className="App-main">
        <div className='firstdiv'>
            <img src={img} alt="Logo GameState" className='logo'></img>
            <p >Please, type in your email so we can help you recover your password</p>
        </div>
        <div className="forgotpass">
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive" id="error">{errMsg}</p>
            <form  onSubmit={handleSubmitforgotpassword}>
                <div className='edittext'>
                    <label><b>Email</b></label>   
                    <input type="email" name="email" id="email" placeholder="Email" autocomplete="off" ref={userRef}  onChange={(e)=>setemail(e.target.value)} value={email}/>
                </div>
                <div className='editbuttonforgotpass'>
                    <input type="submit" name="log" id="log" value="Send email" />   
                </div>
            </form>
        </div>
      </div>
    </div> 
    </>
  );
}

