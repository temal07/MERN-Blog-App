import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left side - includes the logo*/}
        <div className="flex-1">
          <Link to="/" className='text-4xl font-bold
          dark:text-white'>
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              rounded-lg text-white">MERN</span>
              <span>Blog</span>
          </Link> 
          <p className='text-sm mt-5'>
            This is a demo project. You can 
            sign up with your email and password 
            or with Google
          </p>
        </div>
        {
          /*
            right side includes a form for the user
            to create an account.
          */
        }
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <Label value='Your Username:' />
            <TextInput 
              type='text'
              placeholder='Username'
              id='username'
            />
            <Label value='Your Email:' />
            <TextInput 
              type='text'
              placeholder='e.g. business@gmail.com'
              id='email'
            />
            <Label value='Your Password:' />
            <TextInput 
              type='text'
              placeholder='Password'
              id='password'
            />
            <Button gradientDuoTone={'purpleToPink'} type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
