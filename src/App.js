import './App.css';
import { useEffect, useState } from 'react';
import React from "react";
import testApp from './TestingPhase1';
import './styles/General.css';
import './styles/Header.css';
import './styles/MainBody.css';
import { db } from "./config/Firebase";
import { collection, getDocs, addDoc} from "firebase/firestore";


function MainFunc()
{
  const[postFeed, setPostFeed] = useState("");
  const[userFeed, setUserFeed] = useState([]);
  const usersFeedCollectionRef = collection(db,"GlobalFeeds");


  useEffect(() => {
    const getUserFeedList = async () =>{
      try{
        const data = await getDocs(usersFeedCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserFeed(filteredData);
      }catch (err){
        console.error(err);
      }
    }
    getUserFeedList();
  },[]);

  const onSubmitPost = async () => {
    await addDoc(usersFeedCollectionRef, {
      friendPostText: postFeed
    }

    );
  };

  return(
    <div className='container' >
      <ButtonsNav />
      <WindowsFeed
       users={userFeed}
       setUserFeed = {setUserFeed}
       postFeed = {postFeed}
       setPostFeed = {setPostFeed}/>
    </div>
    
  )
}
const USERS =[
  {username: "roberto",password: "leanda"},
  {username: "emmerson",password: "123456"},
  {username: "jeramy",password: "bading"},
  {username: "cyrus",password: "adik"}
];

function ButtonsNav(){
  const mystyle = {
    
    backgroundColor : "DodgerBlue",
    fontFamily : "Arial"
  };
  const homeImg = require("./images/Home.png");
  const groupImg = require("./images/People.png");
  const settingImg = require("./images/Gear.png");
  const profileImg = require("./images/Profile.png");

  return(
    <div className='div-dashboard'>

      <form className='buttons'>

        <h1 className='header-text'>SocialNOOB</h1>
        <div className='buttons-position'>
          <img src={profileImg} className='home-img' id="hImg"/>
          <label className='label-style'>Profile</label>
        </div>
        <div className='buttons-position'>
          <img src={homeImg} className='home-img' id="hImg"/>
          <label className='label-style'>Home</label>
        </div>
        <div className='buttons-position'>
          <img src={groupImg} className='group-img'/>
          <label className='label-style'>Group</label>
        </div>
        <div className='buttons-position'>
          <img src={settingImg} className='gear-img'/>
          <label className='label-style'>Settings</label>
        </div>

      </form>
    </div>
  )
}

function BlockDesign({ user }){
  const homeImg = require("./images/Home.png");
  const testFeedImgUp = require("./images/ETO KA TANG INA KA.jpg");

  return(
    <div className="beta-design">
      
      <div className='feed-first-layer'>
        <img src={homeImg} className='first-layer--img'/>
        <label className='first-layer--username'>{user.friendPostText}</label>
      </div>
      <div className='feed-second-layer'>
        <img src = {testFeedImgUp} className='second-layer--img'/>
      </div>
      <div className='feed-third-layer'>
        <label className='third-layer--text'>username</label>
        <p className='third-layer--text'>desc</p>
      </div>
  </div>
  );
}

function MainWindowsFeed({ users, setUserFeed, postFeed, setPostFeed }){
  const rows = [];
  const homeImg = require("./images/Home.png");

  users.forEach((user) => {
    rows.push(<BlockDesign user={user}/>);
  })
  return(
      <div className="main-window">
        <div className='feed-window'>
          <div className='post-area'>
            <div className='first-layer-post'>
              <img src= {homeImg} className='first-layer-post--img'/>
              <input type='text' placeholder="Post here......." className='first-layer-post--text' onChange={(e) => setPostFeed(e.target.value)}></input>
            </div>
            <div className='second-layer-post'>
              <input className='second-layer-post--button' type='button' value="POST"></input>
            </div>
          </div>
          {rows}
        </div>
        <div className='user-suggestion-window'>

        </div>
      </div>
    );
}

function WindowsFeed({ users }){
  return(
    <div className='container-feed'>
      <MainWindowsFeed users={users}/>
    </div>
  )
}

export default MainFunc;
