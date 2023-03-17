import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import RightSideBar from "../../components/rightSideBar/RightSideBar";
import axios from "axios";
import { api } from "../../urlConfig";
import { useParams } from "react-router-dom";
import Tweet from "../../components/tweet/Tweet";
import EditProfile from "../../components/editProfile/EditProfile";
import { following } from "../../redux/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleFollow = async () => {
    if (!currentUser.data.following.includes(id)) {
      try {
        const follow = await axios.put(`${api}/users/follow/${id}`, {
          id: currentUser.data._id,
        });
        dispatch(following(id));
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const unfollow = await axios.put(`${api}/users/unfollow/${id}`, {
          id: currentUser.data._id,
        });
        dispatch(following(id));
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`${api}/tweets/getTweets/all/${id}`);
        setUserTweets(userTweets.data);

        const userProfile = await axios.get(`${api}/users/find/${id}`);
        setUserProfile(userProfile.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentUser, id]);

  // console.log('userTweets', userTweets);
  console.log("userProfile", userProfile);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="">
          <LeftSideBar />
        </div>

        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.user.profilePic}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser.data._id === id ? (
              <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : currentUser.data.following.includes(id) ? (
              <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>

          <div className="mt-6">
            {userTweets &&
              userTweets.message.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="">
          <RightSideBar />
        </div>
      </div>

      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
