import React, { useState } from 'react'
import { auth, db } from '../component/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FaArrowLeft, FaHome } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { login } from '../redux/userSlice'
const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const link = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password)
         const user = userCredential.user

         const userDoc = await getDoc(doc(db, 'Users', user.uid))


         if (userDoc.exists()) {
            const userData = userDoc.data()
            dispatch(login({ name: userData.name, email: userData.email, uid: user.uid }))
         }
         console.log(name, email)
         console.log("User Login Successfull")
         toast.success('Log in Successfull')

         link('/profile')

      }
      catch (err) {
         console.log("Error during login", err)
      }
   }

   return (
      <div className='flex flex-col h-screen w-screen justify-center items-center bg-black'>
         <div className='flex flex-row p-5 gap-3 items-center' style={{ position: 'absolute', top: 0, left: 0 }} onClick={() => { window.location.href = '/' }}>
            <FaArrowLeft size={25} color='#FFBF00' />
            <FaHome size={30} color='#FFBF00' />
         </div>

         <div className='flex flex-col items-center justify-center w-[90%] lg:w-2/6 h-auto lg:h-4/6 rounded-2xl bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-800 '>
            
            <form onSubmit={handleSubmit} className='flex flex-col'>
            <h1 className='text-center font-bold text-lg mb-4 mt-5'>Email</h1>
               <input
                  type='email'
                  value={email}
                  className='h-10 w-56 bg-yellow-200 font-semibold p-2'
                  onChange={(e) => setEmail(e.target.value)}
               />

               <h1 className='text-center font-bold text-lg mb-4 mt-5'>Password</h1>
               <input
                  type='password'
                  value={password}
                  className='h-10 w-56 bg-yellow-200 font-semibold p-2'
                  onChange={(e) => setPassword(e.target.value)}
               />
                <button type='submit' className='w-56 h-12 bg-black text-yellow-700 hover:bg-yellow-800 hover:text-black font-semibold text-lg rounded-xl mt-10'>Login</button>
            </form>
           
            <p className='text-lg mt-20 mb-5'>New Here ? <a className='font-bold' href='/signup' > SignUp</a></p>
         </div>
      </div>
   )
}

export default Login