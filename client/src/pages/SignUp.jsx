import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState, useSyncExternalStore } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the page from refreshing

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please Fill Out All Fields!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Label value='Your Username:' />
            <TextInput 
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
            />
            <Label value='Your Email:' />
            <TextInput 
              type='email'
              placeholder='e.g. business@gmail.com'
              id='email'
              onChange={handleChange}
            />
            <Label value='Your Password:' />
            <TextInput 
              type='password'
              placeholder='Password'
              id='password'
              onChange={handleChange}
            />
            <Button gradientDuoTone={'purpleToPink'} type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading</span>
                  </>
                ) : "Sign Up"
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
