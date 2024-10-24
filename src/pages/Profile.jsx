import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../component/firebase'
import { logout } from '../redux/userSlice'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { BsBuildingFillLock } from 'react-icons/bs'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [profileData, setProfileData] = useState(null)
  const [newProfilePic, setNewProfilePic] = useState(null)
  const [newSkills, setNewSkills] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      const fetchProfile = async () => {
        try {
          const docRef = doc(db, 'Users', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setProfileData(docSnap.data())
            setNewSkills(docSnap.data().skills || '')
          } else {
            console.log('No such document!')
          }
        } catch (err) {
          console.log('Error fetching profile:', err)
        }
      }
      fetchProfile()
    }
  }, [user, navigate])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.log('Error Logging Out', err)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const userRef = doc(db, 'Users', user.uid)
      let profilePicUrl = profileData.profilePic

      if (newProfilePic) {
        const profilePicRef = ref(storage, `profilePics/${user.uid}`)
        await uploadBytes(profilePicRef, newProfilePic)
        profilePicUrl = await getDownloadURL(profilePicRef)
      }

      await updateDoc(userRef, {
        skills: newSkills,
        profilePic: profilePicUrl,
      })

      setProfileData({
        ...profileData,
        skills: newSkills,
        profilePic: profilePicUrl,
      })
      console.log('Profile updated successfully!')
    } catch (err) {
      console.log('Error updating profile:', err)
    }
  }

  if (!profileData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black px-4">
       <div className='flex flex-row p-1 lg:p-5 items-center gap-2 ' style={{ position: 'absolute', top: "0", left: "0" }}>
        <h1 className='text-lg lg:text-xl font-extrabold text-white ml-2 lg:ml-5'>I VAULT</h1>
        <BsBuildingFillLock color='#FFBF00' size={25} />
        </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-100 via-yellow-500 to-yellow-800 text-transparent bg-clip-text">
        Profile
      </h1>

      {/* Profile Card */}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 mt-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 rounded-2xl shadow-lg flex flex-col items-center">
        <img
          src={profileData.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-black mb-4"
        />
        <div className="text-center">
          <p className="text-xl font-semibold"><strong>Name:</strong> {user.name}</p>
          <p className="text-xl"><strong>Email:</strong> {user.email}</p>
          <p className="text-xl"><strong>Skills:</strong> {profileData.skills}</p>
        </div>
      </div>

      {/* Update Section */}
      <div className="mt-8 w-full lg:w-screen flex flex-col lg:flex-row items-center justify-center px-0 lg:px-5 lg:mt-14">
       <div className='flex flex-col gap-2 items-center w-full'>
        <h1 className='text-yellow-200'>Update Profile Picture</h1>
        <input
          type="file"
          onChange={(e) => setNewProfilePic(e.target.files[0])}
          className="mb-4 bg-yellow-200 text-black px-4 py-2 rounded cursor-pointer w-full lg:w-[30%]"
        />
        </div>
        <div className='flex flex-col gap-2 items-center w-full'>
        <h1 className='text-yellow-300'>Add new Skills</h1>  
        <input
          type="text"
          value={newSkills}
          onChange={(e) => setNewSkills(e.target.value)}
          placeholder="Update Skills"
          className="mb-4 bg-yellow-200 text-black px-4 py-2 rounded w-full lg:w-[30%]"
        />
        </div>
       
      </div>
      <button
          onClick={handleUpdateProfile}
          className="bg-yellow-500 text-black hover:bg-black hover:text-yellow-600 px-4 py-2 rounded shadow-lg w-full lg:w-56 mt-0 lg:mt-16 hover:border-2 hover:border-yellow-400"
        >
          Update Profile
        </button>

      {/* Logout Section */}
      <button
        style={{position:'absolute', top:"0", right:"0"}}
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded shadow-lg w-44 lg:w-28 lg:mr-20 mr-0 lg:inline-block hidden"
      >
        Logout
      </button>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded shadow-lg w-44 lg:w-28 lg:mr-20 mr-0 lg:hidden"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile
