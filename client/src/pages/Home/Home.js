import React from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import MainTweet from "../../components/mainTweet/MainTweet";
import RightSideBar from "../../components/rightSideBar/RightSideBar";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signin from "../Signin/Signin";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="">
            <LeftSideBar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainTweet />
          </div>
          <div className="">
            <RightSideBar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
