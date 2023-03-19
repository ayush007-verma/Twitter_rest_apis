import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { api } from "../../urlConfig";
import formatDistance from "date-fns/formatDistance";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({ tweet, setData }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [userData, setUserData] = useState();

    const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
    const location = useLocation().pathname
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const findUser = await axios.get(`${api}/users/find/${tweet.userId}`);
                // console.log(findUser);
                // return false;
                setUserData(findUser.data.user);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [tweet.userId, tweet.likes]);

    const handleLike = async (e) => {
        e.preventDefault()

        try {
            const like = await axios.put(`${api}/tweets/${tweet._id}/like`, {
                id: currentUser._id,
            });

            if (location.includes('profile')) {
                const newData = await axios.get(`${api}/tweets/getTweets/all/${id}`)
                setData(newData.data)
            }
            else if(location.includes('explore')) {
                const newData = await axios.get(`${api}/tweets/explore`)
                setData(newData.data)
            }
            else {
                const newData = await axios.get(`${api}/tweets/getTweets/${currentUser._id}`)
                setData(newData.data)
            }

        } catch (error) {
            console.log('error', error);
        }
    }
    // console.log(userData);
    // return false;
    return (
        <div>
            {userData && (
                <>
                    <div className="flex space-x-2">
                        {/* <img src='' alt='' /> */}
                        <Link to={`/profile/${userData._id}`}>
                            <h3 className="font-bold">{userData.name}</h3>
                        </Link>

                        <span className="font-normal">@{userData.name}</span>
                        <p>- {dateStr}</p>
                    </div>

                    <p>{tweet.description}</p>
                    <button type="submit" onClick={handleLike}>
                        {tweet.likes.includes(currentUser._id) ? (
                            <FavoriteIcon className="mr-2 my-2 cursor-pointer" />
                        ) : (
                            <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
                        )}
                        {tweet.likes.length}
                    </button>
                </>
            )}
        </div>
    );
};

export default Tweet;
