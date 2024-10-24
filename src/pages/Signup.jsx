import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { auth, db, storage } from '../component/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [skills, setSkills] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')  // To show error messages

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (user) {
        let profilePicUrl = ''
        if (profilePic) {
          const profilePicRef = ref(storage, `profilePics/${user.uid}`)
          await uploadBytes(profilePicRef, profilePic)
          profilePicUrl = await getDownloadURL(profilePicRef)
        }
        // Save user data in Firestore under the "Users" collection
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
          skills: skills,
          profilePic: profilePicUrl
        })
        console.log('User registered successfully!')
      }
    } catch (err) {
      // Check if the error is due to email already being used
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered. Please login instead.')
      } else {
        setErrorMessage('Error in signup. Please try again.')
      }
      console.log('Error in signup:', err)
    }
  }

  return (
    <div className='flex flex-col min-h-screen lg:h-screen w-screen justify-center items-center bg-black '>
      <div className='flex flex-row p-5 gap-3 items-center' style={{ position: 'absolute', top: 0, left: 0 }} onClick={() => { window.location.href = '/' }}>
        <FaArrowLeft size={25} color='#FFBF00' />
        <FaHome size={30} color='#FFBF00' />
      </div>
      <h1 className='text-2xl font-bold text-yellow-400 text-center mt-20 lg:mt-0'>All fields are mandatory for registration !</h1>
      <div className='flex flex-col items-center justify-center w-[90%] h-auto lg:w-3/6 lg:h-4/6 rounded-2xl bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-800 mt-12 mb-10 lg:mb-0'>
        <form onSubmit={handleRegister} className='flex flex-col lg:flex-row items-center justify-center w-full h-4/6'>
          <div className='w-1/2 h-full flex flex-col justify-center items-center '>
          <h1 className='text-center font-bold text-lg mb-4 mt-5'>Name</h1>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='h-10 w-56 bg-yellow-300 font-semibold p-2'
          />
          <h1 className='text-center font-bold text-lg mb-4 mt-5 p-2'>Email</h1>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-10 w-56 bg-yellow-300 font-semibold'
          />
          <h1 className='text-center font-bold text-lg mb-4 mt-5'>Password</h1>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-10 w-56 bg-yellow-300 font-semibold p-2'
          />
         </div>
         <div className='w-1/2 h-full flex flex-col justify-center items-center'>
          <h1 className='text-center font-bold text-lg mb-4 mt-5'>Skills</h1>
          <input
            type='text'
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className='h-10 w-56  bg-yellow-300 font-semibold p-2'
          />

          <h1 className='text-center font-bold text-lg mb-4 mt-5'>Profile Picture</h1>
          <input
            type='file'
            onChange={(e) => setProfilePic(e.target.files[0])}
            className='h-10 w-56 bg-yellow-300 p-2'
          />
          </div>
          
        </form>
        <button type='submit' className='w-56 h-12 bg-black text-yellow-700 hover:bg-yellow-800 hover:text-black font-semibold text-lg rounded-xl mt-10'>
            Signup
          </button>
        {/* Show error message if there is one */}
        {errorMessage && (
          <p className="text-red-500 mt-4">
            {errorMessage}
          </p>
        )}

        <p className='text-lg mt-3 mb-8'>
          Already Registered ? <a className='font-semibold' href='/login'> Login </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
