import React from "react";

const MainTweet = () => {
  return (
    <div className="">
      <p className="font-bold pl-2 my-2">Username</p>
      <form className="border-b-2 pb-6">
        <textarea
          className="bg-slate-200 rounded-lg w-full p-2"
          placeholder="What's Happening..."
          maxLength={300}
        ></textarea>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">Tweet</button>
      </form>
      Main Tweet
    </div>
  );
};

export default MainTweet;
