import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { api } from "../../urlConfig";
import { useSelector } from 'react-redux'
import Tweet from '../tweet/Tweet';


const TimeLineTweet = () => {
    const [timeLine, setTimeLine] = useState(null)
    const { currentUser } = useSelector((state) => state.user)
    // console.log(currentUser);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const timeLineTweets = await axios.get(`${api}/tweets/getTweets/${currentUser.data._id}`)
                setTimeLine(timeLineTweets.data)
            } catch (error) {
                console.log('error', error);
            }
        };
        
        fetchData()
    }, [currentUser.data._id])

    // console.log("timeline", timeLine);

    return (
        <div className='mt-6'>
            {
                timeLine &&
                timeLine.message.map((tweet) => {
                    return (
                        <div className='p-2' key={tweet._id}>
                            <Tweet tweet={tweet} setData={setTimeLine} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TimeLineTweet