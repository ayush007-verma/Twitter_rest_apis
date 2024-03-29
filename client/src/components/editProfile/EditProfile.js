import React, { useEffect, useState } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from 'axios'
import { api } from "../../urlConfig";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setOpen }) => {
    const { currentUser } = useSelector((state) => state.user)
    const [img, setImg] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const uploadImg = (file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setImgUploadProgress(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                    // console.log('File available at', downloadURL);
                    try {
                        const updateProfile = await axios.put(`${api}/users/${currentUser._id}`, {
                            id : currentUser._id,
                            profilePic: downloadURL,
                        })
                    } catch (error) {
                        console.log('error', error);
                    }

                    dispatch(changeProfile(downloadURL))
                });
            }
        );
    }
    
    const handleDelete = async () => {
        const deleteProfile = await axios.delete(`${api}/users/${currentUser._id}`,{
            id : currentUser._id,
        })
        const deleteTweets = await axios.delete(`${api}/tweets/${currentUser._id}`)
        dispatch(logout())
        navigate('/login')
    }
    useEffect(() => {
        img && uploadImg(img)
    }, [img])

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
                <button
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setOpen(false)}
                >
                    X
                </button>
                <h2 className="font-bold text-xl">Edit Profile</h2>
                <p>Choose a new profile picture</p>

                {
                    imgUploadProgress > 0 ? (
                        "Uploading" + imgUploadProgress + "%"
                    ) : (
                        <input
                            type="file"
                            className="bg-transparent border border-slate-500 rounded p-2"
                            accept="images/*"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    )
                }

                <p>Delete Account</p>
                <button className="bg-red-500 text-white rounded-full py-2" onClick={handleDelete}>
                    Delete account
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
