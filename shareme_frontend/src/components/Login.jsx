import React from 'react'
import GoogleLogin from "react-google-login"
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc" //Google Logo
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"

const Login = () => {

  const resposeGoogle = (response) => {
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const {name, googleId, imageUrl}= response.profileObj;

    const doc = {
      _id:googleId, // "_" is just for sanity to know which fields we are creating.
      _type: "user", 
      userName: name,
      image: imageUrl
    }
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          autoplay
          muted
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt='logo' />
          </div>

          <div className="shadow-2x1">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4' />
                  Sign in with Google
                </button>
              )}
              onSuccess={resposeGoogle}
              onFailure={resposeGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login