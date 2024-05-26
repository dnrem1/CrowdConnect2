import { auth } from "../src/config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import './styles/Login.css';

const Login = ({ showMe }) => {
    return (
      <div id="Login" className={` ${showMe ? "block" : "hidden"}`}>
        <form>
    
          <label for="username">Nutzername</label>
          <input name="username" type="text"></input>
          <label for="pw">Passwort</label>
          <input name="pw" type="password"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

const Auth = () =>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[showLogin, setShowLogin] = useState(false);
    console.log(auth?.currentUser?.email);
    const SignIn = async () =>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err){
            console.err(err);
        }
    };

    return(
        <div className="right-side">
        <input className="login-text" placeholder="email or username" onChange={(e) => setEmail(e.target.value)}/>
        <input className="login-text" placeholder="password..." onChange={(e) => setPassword(e.target.value)}/>

        <div className="login-buttons">

            <button onClick={SignIn}>login</button>
            <button onClick={() => setShowLogin(true)}>Register</button>
            <Login showMe={showLogin}/>
        </div>  
    </div>
    );
};

function LoginLeftSideDesign(){

    return(
        <div className="left-side">
            hello
        </div>
    );
}
export default function ExportAuth(){
    return(
        <div className="login-container">
            <LoginLeftSideDesign />
            <Auth />
        </div>
    );
};