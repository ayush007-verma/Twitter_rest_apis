import React, { useState } from "react";
import TimeLineTweet from "../timeLineTweet/TimeLineTweet";
import { api } from "../../urlConfig";
import axios from "axios";
import { useSelector } from "react-redux";

const MainTweet = () => {
  const [tweetDesc, setTweetDesc] = useState('')
  const { currentUser } = useSelector((state) => state.user)
  const [timeLineApi, callTimelineApi] = useState(false) 
  const handleTweet = async (e) => {

    e.preventDefault()
    try {
      const submitTweet = await axios.post(`${api}/tweets`, {
        userId: currentUser?._id,
        description: tweetDesc
      })
    } catch (error) {
      console.log('error', error);
    }
    callTimelineApi(!timeLineApi)
  }

  return (
    <div className="">
      
      {currentUser && (
        <p className="font-bold pl-2 my-2">
          {currentUser?.name}
          </p>
      )}
      
      <form className="border-b-2 pb-6" onSubmit={handleTweet}>
        <textarea
          className="bg-slate-200 rounded-lg w-full p-2"
          placeholder="What's Happening..."
          maxLength={300}
          name='description'
          onChange={(e) => setTweetDesc(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
          Tweet
        </button>
      </form>
      <TimeLineTweet timeLineApi={timeLineApi} callTimelineApi={callTimelineApi} />
    </div>
  );
};

export default MainTweet;
