import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';

const LeftSideBar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    console.log(currentUser)
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='flex flex-column h-full md:h-[90vh] justify-between mr-6'>
            <div className='mt-6 flex flex-column space-y-4'>
                <Link to='/'>
                    <div className='flex items-center space-x-6 p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <HomeIcon fontSize='large' />
                        <p>Home</p>
                    </div>
                </Link>

                <Link to='/explore'>
                    <div className='flex items-center space-x-6 p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <TagIcon fontSize='large' />
                        <p>Explore</p>
                    </div>
                </Link>

                <Link to={`/profile/${currentUser?._id}`}>
                    <div className='flex items-center space-x-6 p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <PersonIcon fontSize='large' />
                        <p>Profile</p>
                    </div>
                </Link>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p className='font-bold'>{currentUser?.name}</p>
                    <p className='font-bold'>@{currentUser?.name}</p>

                </div>
                <div>
                    <Link to='/login'>
                        <button className='bg-red-500 text-white rounded-full px-3 py-2' onClick={handleLogout}>Logout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar