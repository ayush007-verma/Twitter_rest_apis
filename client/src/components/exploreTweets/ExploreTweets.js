import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../urlConfig'
import Tweet from '../tweet/Tweet'

const ExploreTweets = () => {
  const [exploreTweets, setExploreTweets] = useState(null)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const explore = await axios.get(`${api}/tweets/explore`)
        setExploreTweets(explore.data)
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData()
  }, [currentUser._id])

  // console.log(exploreTweets);
  return (
    <div className='mt-6'>
      {
        exploreTweets &&
        exploreTweets.message.map((tweet) => {
          return (
            <div key={tweet._id} className='p-2'>
              <Tweet tweet={tweet} setData={setExploreTweets} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ExploreTweets