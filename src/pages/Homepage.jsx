import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBuildingFillLock } from "react-icons/bs";
import { FaGithub, FaReact } from "react-icons/fa";
import { SiFirebase, SiRedux, SiTailwindcss } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import Typing from 'react-typing-effect'

const Homepage = () => {
  const link = useNavigate()

  const handleLogin = () => {
    link('/login')
  }

  const handleSignup = () => {
    link('/signup')
  }

  return (
    <div className='min-h-screen lg:h-screen w-screen flex flex-col lg:flex-row bg-black'>
      <div className='flex flex-row p-5 items-center gap-2 ' style={{ position: 'absolute', top: "0", left: "0" }}>
        <h1 className='text-lg lg:text-xl font-extrabold text-white ml-2 lg:ml-5'>I VAULT</h1>
        <BsBuildingFillLock color='#FFBF00' size={25} />
        <button className='w-24 h-8 border-2 border-yellow-600 rounded-2xl ml-16 lg:hidden font-bold text-yellow-400' onClick={handleLogin}>Login</button>
        <FaGithub color='#FFBF00' size={25} className='lg:hidden' onClick={()=> {window.location.href='https://github.com/Shravyasri1703/I_Vault'}}/>
      </div>
      <div className='hidden lg:flex flex-row  p-5 items-center gap-2 mr-10' style={{ position: 'absolute', top: "0", right: "0" }}>
        <button className='w-32 h-10 border-2 border-yellow-600 rounded-3xl text-lg font-bold text-yellow-400 mr-5' onClick={handleLogin}>Login</button>
        <button className='w-32 h-10 border-2 border-yellow-600 rounded-3xl text-lg font-bold text-yellow-400 mr-5' onClick={handleSignup}>SignUp</button>
        <FaGithub color='#FFBF00' size={25} />
      </div>
      <div className='h-auto lg:h-full w-full lg:w-1/2 flex flex-col justify-center gap-10 ml-0 lg:ml-40 items-center lg:items-start mt-20 lg:mt-5'>
        <h1 className='text-4xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-100 via-yellow-500 to-yellow-800 inline-block text-transparent bg-clip-text'>
          <Typing
            text={["IDENTITY VAULT"]}
            speed={100}
            eraseSpeed={100}
            cursorClassName="text-yellow-500"
            typingDelay={500}
          />
        </h1>
        <div className='flex max-w-[60%] flex-col gap-10'>
          <p className='text-sm lg:text-xl text-white text-justify'>This React application enables users to create and manage accounts seamlessly. It includes a user-friendly registration page for signing up, a secure login page for authentication, and a dedicated account management page where users can view and update their personal information. The application is designed with modern features for efficient account handling, ensuring a smooth and secure user experience.</p>
        </div>
        <button className='w-44 lg:w-52 h-10 lg:h-14 bg-gradient-to-r from-yellow-500 to-yellow-900 rounded-3xl text-lg lg:text-xl font-bold' onClick={handleSignup}>Get Started</button>
      </div>
      <div className='flex flex-col justify-start lg:justify-center items-center h-auto lg:h-full w-full lg:w-1/2 p-0 lg:p-16 mt-14 lg:mt-0'>
        <div className='w-full lg:w-[85%] lg:h-[80%] shadow-2xl shadow-yellow-800  flex flex-col relative justify-start lg:justify-center items-center mt-0 lg:mt-10 rounded-full'>
          <div className='flex flex-row gap-2 mb-2 lg:flex-col'>
            <h1 className='text-2xl lg:text-6xl font-bold text-yellow-200 text-center'>TECH </h1>
            <h1 className='text-2xl lg:text-6xl font-bold text-yellow-600 text-center'>STACK </h1>
          </div>
          <div className='flex flex-row items-center gap-3 lg:gap-5 mt-1 mb-10 mb:0 lg:mt-14'>
          <FaReact className='icon-react' size={60} color='#61DBFB' />
          <IoLogoFirebase className='icon-firebase' size={60} color='#FFCA28' />
          <SiRedux className='icon-redux' size={60} color='#764ABC' />
          <SiTailwindcss className='icon-tailwind' size={60} color='#38BDF8' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage