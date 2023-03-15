import React from 'react'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'

const Profile = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className=''>
        <LeftSideBar />
      </div>
      
      <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
        
      </div>
      
      <div className=''>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Profile