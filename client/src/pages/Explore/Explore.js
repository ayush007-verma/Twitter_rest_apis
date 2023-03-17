import React from 'react'
import { useSelector } from 'react-redux'
import ExploreTweets from '../../components/exploreTweets/ExploreTweets'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'
import Signin from '../Signin/Signin'

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <>
      {
        !currentUser ? (
          <Signin />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-4'>
            <div className=''>
              <LeftSideBar />
            </div>

            <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
              <ExploreTweets />
            </div>

            <div className=''>
              <RightSideBar />
            </div>
          </div>
        )
      }
    </>
  )
}

export default Explore